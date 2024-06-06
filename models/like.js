
const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'listings',
    required: true,
  },
});


const Like = mongoose.model('like', LikeSchema);
module.exports = {Like}
