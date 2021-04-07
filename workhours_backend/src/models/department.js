const mongoose = require('mongoose');
const Project = require('./project');
const Hour = require('./hour');

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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

departmentSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function () {
    const department = this._id;
    const projects = await Project.find({ department });

    projects.forEach((project) => {
      project.deleteOne();
    });
  }
);

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
