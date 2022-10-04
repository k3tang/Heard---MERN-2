const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateLoginInput = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Email or Password is incorrect'),

    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6, max: 30 })
        .withMessage('Email or Password is incorrect'),

    handleValidationErrors
];

module.exports = validateLoginInput;