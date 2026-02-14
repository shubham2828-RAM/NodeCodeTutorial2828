const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.render('home');
});

router.get('/user/signup', (req, res) => {
    console.log("req -> ", req.body);
    return res.render('signup');
});
router.get('/user/loginpage',(req, res) => {
    console.log("req inside /user/loginpage -> ", req.body);
    return res.render('login');
});


module.exports = router;