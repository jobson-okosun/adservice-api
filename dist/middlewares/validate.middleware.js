import { validationResult } from 'express-validator';
export var validate = function validate(req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(function (err) {
        return {
          field: err.path,
          message: err.msg
        };
      })
    });
  }
  next();
};