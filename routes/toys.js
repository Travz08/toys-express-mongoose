const express = require('express');
const util = require('util');
const bodyParser = require('body-parser');
const { ToysController } = require('../controllers/index');

const router = express.Router();
const controller = new ToysController();

router.use(bodyParser.urlencoded({ extended: true }));
router.use((req, res, next) => {
  console.log(`req.body=${util.inspect(req.body)}`);
  next();
});

router.get('/', (req, res) => {
  controller.index(req, res);
});

router.get('/toys/new', (req, res) => {
  controller.new(req, res);
});

router.get('/toys/:id', (req, res) => {
  controller.show(req, res);
});

router.post('/toys', (req, res) => {
  controller.create(req, res);
});

router.delete('/toys/delete/:id', (req, res) => {
  controller.delete(req, res);
});

router.get('/toys/update/:id', (req, res) => {
  controller.update(req, res);
});

router.put('/toys/update/:id', (req, res) => {
  controller.edit(req, res);
});

module.exports = router;
