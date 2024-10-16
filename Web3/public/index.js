const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

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
    res.redirect('/podziekowania');
});

app.listen(port, () => {
    console.log(`Aplikacja działa na http://localhost:${port}`);
});
