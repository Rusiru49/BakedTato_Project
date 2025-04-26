const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const env = require("dotenv");
const loginSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Login",
  },
);

loginSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWI_KEY, {
    expiresIn: "30d",
  });
  return token;
};
const Login = mongoose.model("Login", loginSchema);

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    username: Joi.string().required().label("Username"),
    password: passwordComplexity().required().label("Password"),
  });

  return schema.validate(data);
};
module.exports = { Login, validate };
