var express = require('express');
var router = express.Router();

const { getSerie } = require('../controllers/fibonacciController');

const { fibonacciValidationRules, validate } = require("../middlewares/validator");


router.get(
    "/",
    fibonacciValidationRules(), 
    validate,
    getSerie
  );



module.exports = router;
