const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mareSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  camera: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
      type: String
  },
  creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
});

module.exports = mongoose.model('Mare', mareSchema);
