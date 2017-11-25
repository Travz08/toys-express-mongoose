const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
  res.status(404).send("You're drunk.\n");
});

module.exports = router;
