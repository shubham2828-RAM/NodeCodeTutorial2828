const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testdb')
.then(() => {
    console.log('Connected to MongoDB Successfully');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); 
});

const userSchemaDetails = require('./schema');
const fn_schema = userSchemaDetails.user;
const User = mongoose.model('users', fn_schema); // here users is the collection name in mongodb, and fn_schema is the schema we defined in schema.js

const findExistingUserByEmail = async (bodyEmail) => {
    try {
        const existingUser = await User.findOne({ email: bodyEmail });
        return existingUser;
    } catch (err) {
        throw err;
    }
}

exports.findExistingUserByEmail = findExistingUserByEmail;