const User = require('../models/user');
const createError = require('http-errors');

exports.create = async (req, res) => {
  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  res.json(user);

};

exports.list = async (req, res) => {
  const users = await User.find()
  res.json(users);
};

exports.show = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw createError(404, "User not found.");

  res.json(user);
}

exports.update = async (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  const updatedUser = await User.findByIdAndUpdate(req.params.id, data)
  if (!updatedUser) throw createError(404, "User not found.");

  res.json();
};

exports.delete = async (req, res) => {
  const deleted = await User.findByIdAndRemove(req.params.id);
  if (!deleted) throw createError(404, "User not found.");

  res.json({ message: "User deleted" });
};