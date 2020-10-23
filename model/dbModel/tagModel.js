const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: [true, 'Tag Name must exist'],
    },
    tagGroup: {
        type: String,
        required: [true, 'Tag must belong to a tag group']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
