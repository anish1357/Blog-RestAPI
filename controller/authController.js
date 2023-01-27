const bcrypt = require("bcrypt");
const User = require("../models/User");
const passwordValidation = require("../validation/password");
const emailValidation = require("../validation/email");
const usernameValidation = require("../validation/username");
const jwt = require("jsonwebtoken");

/** 
* *Function to register a new User
* *takes username ,email,password for request object ,hashes password and saves the user  
*/
exports.registerUser = (req, res) => {
  const { username, email, password } = req.body;

  //! checks for validation for email,password and username 
  if (!usernameValidation.validator(username)) {
    res.status(400).send({
      msg: "Incorrect parameters",
      username: usernameValidation.errMessage,
    });
    return;
  }
  if (!emailValidation.validator(email)) {
    res
      .status(400)
      .send({ msg: "Incorrect parameters", email: emailValidation.errMessage });
    return;
  }

  if (!passwordValidation.validator(password)) {
    res.status(400).send({
      msg: "Incorrect parameters",
      password: passwordValidation.errMessage,
    });
    return;
  }
//* hashing the password 
  bcrypt
    .hash(password, 12)
    .then((password) => {
      const newUser = new User({
        username,
        email,
        password,
      });
      return newUser.save();
    })
    .then((result) => {
      //* signing jwt token 
      jwt.sign(
        {
          userId: result._id,
        },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "2h" },
        (err, data) => {
          if (err) res.send({ error: "Error in jwt token" });
          result.token = data;
          console.log(result);
        }
      );

      res.status(200).send({ message: "User saved successfully" });
    })
    .catch((err) =>
     //! if users already exist with same email or username
      res.status(500).send({ error: "Error saving user to database" })
    );
};

/** 
* *Function to login a User
* *takes username ,password for request object ,hashes password and compares with the one stored in database
*/
exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  let loadedUser = null;
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ msg: "User with this username does not exist" });
      }
      loadedUser = user;
      //* comparing hashes 
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (loadedUser === null) return;
      if (!isEqual) {
        return res.status(401).send({ msg: "Wrong Password" });
      }

      jwt.sign(
        {
          userId: loadedUser._id.toString(),
        },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "2h" },
        (err, data) => {
          if (err) res.send({ error: "Error in jwt token" });
          loadedUser.token = data;
          console.log(loadedUser.token);
        }
      );
      res.status(200).json("Login Successful");
    })
    .catch((err) => {
      res.status(500).json("error occured");
    });
};
