const User = require('../models/users');
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');
const {setUser} = require('../service/auth');


async function handleCreateSignup(req, res) {
    console.log("Received request to create new user signup");
    const { username, email, password } = req.body;
    const userlen = username.length;
    let userId =0;
    if (userlen % 2 === 0) {
        userId  = 12104 + userlen;
    }
    else {
        userId = 12103 + userlen;
    }
    console.log(`Creating user with username: ${username}, email: ${email}, userId: ${userId}`);
    await User.create({
        username,
        email,
        password,
        userId: userId.toString()
    });
    return res.render('signup',{
        username: username,
        email: email,
        userId: userId.toString()
    });
}
async function handleLoginSignup(req, res) {
    console.log("Received request to login user");
    const { email, password } = req.body;
    const userExists = await User.findOne({ email,password });
    if (!userExists) {
        return res.render('login',{
            error: "Invalid email or password"
        });
    }
    const session = uuidv4();
    console.log('session -> ',session);
    setUser(session,userExists);
    res.cookie("uuid",session)
    return res.redirect('/');
    
}


module.exports = { handleCreateSignup ,handleLoginSignup};