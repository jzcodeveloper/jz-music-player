const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegister(body) {
  let errors = {};

  body.name = !isEmpty(body.name) ? body.name : "";
  body.email = !isEmpty(body.email) ? body.email : "";
  body.password = !isEmpty(body.password) ? body.password : "";
  body.password2 = !isEmpty(body.password2) ? body.password2 : "";

  if (Validator.isEmpty(body.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(body.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(body.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(body.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(body.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(body.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(body.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(body.password, body.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
