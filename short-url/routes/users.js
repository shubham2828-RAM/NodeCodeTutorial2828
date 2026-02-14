const express = require('express');
const router = express.Router();
const {handleCreateSignup, handleLoginSignup} = require('../controllers/users');

router.post('/signup', handleCreateSignup);
router.post('/',handleLoginSignup);
console.log("Loaded user routes");

module.exports = router;