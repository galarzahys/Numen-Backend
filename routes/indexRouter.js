var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tarea 1 - Gonzalo Galarza' });
});

module.exports = router;
