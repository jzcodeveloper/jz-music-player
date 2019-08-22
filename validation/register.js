const Validator = require("validator");
const { isEmpty } = require("./isEmpty");

module.exports = function validateRegister(body) {
  const { name, email, password, password2 } = body;

  const errors = {};

  if (isEmpty(name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (isEmpty(email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  if (isEmpty(password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (isEmpty(password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(password, password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
