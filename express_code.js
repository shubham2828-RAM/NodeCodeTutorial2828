const express = require('express');
const app = express();
const fs = require('fs');
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
    fs.appendFile('./server.log', log, (err) => {
            if (err) {
                console.error('Error writing to log file', err);
            }
        });
});
app.get('/about', (req, res) => {
    const username = req.query.testing;
    res.send(`This is the about page for user: ${username}`);
    if (req.url !== '/favicon.ico') {
        log = `${new Date().toISOString()}: ${req.method} New Server Log ${req.url}\n`;
    }
});
// app.appendFile('./server.log', log, (err) => {
//     if (err) {
//         console.error('Error writing to log file', err);
//     }
// });

app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
});