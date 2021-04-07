const express = require('express');
const Department = require('../models/department');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/department', auth, async (req, res) => {
  const department = new Department({
    ...req.body,
    user: req.user._id,
  });

  try {
    await department.save();
    res.status(201).send(department);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /department?limit=10&skip=20
// GET /department?sortBy=createdAt:desc
router.get('/department', auth, async (req, res) => {
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: 'department',
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.department);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/department/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const department = await Department.findOne({ _id });

    if (!department) {
      return res.status(404).send();
    }

    res.send(department);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/department/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const department = await Department.findOne({ _id: req.params.id });

    if (!department) {
      return res.status(404).send();
    }

    updates.forEach((update) => (department[update] = req.body[update]));
    await department.save();
    res.send(department);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/department/:id', auth, async (req, res) => {
  try {
    const department = await Department.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!department) {
      res.status(404).send();
    }

    await department.deleteOne();

    res.send(department);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
