const db = require('./db');
const toySchema = db.Schema({ img: String, name: String, description: String });
const Toy = db.model('Toy', toySchema);
module.exports = Toy;
