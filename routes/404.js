const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
  res.status(404).send("Oops something went wrong.\n");
});

module.exports = router;
