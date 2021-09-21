const Post = require('../models/post');
const createError = require('http-errors');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
  console.log(req.body)
  let data = {
    _id: mongoose.Types.ObjectId(),
    content: req.body.content,
    author: req.user.id
  };

  const post = await Post.findById(req.params.postId);
  
  if (!post) throw createError(404);
  
  post.comments.push(data);
  
  await post.save();
  
  const comment = post.comments.id(data._id);
  res.json(comment);
};