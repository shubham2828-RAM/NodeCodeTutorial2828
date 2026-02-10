const express = require('express');
const connectToMongoDB = require('./connect');
const URL = require('./models/url');
const path = require('path');
const staticRouter = require('./routes/staticRouter'); 
const urlRoutes = require('./routes/url');



const app = express();
const port = 8001;

connectToMongoDB().then(() => {
    console.log('Connected to MongoDB Successfully');
});

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

app.get('/test/ejs', async (req,res) => {
    try {
        const allUrls = await URL.find({}); 
        res.render("home", {
            urls: allUrls
        });
    } catch (err) {
        console.error('Error fetching URLs:', err);
        res.render("home", {
            urls: [] 
        });
    }
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', staticRouter);
app.use('/api/url', urlRoutes);
app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            {shortId},
            {$push: {
                visitHistory: {timestamp: Date.now()} // to remove _id from db, do _id :false in schema
            }},
        );
        
        if (!entry) {
            return res.status(404).send('URL not found');
        }
        
        return res.redirect(entry.originalUrl);
    } catch (error) {
        console.error('Error redirecting:', error);
        return res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    setTimeout(() => {
        console.log(`Server is running on http://localhost:${port}`);
    }, 2000);

    console.log('You can test the API endpoints now!');
}); 