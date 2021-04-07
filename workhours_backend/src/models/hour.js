const mongoose = require('mongoose');

const hourSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'Project',
    },
    user: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Hour = mongoose.model('Hour', hourSchema);

module.exports = Hour;
