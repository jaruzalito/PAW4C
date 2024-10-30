const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const mysql = require('mysql');
const {json} = require("express");

const conn = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'messages',
    port: 3306,
});

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/o-nas', (req, res) => {
    res.sendFile(path.join(__dirname, 'onas.html'));
});

app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, 'oferta.html'));
});

app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname, 'kontakt.html'));
});
app.get('/podziekowania',(req, res) => {
    res.sendFile(path.join(__dirname, 'podziekowania.html'));
});

app.post('/kontakt', (req, res) => {
    const { imie, nazwisko, email, wiadomosc } = req.body;
    console.log(`Imię: ${imie}, Nazwisko: ${nazwisko}, Email: ${email}, Wiadomość: ${wiadomosc}`);

    var Imie = req.body.imie;
    var Nazwisko = req.body.nazwisko;
    var Email = req.body.email;
    var Message = req.body.wiadomosc;

    conn.query('INSERT INTO messages (imie, nazwisko, email, wiadomosc) VALUES (?, ?, ?, ?)', [Imie, Nazwisko, Email, Message], (err, result) => {
        if (err) {
            console.error('Error inserting record:', err);
            res.status(500).send('Error saving data');
            return;
        }
        console.log('1 record inserted');
    });




    res.redirect('/podziekowania');
});
app.get('/api/contact-messages', (req, res) => {
    const query = "SELECT * FROM messages";

    conn.query(query, (err, result) => {
        if (err) {
            console.error('Error', err);
            res.status(500).send('Error retrieving data');
            return;
        }

        res.json(result);
    });
});

app.get('/api/contact-messages/:id', (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM messages WHERE id = ?";

    conn.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error retrieving data', err);
            res.status(500).send('Error retrieving data');
            return;
        }

        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Aplikacja działa na http://localhost:${port}`);
});
