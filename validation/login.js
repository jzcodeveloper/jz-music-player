const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLogin(body) {
  let errors = {};

  body.email = !isEmpty(body.email) ? body.email : "";
  body.password = !isEmpty(body.password) ? body.password : "";

  if (!Validator.isEmail(body.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(body.email)) {
    errors.email = "Email is required";
  }

  if (Validator.isEmpty(body.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
