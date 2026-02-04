const express  = require('express');
const app = express();
const port = 8000;
const users = require('./MOCK_DATA.json')
const fs = require('fs');

// Middleware to parse JSON bodies // Plugins
app.use(express.urlencoded({ extended: false })); // for form submissions (www-form-urlencoded)
app.use(express.json()); // for json bodies

app.use((req, res, next) => {
  // return res.json({
  //   Status: "Stuck in II Middleware",
  // });  // if we do not use next(), it will stuck here
  fs.appendFile('./middleware.txt', `A user requested to server having ip ${req.hostname} at ${new Date().toISOString()}\n`, (err,data)=> {});
  next();
}); // Custom Middleware example
  
app.use((req, res, next) => {
  // return res.json({
  //   Status: "Stuck in III Middleware",
  // });  // if we do not use next(), it will stuck here
  next();
}); // Custom Middleware example

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

app.post('/api/users', (req, res) => {
  let auto_incrementId = users.length + 1;
  const body = req.body;
  // console.log(body);
  users.push({
    id: auto_incrementId,
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender:body.gender,
    job_title: body.job_title});
    // or users.push({...body, id: auto_incrementId});

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
    return res.json(
        {
          status: "Success",
          message: "User created successfully",
          id:auto_incrementId
        });
    });
  
});

app.patch('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const body = req.body;
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...body }; // it means only update the fields present in body
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
      return res.json({
        status: "Success",
        message: "User updated successfully"
      });
    });
  } else {
    res.status(404).json({ 
      status: "Error", 
      status_code: 404,
      message: "User not found" 
    });
  }
});


app.listen(port, () => {
  console.log(`Test REST API server is running on http://localhost:${port}`);
  setTimeout(() => {
  console.log('Server is now ready!');
  }, 2000); 
  setTimeout(() => {
    console.log('You can test the API endpoints now!');
  }, 3000); 
});
