const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://cody:priity1@friendtracker.ibpmp4t.mongodb.net/" );

module.exports = mongoose.connection;
