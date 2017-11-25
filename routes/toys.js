const express = require('express');
const util = require('util');
const path = require('path');
const bodyParser = require('body-parser');
const { ToysController } = require('../controllers/index');
const multer  = require('multer');
const router = express.Router();
const controller = new ToysController();
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
 }).single('myImage');

 // Check File Type
 function checkFileType(file, cb) {
   // allowed extensions
   const fileTypes = /jpeg|jpg|png|gif/;
   //check the extensions
   const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
   //check mime
   const mimeType = fileTypes.test(file.mimetype);

   if(mimeType && extName){
     return cb(null, true);
   } else {
     cb('Error: Images Only!');
   }
 }

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
  //
  upload(req, res, (err) => {
    if (err){
      res.render('toys/new', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('toys/new', {
          msg: 'Error: No File Selected!'
        });
      } else {
        controller.create(req, res);
      }
    }
  });

});

router.delete('/toys/delete/:id', (req, res) => {
  controller.delete(req, res);
});

router.get('/toys/update/:id', (req, res) => {
  controller.update(req, res);
});

router.put('/toys/update/:id', (req, res) => {
  upload(req, res, (err) => {
    if (err){
      res.render('toys/new', {
        msg: err
      });
    } else {
      controller.edit(req, res);
    }
  });

});

module.exports = router;
