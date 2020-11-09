const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  status: {
    type: String
  },
  createdLog: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Log'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
