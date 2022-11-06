const crypto = require('crypto');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken')

exports.signup = async (req, res, next) => {
  const {name, email, password, passwordConfirm} = req.body
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm
  });
  // success : 201 means work with token
  createSend(newUser, 201, res);
};

const createSend = (user, statusCode, res) => {
  // Remove password from output
  // user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    data: {
      user
    }
  });
};





exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send  to client
  createSend(newUser, 201, res);
};

// const correctPassword