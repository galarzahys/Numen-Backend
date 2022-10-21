const {body, param, query, validationResult } = require('express-validator');

const fibonacciValidationRules = () => {
  return [
    query('range').isInt().withMessage('El ID debe ser númerico').optional({ checkFalsy: true }).escape(),
  ]
};

const searchUserValidationRules = () => {
  return [
    query('nombre').exists().withMessage('Debe ingresar un nombre').isAlpha().withMessage('El nombre solo puede contener letras').optional({ checkFalsy: true }).escape(),
    query('apellido').exists().withMessage('Debe ingresar un apellido').isAlpha().withMessage('El apellido solo puede contener letras').optional({ checkFalsy: true }).escape(),
  ]
};

const InsertUserValidationRules = () => {
  return [
    body('nombre').exists().withMessage('Debe ingresar un nombre').isAlpha().withMessage('El nombre solo puede contener letras'),
    body('apellido').exists().withMessage('Debe ingresar un apellido').isAlpha().withMessage('El apellido solo puede contener letras'),
    body('dni').exists().withMessage('Debe un numero de DNI').isInt().withMessage('El DNI solo puede contener números'),
    query('nombre').exists().withMessage('Debe ingresar un nombre').isAlpha().withMessage('El nombre solo puede contener letras').optional({ checkFalsy: true }).escape(),
    query('apellido').exists().withMessage('Debe ingresar un apellido').isAlpha().withMessage('El apellido solo puede contener letras').optional({ checkFalsy: true }).escape(),
  ]
};

const idValidationRules = () => {
  return [
    param('id').isInt().withMessage('El ID debe ser númerico'),
  ]
};


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({
        errors: errors.array()
      });
    }
    next();
};

module.exports = { fibonacciValidationRules, searchUserValidationRules, InsertUserValidationRules,idValidationRules, validate };