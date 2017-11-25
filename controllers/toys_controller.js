const util = require('util');
const Toy = require('../models/toy');

module.exports = class ToysController {
  index(req, res) {
    Toy.find()
      .then(toys => { console.log(util.inspect(toys)); res.render('toys/index', { toys: toys })})
      .catch(err => { res.render('toys/index', { error: 'not found '})})
  }

  show(req, res) {
    Toy.findById(req.params.id, function(err, toy)
    { console.log(util.inspect(toy)); res.render('toys/show', { toy: toy })})
  }

  new(req, res) {
    res.render('toys/new');
  }

  create(req, res) {
    const toy = new Toy({img: `uploads/${req.file.filename}`, name: req.body.toy.name, description: req.body.toy.description});
    const fault = (err) => res.status(400);
    const redirect = (toy) => res.redirect('/');
    toy.save().then(redirect).catch(fault);
  }

  delete(req, res) {
    Toy.findById(req.params.id)
        .exec(function(err, toy) {
            if (err || !toy) {
                res.statusCode = 404;
                res.send({});
            } else {
                toy.remove(function(err) {
                    if (err) {
                        res.statusCode = 403;
                        res.send(err);
                    } else {
                        res.redirect('/');
                    }
                });
            }
        });
  }

  update(req, res) {
    Toy.findById(req.params.id, function(err, toy)
    { console.log(util.inspect(toy)); res.render('toys/update', { toy: toy })})

  }

  edit(req, res) {
    const updateToyObj = {};
    if (req.file) updateToyObj.img = `uploads/${req.file.filename}`;
    if (req.body.toy.name) updateToyObj.name = req.body.toy.name;
    if (req.body.toy.description) updateToyObj.description = req.body.toy.description;
    const setObj = { $set: updateToyObj };
  	Toy.update({ _id: req.params.id }, setObj, function(err) {
        if (err) {
            res.statusCode = 403;
            res.send(err);
        } else {
            res.redirect('/')};
  });
}
}
