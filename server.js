console.log("SERVER STARTED");
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());


const initConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});

initConn.connect((err) => {
    if (err) {
        console.log('MySQL connect error:', err);
        return;
    }

  
    initConn.query(
        `CREATE DATABASE IF NOT EXISTS contactdb`,
        (err) => {
            if (err) { console.log('DB create error:', err); return; }
            console.log('Database ready');

            
            initConn.end();

       
            const db = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'contactdb',
            });

            db.connect((err) => {
                if (err) { console.log('DB connect error:', err); return; }
                console.log('Connected to contactdb');

               
                const createTable = `
                    CREATE TABLE IF NOT EXISTS contacts (
                        id    INT AUTO_INCREMENT PRIMARY KEY,
                        fname VARCHAR(100),
                        lname VARCHAR(100),
                        phone VARCHAR(20),
                        email VARCHAR(100),
                        message TEXT
                    )
                `;

                db.query(createTable, (err) => {
                    if (err) { console.log('Table create error:', err); return; }
                    console.log('Table ready');

                    
                    setupRoutes(app, db);

                    app.listen(5000, () => {
                        console.log('Server running on port 5000');
                    });
                });
            });
        }
    );
    
});

// --- Routes ---
function setupRoutes(app, db) {

    app.post('/contact', (req, res) => {

        const { fname, lname, phone, email, message } = req.body;

        if (!fname || !email || !message) {
            return res.json({ success: false, error: 'Required fields missing' });
        }

        const sql = `INSERT INTO contacts
            (fname, lname, phone, email, message)
            VALUES (?, ?, ?, ?, ?)`;

        db.query(sql, [fname, lname, phone, email, message], (err, result) => {
            if (err) {
                console.log('Insert error:', err);
                return res.json({ success: false });
            }
            console.log( result.insertId);
            res.json({ success: true, id: result.insertId });
        });
    });
}