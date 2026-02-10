const shortIdVal = require('shortid');
const URL = require('../models/url');
async function handleGenerateNewShortURL(req, res) {
    console.log("Received request to generate new short URL");
    const body = req.body;
    const shortId = shortIdVal.generate();
    console.log(`Generated short ID: ${shortId} for URL: ${body.url}`);
        await URL.create({
            shortId :shortId,
            originalUrl: body.url,
            visitHistory: []
        });
        return res.render('home', {
            id: shortId,
            originalUrl: body.url
        });
        // return res.status(201).json({
        //     status: "Success",
        //     message: "Short URL created successfully",
        //     shortUrl: `${req.protocol}://${req.get('host')}/${shortId}`
        // });
}

module.exports = {handleGenerateNewShortURL};