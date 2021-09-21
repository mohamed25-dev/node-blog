const Post = require('../models/post');
const createError = require('http-errors');

exports.create = async (req, res) => {
  try {
    const model = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id
    });

    await model.save();
    res.json();
    
  } catch (error) {
    throw createError(400, "All fields are required");
  }
};


exports.list = async (req, res) => {
  const posts = await Post.find()
    .select('-comments')
    .sort({ created_at: 'desc' })
    .populate('author', 'name');

  setTimeout(()=> {
    res.json(posts);
  }, 1000)
};

exports.details = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId)
    .populate('author', 'name')
    .populate('comments.author', 'name');

  if (!post) throw createError(404);

  res.json(post);
};

exports.update = async (req, res) => {
  const postId = req.params.id;
  const data = {
    title: req.body.title,
    content: req.body.content
  };

  const post = await Post.findOneAndUpdate({ _id: postId, author: req.user.id }, data, { runValidators: true })
  if (!post) throw createError(404);

  res.json();
};


exports.delete = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findOneAndDelete({ _id: postId, author: req.user.id });
  if (!post) throw createError(404);

  res.json();
};