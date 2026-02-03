const express = require('express');
const app = express();
const port = 8000;

let log = '';
app.get('/', (req, res) => {
    res.send('Hello World from Express!');
    if (req.url !== '/favicon.ico') {
        log = `${new Date().toISOString()}: ${req.method} New Server Log ${req.url}\n`;
    }
});
app.get('/home', (req, res) => {
    res.redirect('https://www.google.com');
    if (req.url !== '/favicon.ico') {
        log = `${new Date().toISOString()}: ${req.method} New Server Log ${req.url}\n`;
    }
});
app.get('/about', (req, res) => {
    const username = req.query.testing;
    res.send(`This is the about page for user: ${username}`);
    if (req.url !== '/favicon.ico') {
        log = `${new Date().toISOString()}: ${req.method} New Server Log ${req.url}\n`;
    }
});

app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
});