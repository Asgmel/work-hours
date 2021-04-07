const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Hour = require('./hour');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error('Invalid e-mail');
        }
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('hours', {
  ref: 'Hour',
  localField: '_id',
  foreignField: 'user',
});

userSchema.virtual('project', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'user',
});

userSchema.virtual('department', {
  ref: 'Department',
  localField: '_id',
  foreignField: 'user',
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return null;
  }

  return user;
};

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete user hours when user is removed
userSchema.pre('remove', async function (next) {
  const user = this;
  await Hour.deleteMany({ user: user._id });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
