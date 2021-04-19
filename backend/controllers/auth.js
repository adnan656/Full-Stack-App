const mongoose = require("mongoose");
const Register = require("../models/register");
const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array()[0].msg });
  }

  let loggedInUser;
  let token;

  try {
    const loadedUser = await Register.findOne({ email: email });

    if (!loadedUser) {
      return res.json({ error: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, loadedUser.password);

    if (passwordMatch) {
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userID: loadedUser._id.toString(),
        },
        "secret",
        { expiresIn: "1h" }
      );

      res.status(201).json({
        Token: token,
        userID: loadedUser._id.toString(),
        email: loadedUser.email,
        message: "Logged In",
        success: true,
      });
    } else {
      res.json({ error: "Password Incorrect" });
    }
  } catch (err) {
    res.status(401).json({
      message: err,
    });
  }
};

exports.postRegister = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  return bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const registerUser = new Register({
        name: name,
        email: email,
        password: hashedPassword,
      });
      return registerUser.save();
    })

    .then((resRegister) => {
      console.log("usersaved");
      res.status(201).json({
        message: "User Added to the database",
        success: true,
      });
    })

    .catch((error) => {
      res.status(401).json({
        message: "Failed to add in the database",
        error: error,
      });
      return res.json({ error: "Please Enter All Fields" });
    });
};
