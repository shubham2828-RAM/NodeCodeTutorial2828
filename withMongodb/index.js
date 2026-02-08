const express = require('express');
const app = express();
const port = 8000;
const fs = require('fs');
const mongoose=require('mongoose');
const findExistingUserByEmail = require('./findExisting');


mongoose.connect('mongodb://localhost:27017/testdb')
.then(() => {
    setTimeout(() => {
        console.log('Connected to MongoDB Successfully');
    }, 2000);
    
    app.listen(port, () => {
        setTimeout(() => {
        console.log(`Server is running on http://localhost:${port}`);
        }, 2000);
        setTimeout(() => {
        console.log('Server is now ready!');
        console.log('You can test the API endpoints now!');
        }, 3000);
        
    });
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); 
});
const userSchemaDetails = require('./schema');
const fn_schema = userSchemaDetails.user;
const User = mongoose.model('users', fn_schema);
app.use(express.json()); // for json bodies


app.post('/api/createUser', async (req,res)=> {
    const body = req.body;
    console.log("Json data -> ",body);
    if (
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.gender ||
        !body.jobTitle ||   
        !body.email
    ) {
        return res.status(400).json({
            status: "Error",
            status_code: 400,
            message: "Missing required fields"
        });
    }
    const existEmail = await findExistingUserByEmail.findExistingUserByEmail(body.email);

    if (existEmail) {
        return res.status(409).json({
            status: "Error",
            status_code: 409,
            message: "Email already exists"
        }); 
    }
    const result = await User.create({
        "firstName": body.firstName,
        "lastName": body.lastName,
        "email": body.email,  
        "gender": body.gender,
        "jobTitle": body.jobTitle
    });
    console.log(result);
    return res.status(201).json({
        status: "Success",
        message: "User created successfully",
        id: result._id
    });
});


app.get('/api/allUsers', async (req, res) => {
    const users = await User.find({});
    const html = `
    <ul>
    ${users.map(user => `<li>${user.firstName} and ${user.email}</li>`).join('')}
    </ul>`;
    res.send(html);
});

app.get('/api/allUsersJson', async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

app.get('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                status: "Error",
                status_code: 404,
                message: "User not found"
            });
        }
    } catch (err) {
        res.status(400).json({
            status: "Error",
            status_code: 400,
            message: "Invalid user ID"
        });
    }
});
