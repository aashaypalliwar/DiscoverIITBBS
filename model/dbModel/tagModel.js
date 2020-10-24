const mongoose = require('mongoose');
const validator = require('validator');

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Tag name must be specified'],
    },
    group: {
      type: String,
      required: [true, 'A tag must have a tag group'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tagSchema.index({ name: 'text', group: 'text' });

tagSchema.virtual('users',{
  ref : 'User',
  foreignField : 'tags',
  localField : '_id'
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
