

from flask import Flask, request, jsonify
from flask_cors import CORS
import socket
import threading
import re
import ipaddress

# Optional imports
try:
    import whois as whois_lib
    HAS_WHOIS = True
except ImportError:
    HAS_WHOIS = False

try:
    import dns.resolver
    import dns.exception
    HAS_DNS = True
except ImportError:
    HAS_DNS = False

try:
    import requests as req_lib
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # restrict to frontend origin


# ─────────────────────────────────────────────
# INPUT VALIDATION HELPERS
# ─────────────────────────────────────────────

# Valid domain regex (e.g. google.com, sub.example.co.uk)
DOMAIN_RE = re.compile(
    r'^(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)'
    r'+[a-zA-Z]{2,63}$'
)

def is_valid_domain(s: str) -> bool:
    return bool(DOMAIN_RE.match(s)) and len(s) <= 253

def is_valid_ip(s: str) -> bool:
    try:
        ipaddress.ip_address(s)
        return True
    except ValueError:
        return False

def is_valid_domain_or_ip(s: str) -> bool:
    return is_valid_domain(s) or is_valid_ip(s)

def clean_domain(raw: str) -> str:
    """Strip http(s):// and trailing path."""
    raw = raw.strip().lower()
    raw = re.sub(r'^https?://', '', raw)
    raw = raw.split('/')[0].split('?')[0].split('#')[0]
    # Remove port number if present (e.g. example.com:8080)
    raw = re.sub(r':\d+$', '', raw)
    return raw
def has_valid_tld(domain: str) -> bool:
    """Check karo ke domain ka TLD valid hai."""
    valid_tlds = {
        'com', 'net', 'org', 'edu', 'gov', 'mil', 'io', 'co',
        'pk', 'uk', 'us', 'de', 'fr', 'in', 'au', 'ca', 'jp',
        'cn', 'ru', 'br', 'it', 'es', 'nl', 'se', 'no', 'fi',
        'pl', 'ch', 'nz', 'sg', 'my', 'ae', 'sa', 'tr', 'ng',
        'za', 'eg', 'mx', 'ar', 'bd', 'info', 'biz', 'xyz',
        'online', 'tech', 'app', 'dev', 'ai', 'tv', 'me',
        'com.pk', 'net.pk', 'org.pk', 'edu.pk', 'gov.pk',
        'co.uk', 'org.uk', 'me.uk', 'co.in', 'co.au',
    }
    parts = domain.lower().split('.')
    
    
    if len(parts) < 2:
        return False
    
   
    for part in parts[:-1]:
        if part.isdigit():
            return False
    
    # Last part (TLD) check karo
    tld = parts[-1]
    second_tld = f"{parts[-2]}.{parts[-1]}" if len(parts) >= 2 else ""
    
    return tld in valid_tlds or second_tld in valid_tlds

def resolve_ip(domain: str) -> str:
    try:
        return socket.gethostbyname(domain)
    except Exception:
        return None  # None means unresolvable (not "Unresolved" string)

def error(msg: str, code: int = 400):
    return jsonify({"error": msg}), code
def has_valid_tld(domain: str) -> bool:
    parts = domain.lower().split('.')
    
    if len(parts) < 2:
        return False
    
    for part in parts[:-1]:
        if part.isdigit():
            return False
    
    first_part = parts[0]
    if len(first_part) <= 2 and not first_part.isalpha():
        return False

    valid_tlds = {
        'com', 'net', 'org', 'edu', 'gov', 'mil', 'io', 'co',
        'pk', 'uk', 'us', 'de', 'fr', 'in', 'au', 'ca', 'jp',
        'cn', 'ru', 'br', 'it', 'es', 'nl', 'se', 'no', 'fi',
        'pl', 'ch', 'nz', 'sg', 'my', 'ae', 'sa', 'tr', 'ng',
        'za', 'eg', 'mx', 'ar', 'bd', 'info', 'biz', 'xyz',
        'online', 'tech', 'app', 'dev', 'ai', 'tv', 'me',
        'com.pk', 'net.pk', 'org.pk', 'edu.pk', 'gov.pk',
        'co.uk', 'org.uk', 'me.uk', 'co.in', 'co.au',
    }
    
    tld = parts[-1]
    second_tld = f"{parts[-2]}.{parts[-1]}" if len(parts) >= 2 else ""
    return tld in valid_tlds or second_tld in valid_tlds


# ─────────────────────────────────────────────
# 1. WHOIS LOOKUP
# ─────────────────────────────────────────────

@app.route('/api/recon/whois', methods=['POST'])
def whois_lookup():
    data   = request.get_json(silent=True) or {}
    raw    = data.get('target', '').strip()

    if not raw:
        return error("Please enter a domain name.")

    domain = clean_domain(raw)

    # Validate — WHOIS only makes sense for domain names, not IPs
    if is_valid_ip(domain):
        return error(f"'{domain}' is an IP address. WHOIS lookup requires a domain name (e.g. google.com).")

    if not is_valid_domain(domain):
        return error(f"'{domain}' is not a valid domain name. Please enter something like: google.com or example.co.uk")
    
    if not has_valid_tld(domain):
        return error(f"'{domain}' has an invalid or unsupported domain extension.")

    if not HAS_WHOIS:
        return error("python-whois not installed. Run: pip install python-whois")

    try:
        pk_tlds = ['.pk', '.com.pk', '.net.pk', '.org.pk', '.edu.pk', '.gov.pk']
        if any(domain.endswith(t) for t in pk_tlds):
           import whois as _w
           w = _w.whois(domain)  # command=True hata diya — Windows pe crash karta tha!
        else:
           w = whois_lib.whois(domain)
    except Exception as e:
        msg = str(e).lower()
        if 'no match' in msg or 'not found' in msg or 'no entries found' in msg:
            return error(f"Domain '{domain}' not found in WHOIS database. It may not be registered.")
        return error(f"WHOIS lookup failed for '{domain}': {str(e)}")

    # Check if WHOIS returned empty/useless result
    if not w or not w.domain_name:
        return error(f"No WHOIS data found for '{domain}'. The domain may not be registered or the registry is private.")

    def fmt_date(d):
        if d is None: return "N/A"
        if isinstance(d, list): d = d[0]
        try: return d.strftime('%Y-%m-%d')
        except: return str(d)

    def fmt_list(v):
        if v is None: return "N/A"
        if isinstance(v, list): return ', '.join(str(x) for x in v if x)
        return str(v) if str(v) else "N/A"

    resolved = resolve_ip(domain)

    result = {
        "Domain Name":    (w.domain_name[0] if isinstance(w.domain_name, list) else w.domain_name or domain).upper(),
        "Registrar":      fmt_list(w.registrar) or "N/A",
        "IANA ID":        str(w.registrar_url or "N/A"),
        "Created On":     fmt_date(w.creation_date),
        "Updated On":     fmt_date(w.updated_date),
        "Expires On":     fmt_date(w.expiration_date),
        "Domain Status":  fmt_list(w.status) or "N/A",
        "Name Server 1":  (w.name_servers[0].lower() if isinstance(w.name_servers, list) and len(w.name_servers) > 0 else str(w.name_servers or "N/A")),
        "Name Server 2":  (w.name_servers[1].lower() if isinstance(w.name_servers, list) and len(w.name_servers) > 1 else "N/A"),
        "Registrant Org": fmt_list(w.org or w.registrant) or "N/A",
        "Country":        fmt_list(w.country) or "N/A",
        "Admin Email":    fmt_list(w.emails) or "N/A",
        "DNSSEC":         str(w.dnssec or "unsigned"),
        "Resolved IP":    resolved or "Could not resolve",
    }
    return jsonify(result)


# ─────────────────────────────────────────────
# 2. DNS ENUMERATION
# ─────────────────────────────────────────────

@app.route('/api/recon/dns', methods=['POST'])
def dns_enum():
    data   = request.get_json(silent=True) or {}
    raw    = data.get('target', '').strip()

    if not raw:
        return error("Please enter a domain name.")

    domain = clean_domain(raw)

    if is_valid_ip(domain):
        return error(f"'{domain}' is an IP address. DNS enumeration requires a domain name (e.g. google.com).")

    if not is_valid_domain(domain):
        return error(f"'{domain}' is not a valid domain name. Please enter something like: google.com")
    if not has_valid_tld(domain):
        return error(f"'{domain}' has an invalid or unsupported domain extension.")
        
    
    if not HAS_DNS:
        return error("dnspython not installed. Run: pip install dnspython")

    resolver = dns.resolver.Resolver()
    resolver.timeout     = 4
    resolver.lifetime    = 8
    resolver.nameservers = ['8.8.8.8', '1.1.1.1']

    records      = []
    record_types = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME', 'SOA']

    # First check domain resolves at all
    try:
        resolver.resolve(domain, 'A')
    except dns.resolver.NXDOMAIN:
        return error(f"Domain '{domain}' does not exist (NXDOMAIN). Please check the spelling.")
    except dns.resolver.NoAnswer:
        pass   # No A record is fine, continue with other types
    except dns.exception.Timeout:
        return error(f"DNS query timed out for '{domain}'. Please check your internet connection and try again.")
    except Exception as e:
        return error(f"DNS lookup failed: {str(e)}")

    for rtype in record_types:
        try:
            answers = resolver.resolve(domain, rtype)
            ttl = str(answers.rrset.ttl)
            for rdata in answers:
                value    = str(rdata)
                priority = '-'
                if rtype == 'MX':
                    priority = str(rdata.preference)
                    value    = str(rdata.exchange)
                records.append({
                    'type':  rtype,
                    'value': value.rstrip('.'),
                    'ttl':   ttl,
                    'pri':   priority,
                })
        except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer, dns.exception.Timeout):
            pass   # Record type not available — skip silently
        except Exception as e:
            records.append({'type': rtype, 'value': f'Error: {str(e)}', 'ttl': '-', 'pri': '-'})

    if not records:
        return error(f"No DNS records found for '{domain}'.")

    return jsonify(records)


# ─────────────────────────────────────────────
# 3. SUBDOMAIN ENUMERATION
# ─────────────────────────────────────────────

@app.route('/api/recon/subdomains', methods=['POST'])
def subdomain_enum():
    data   = request.get_json(silent=True) or {}
    raw    = data.get('target', '').strip()

    if not raw:
        return error("Please enter a domain name.")

    domain = clean_domain(raw)

    if is_valid_ip(domain):
        return error(f"'{domain}' is an IP address. Subdomain enumeration requires a domain name (e.g. google.com).")

    if not is_valid_domain(domain):
        return error(f"'{domain}' is not a valid domain name. Please enter something like: google.com")
    if not has_valid_tld(domain):
        return error(f"'{domain}' has an invalid or unsupported domain extension.")

    if not HAS_REQUESTS:
        return error("requests not installed. Run: pip install requests")

    # Verify domain resolves before querying
    if not resolve_ip(domain):
        return error(f"Domain '{domain}' could not be resolved. Please check the spelling.")

    found = set()

    # Source 1: crt.sh
    try:
        resp = req_lib.get(
            f"https://crt.sh/?q=%.{domain}&output=json",
            timeout=15,
            headers={"User-Agent": "iSeeWaves-Recon/1.0"}
        )
        if resp.status_code == 200:
            for entry in resp.json():
                name = entry.get('name_value', '')
                for n in name.split('\n'):
                    n = n.strip().lower().lstrip('*.')
                    if n.endswith(domain) and n != domain and is_valid_domain(n):
                        found.add(n)
    except Exception:
        pass

    # Source 2: AlienVault OTX
    try:
        resp = req_lib.get(
            f"https://otx.alienvault.com/api/v1/indicators/domain/{domain}/passive_dns",
            timeout=15,
            headers={"User-Agent": "iSeeWaves-Recon/1.0"}
        )
        if resp.status_code == 200:
            for entry in resp.json().get('passive_dns', []):
                hostname = entry.get('hostname', '').strip().lower()
                if hostname.endswith(domain) and hostname != domain and is_valid_domain(hostname):
                    found.add(hostname)
    except Exception:
        pass

    # No results found is valid (return empty list with note)
    if not found:
        return jsonify([])

    # Probe each subdomain
    results = []
    lock    = threading.Lock()

    def probe(sub):
        ip     = resolve_ip(sub)
        status = 'Inactive'
        http   = 'N/A'

        if ip and HAS_REQUESTS:
            for scheme in ('https', 'http'):
                try:
                    r = req_lib.get(
                        f"{scheme}://{sub}",
                        timeout=5,
                        allow_redirects=True,
                        headers={"User-Agent": "iSeeWaves-Recon/1.0"},
                        verify=False
                    )
                    status = 'Active'
                    http   = f"{r.status_code} {r.reason}"
                    break
                except Exception:
                    continue

        with lock:
            results.append({
                'sub':    sub,
                'ip':     ip or 'Unresolved',
                'status': status,
                'http':   http
            })

    threads = [threading.Thread(target=probe, args=(s,)) for s in list(found)[:60]]
    for t in threads: t.start()
    for t in threads: t.join(timeout=12)

    results.sort(key=lambda x: (x['status'] != 'Active', x['sub']))
    return jsonify(results)


# ─────────────────────────────────────────────
# 4. PORT SCAN
# ─────────────────────────────────────────────

COMMON_PORTS = {
    21:    ('FTP',        'High'),
    22:    ('SSH',        'Medium'),
    23:    ('Telnet',     'Critical'),
    25:    ('SMTP',       'Medium'),
    53:    ('DNS',        'Low'),
    80:    ('HTTP',       'Low'),
    110:   ('POP3',       'Medium'),
    143:   ('IMAP',       'Medium'),
    443:   ('HTTPS',      'Low'),
    445:   ('SMB',        'Critical'),
    3306:  ('MySQL',      'Critical'),
    3389:  ('RDP',        'Critical'),
    5432:  ('PostgreSQL', 'Critical'),
    6379:  ('Redis',      'Critical'),
    8080:  ('HTTP-Alt',   'Medium'),
    8443:  ('HTTPS-Alt',  'Medium'),
    8888:  ('HTTP-Dev',   'Medium'),
    27017: ('MongoDB',    'Critical'),
}

def grab_banner(ip: str, port: int, timeout: float = 2.0) -> str:
    try:
        with socket.create_connection((ip, port), timeout=timeout) as s:
            s.settimeout(timeout)
            if port in (80, 8080, 8888):
                s.sendall(b"HEAD / HTTP/1.0\r\nHost: " + ip.encode() + b"\r\n\r\n")
            elif port in (443, 8443):
                return "TLS — use HTTPS"
            banner = s.recv(1024).decode('utf-8', errors='replace').strip()
            first  = banner.split('\n')[0].strip()
            return first[:120] if first else '-'
    except Exception:
        return '-'

@app.route('/api/recon/ports', methods=['POST'])
def port_scan():
    data   = request.get_json(silent=True) or {}
    raw    = data.get('target', '').strip()

    if not raw:
        return error("Please enter a domain name or IP address.")

    domain = clean_domain(raw)

    if not is_valid_domain_or_ip(domain):
        return error(
            f"'{domain}' is not a valid IP address or domain name. "
            "Please enter something like: 8.8.8.8 or example.com"
        )

    ip = domain if is_valid_ip(domain) else resolve_ip(domain)
    if not ip:
        return error(f"Cannot resolve '{domain}'. Please check the spelling or try using an IP address directly.")

    # Block scanning private/reserved IPs
    try:
        addr = ipaddress.ip_address(ip)
        if addr.is_private or addr.is_loopback or addr.is_reserved:
            return error(
                f"'{ip}' is a private/reserved IP address. "
                "Port scanning private networks is not supported."
            )
    except Exception:
        pass

    results = []
    lock    = threading.Lock()

    def scan_port(port):
        svc, risk = COMMON_PORTS.get(port, ('Unknown', 'Low'))
        state  = 'Closed'
        banner = '-'
        try:
            with socket.create_connection((ip, port), timeout=1.5):
                state  = 'Open'
                banner = grab_banner(ip, port)
        except Exception:
            pass
        with lock:
            results.append({'port': port, 'svc': svc, 'state': state, 'banner': banner, 'risk': risk})

    threads = [threading.Thread(target=scan_port, args=(p,)) for p in COMMON_PORTS.keys()]
    for t in threads: t.start()
    for t in threads: t.join(timeout=5)

    results.sort(key=lambda x: x['port'])
    return jsonify({'ip': ip, 'ports': results})


# ─────────────────────────────────────────────
# 5. BANNER GRABBING
# ─────────────────────────────────────────────

BANNER_PORTS = [21, 22, 25, 80, 110, 143, 443, 8080, 8443]

@app.route('/api/recon/banners', methods=['POST'])
def banner_grab():
    data   = request.get_json(silent=True) or {}
    raw    = data.get('target', '').strip()

    if not raw:
        return error("Please enter a domain name or IP address.")

    domain = clean_domain(raw)

    if not is_valid_domain_or_ip(domain):
        return error(
            f"'{domain}' is not a valid IP address or domain name. "
            "Please enter something like: 8.8.8.8 or example.com"
        )

    ip = domain if is_valid_ip(domain) else resolve_ip(domain)
    if not ip:
        return error(f"Cannot resolve '{domain}'. Please check the spelling or try using an IP address directly.")

    try:
        addr = ipaddress.ip_address(ip)
        if addr.is_private or addr.is_loopback or addr.is_reserved:
            return error(f"'{ip}' is a private/reserved IP address. Banner grabbing is not supported for private networks.")
    except Exception:
        pass

    results = []
    lock    = threading.Lock()

    def probe_banner(port):
        svc = COMMON_PORTS.get(port, ('Unknown', 'Low'))[0]
        # Check if port is open first
        try:
            with socket.create_connection((ip, port), timeout=1.5):
                pass
        except Exception:
            return   # Port closed — skip

        raw_banner = '-'
        info       = '-'

        if port in (80, 8080, 8888):
            try:
                with socket.create_connection((ip, port), timeout=3) as s:
                    req = f"HEAD / HTTP/1.1\r\nHost: {domain}\r\nConnection: close\r\n\r\n".encode()
                    s.sendall(req)
                    raw_banner = s.recv(2048).decode('utf-8', errors='replace').strip()
                    for line in raw_banner.split('\n'):
                        if line.lower().startswith('server:'):
                            info = line.strip()
                            break
                    if info == '-':
                        info = raw_banner.split('\n')[0].strip()
            except Exception as e:
                raw_banner = str(e)

        elif port in (443, 8443):
            try:
                import ssl
                ctx = ssl.create_default_context()
                ctx.check_hostname = False
                ctx.verify_mode    = ssl.CERT_NONE
                with socket.create_connection((ip, port), timeout=3) as sock:
                    with ctx.wrap_socket(sock, server_hostname=domain) as ssock:
                        cert = ssock.getpeercert()
                        cn   = ''
                        for subj in cert.get('subject', []):
                            for k, v in subj:
                                if k == 'commonName': cn = v
                        exp = cert.get('notAfter', 'N/A')
                        tls = ssock.version()
                        raw_banner = f"TLS Version : {tls}\nCert CN     : {cn}\nExpires     : {exp}"
                        info       = f"{tls} | CN: {cn}"
            except Exception as e:
                raw_banner = f"TLS Error: {str(e)}"
                info       = "TLS handshake error"

        else:
            try:
                with socket.create_connection((ip, port), timeout=3) as s:
                    s.settimeout(2)
                    raw_banner = s.recv(1024).decode('utf-8', errors='replace').strip()
                    info       = raw_banner.split('\n')[0].strip()[:100]
            except Exception as e:
                raw_banner = str(e)

        with lock:
            results.append({'port': port, 'svc': svc, 'raw': raw_banner or '-', 'info': info or '-'})

    threads = [threading.Thread(target=probe_banner, args=(p,)) for p in BANNER_PORTS]
    for t in threads: t.start()
    for t in threads: t.join(timeout=8)

    results.sort(key=lambda x: x['port'])
    # Return even if empty — frontend shows "No open ports found"
    return jsonify(results)


# ─────────────────────────────────────────────
# 6. TECHNOLOGY DETECTION
# ─────────────────────────────────────────────

TECH_SIGNATURES = {
    'WordPress':        (r'wp-content|wp-includes|wordpress',       'CMS',          '📝'),
    'Joomla':           (r'joomla',                                  'CMS',          '📝'),
    'Drupal':           (r'drupal',                                  'CMS',          '📝'),
    'Django':           (r'csrfmiddlewaretoken|django',              'Framework',    '🐍'),
    'Laravel':          (r'laravel_session|laravel',                 'Framework',    '🐘'),
    'React':            (r'react\.js|react\.min|_react|__react',    'JS Framework', '⚛️'),
    'Vue.js':           (r'vue\.js|vue\.min|__vue',                  'JS Framework', '💚'),
    'Angular':          (r'angular\.js|ng-version',                 'JS Framework', '🔺'),
    'jQuery':           (r'jquery[\.\-][\d]',                        'JS Library',   '🔧'),
    'Bootstrap':        (r'bootstrap\.css|bootstrap\.min',          'CSS Framework','🅱️'),
    'Tailwind CSS':     (r'tailwind',                                'CSS Framework','💨'),
    'Google Analytics': (r'google-analytics|gtag\(',                 'Analytics',    '📊'),
    'Google Tag Mgr':   (r'googletagmanager',                        'Analytics',    '🏷️'),
    'Cloudflare':       (r'__cf_bm|cloudflare|cf-ray',              'CDN/WAF',      '☁️'),
    "Let's Encrypt":    (r"let's encrypt|letsencrypt",               'SSL',          '🔒'),
    'Apache':           (r'apache',                                  'Web Server',   '🌐'),
    'nginx':            (r'nginx',                                   'Web Server',   '🌐'),
    'IIS':              (r'microsoft-iis',                           'Web Server',   '🌐'),
    'PHP':              (r'x-powered-by: php|\.php',                'Language',     '⚡'),
    'Node.js':          (r'x-powered-by: express',                  'Runtime',      '🟩'),
    'ASP.NET':          (r'asp\.net|x-aspnet',                      'Framework',    '🔷'),
    'Shopify':          (r'shopify|myshopify',                       'E-Commerce',   '🛒'),
    'WooCommerce':      (r'woocommerce',                             'E-Commerce',   '🛒'),
}

@app.route('/api/recon/tech', methods=['POST'])
def tech_detect():
    data   = request.get_json(silent=True) or {}
    raw    = data.get('target', '').strip()

    if not raw:
        return error("Please enter a domain name or URL.")

    domain = clean_domain(raw)

    if is_valid_ip(domain):
        return error(f"'{domain}' is an IP address. Technology detection works best with domain names (e.g. example.com).")

    if not is_valid_domain(domain):
        return error(
            f"'{domain}' is not a valid domain or URL. "
            "Please enter something like: google.com or https://example.com"
        )

    if not HAS_REQUESTS:
        return error("requests not installed. Run: pip install requests")

    # Resolve domain first
    if not resolve_ip(domain):
        return error(f"Cannot resolve '{domain}'. Please check the spelling.")

    import warnings, urllib3
    warnings.filterwarnings('ignore', category=urllib3.exceptions.InsecureRequestWarning)

    resp = None
    for url in [f"https://{domain}", f"http://{domain}"]:
        try:
            resp = req_lib.get(
                url, timeout=12,
                headers={"User-Agent": "Mozilla/5.0 (compatible; iSeeWaves-Recon/1.0)"},
                verify=False, allow_redirects=True
            )
            break
        except Exception:
            continue

    if resp is None:
        return error(
            f"Could not connect to '{domain}'. "
            "The website may be down, blocking requests, or not hosting a web server."
        )

    headers_str = '\n'.join(f"{k}: {v}" for k, v in resp.headers.items()).lower()
    body        = resp.text.lower()[:50000]
    combined    = headers_str + '\n' + body

    detected = []
    for tech, (pattern, category, icon) in TECH_SIGNATURES.items():
        if re.search(pattern, combined, re.IGNORECASE):
            in_headers = re.search(pattern, headers_str, re.IGNORECASE)
            confidence = 'High' if in_headers else 'Medium'

            version = '-'
            server  = resp.headers.get('Server', '')
            if tech == 'nginx' and 'nginx' in server.lower():
                m = re.search(r'nginx/([\d.]+)', server, re.I)
                version = m.group(1) if m else '-'
            elif tech == 'Apache' and 'apache' in server.lower():
                m = re.search(r'Apache/([\d.]+)', server, re.I)
                version = m.group(1) if m else '-'
            elif tech == 'PHP':
                m = re.search(r'PHP/([\d.]+)', resp.headers.get('X-Powered-By', ''), re.I)
                version = m.group(1) if m else '-'
            elif tech == 'IIS':
                m = re.search(r'Microsoft-IIS/([\d.]+)', server, re.I)
                version = m.group(1) if m else '-'
            elif tech == "Let's Encrypt":
                try:
                    import ssl
                    ctx = ssl.create_default_context()
                    ctx.check_hostname = False
                    ctx.verify_mode    = ssl.CERT_NONE
                    with socket.create_connection((domain, 443), timeout=4) as sock:
                        with ctx.wrap_socket(sock, server_hostname=domain) as ssock:
                            version = ssock.version()
                except Exception:
                    pass

            detected.append({
                'category':   category,
                'tech':       tech,
                'version':    version,
                'confidence': confidence,
                'icon':       icon,
            })

    resolved_ip = resolve_ip(domain)
    detected.append({
        'category':   'IP',
        'tech':       'Resolved IP',
        'version':    resolved_ip or 'N/A',
        'confidence': 'High',
        'icon':       '🌍',
    })
    detected.append({
        'category':   'Response',
        'tech':       'HTTP Status',
        'version':    str(resp.status_code),
        'confidence': 'High',
        'icon':       '📡',
    })

    return jsonify(detected)


# ─────────────────────────────────────────────
# Health check
# ─────────────────────────────────────────────

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status":   "online",
        "version":  "2.0.0",
        "modules":  ["whois", "dns", "subdomains", "ports", "banners", "tech"],
        "dependencies": {
            "python-whois": HAS_WHOIS,
            "dnspython":    HAS_DNS,
            "requests":     HAS_REQUESTS,
        }
    })


if __name__ == '__main__':
    print("\n  iSeeWaves Reconnaissance API v2.0")
    print("  ────────────────────────────────────")
    print("  python-whois :", "✓" if HAS_WHOIS   else "✗  pip install python-whois")
    print("  dnspython    :", "✓" if HAS_DNS      else "✗  pip install dnspython")
    print("  requests     :", "✓" if HAS_REQUESTS else "✗  pip install requests")
    print("\n  Running on http://localhost:5009\n")
    app.run(debug=True, host='127.0.0.1', port=5009, threaded=True)