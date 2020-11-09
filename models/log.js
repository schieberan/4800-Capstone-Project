const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema(
  {
    mare: {
      type: Schema.Types.ObjectId,
      ref: 'Mare'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Log', logSchema);
