const mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/toys', { useMongoClient: true });

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;
