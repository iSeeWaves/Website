import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home             from './pages/Home';
import Contact          from './pages/Contact';
import AboutUs          from './pages/About Us';
import CyberRegulations from './pages/Cyber Regulations';
import CMMCPage from './pages/CMMCPage';
import CMMIPage from './pages/CMMIPage';
import PECAPakistanPage from './pages/PECAPakistanPage';
import DFARSPage from './pages/DFARS';
import DORA from './pages/DORA';
import DPAPhilippinesPage from './pages/DPAPhilippines';
import DPDPAIndia       from './pages/DPDPAIndia';
import GDPR from './pages/GDPR';
import HIPAA from './pages/HIPAA';
import IRDAI from './pages/IRDAI';
import LGPDPage from './pages/LGPD';
import NCAECCPage from './pages/NCAECC';
import PCIDSSPage from './pages/PCIDSS';
import ISO27001Page from './pages/ISO27001';
import NIS2Page from './pages/NIS2';
import PCFPPakistanPage from './pages/PCFPPakistan';
import ServicesSection  from './pages/services';
import Reconnaissance   from './pages/Reconnaissance';
import IPTracker        from './pages/IPTracker';
import Careers          from './pages/Careers';
import Products         from './pages/Products';
import PasswordTool     from './pages/PasswordTool';
import FileScanner      from './pages/File_Scanner';
import AIChatbot        from './components/AIChatbot';
import './styles/style.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"                          element={<Home />} />
        <Route path="/contact"                   element={<Contact />} />
        <Route path="/about"                     element={<AboutUs />} />
        <Route path="/regulations"               element={<CyberRegulations />} />
        <Route path="/regulations/cmmc" element={<CMMCPage />} />
        <Route path="/regulations/cmmi" element={<CMMIPage />} />
        <Route path="/regulations/peca-pakistan" element={<PECAPakistanPage />} />
        <Route path="/regulations/dfars" element={<DFARSPage />} />
        <Route path="/regulations/dora" element={<DORA />} />
        <Route path="/regulations/dpdpa-india"    element={<DPDPAIndia />} />
        <Route path="/regulations/gdpr" element={<GDPR />} />
        <Route path="/regulations/hipaa" element={<HIPAA />} />
        <Route path="/regulations/irdai" element={<IRDAI />} />
        <Route path="/regulations/pci-dss" element={<PCIDSSPage />} />
        <Route path="/regulations/iso-27001" element={<ISO27001Page />} />
        <Route path="/regulations/lgpd" element={<LGPDPage />} />
        <Route path="/regulations/nis2" element={<NIS2Page />} />
        <Route path="/regulations/nca-ecc" element={<NCAECCPage />} />
        <Route path="/regulations/pcfp-pakistan" element={<PCFPPakistanPage />} />
        <Route path="/regulations/dpa-philippines" element={<DPAPhilippinesPage />} />
        <Route path="/services"                  element={<ServicesSection />} />
        <Route path="/services/reconnaissance"   element={<Reconnaissance />} />
        <Route path="/services/ip-tracker"       element={<IPTracker />} />
        <Route path="/services/password-tool"    element={<PasswordTool />} />
        <Route path="/services/file-scanner"     element={<FileScanner />} />
        <Route path="/careers"                   element={<Careers />} />
        <Route path="/products"                  element={<Products />} />
      </Routes>
      <AIChatbot />
    </Router>
  );
}

export default App;