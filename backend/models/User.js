const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

exports.create = async ({ username, email, password }) => {
  const user = new User({ username, email, password });
  return await user.save();
};

exports.findByEmail = async (email) => {
  return await User.findOne({ email });
}; 