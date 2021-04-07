const mongoose = require('mongoose');
const Hour = require('./hour');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'Department',
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

projectSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function () {
    const project = this._id;
    const hours = await Hour.find({ project });

    hours.forEach((hour) => {
      hour.deleteOne();
    });
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
