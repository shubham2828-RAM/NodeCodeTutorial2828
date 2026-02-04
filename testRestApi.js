const express  = require('express');
const app = express();
const port = 8000;
const users = require('./MOCK_DATA.json')

app.get('/users', (req, res) => {
  res.send(users);
});

app.get('/api/users',(req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>`;
    res.send(html);
});

app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    }
});

app.listen(port, () => {
  console.log(`Test REST API server is running on http://localhost:${port}`);
});
