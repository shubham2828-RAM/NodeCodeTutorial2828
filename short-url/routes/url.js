const express = require('express');
const { handleGenerateNewShortURL } = require('../controllers/url');

const router = express.Router(); 

router.post('/',handleGenerateNewShortURL);
router.get('/getDetails',(req,res) => {
    const html = `<h1>Short URL Details</h1>
    <p>Here you can get details of the short URL.</p>`;
    // res.send("Get details of the short URL");
    res.send(html);
});

module.exports = router;