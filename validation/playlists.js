const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePlaylists(body) {
  let errors = {};

  body.name = !isEmpty(body.name) ? body.name : "";
  body.description = !isEmpty(body.description) ? body.description : "";

  if (Validator.isEmpty(body.name)) {
    errors.name = "Playlist Name is required";
  }

  if (Validator.isEmpty(body.description)) {
    errors.description = "Playlist Description is required";
  }

  if (!Validator.isLength(body.description, { min: 2, max: 35 })) {
    errors.description =
      "Playlist Description must be between 2 and 35 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
