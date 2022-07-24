require('dotenv').config();  
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = process.env.DATBASE_URL
db.contacts = require("./contact.model.js")(mongoose);
module.exports = db;