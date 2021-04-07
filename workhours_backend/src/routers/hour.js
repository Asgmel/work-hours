const express = require('express');
const Hour = require('../models/hour');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/hour', auth, async (req, res) => {
  const hour = new Hour({
    ...req.body,
    user: req.user._id,
  });

  try {
    await hour.save();
    res.status(201).send(hour);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /hour?limit=10&skip=20
// GET /hour?sortBy=createdAt:desc
router.get('/hour', auth, async (req, res) => {
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: 'hours',
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.hours);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/hour/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const hour = await Hour.findOne({ _id, user: req.user._id });

    if (!hour) {
      return res.status(404).send();
    }

    res.send(hour);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/hour/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'project', 'start', 'end', 'date'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const hour = await Hour.findOne({ _id: req.params.id, user: req.user._id });

    if (!hour) {
      return res.status(404).send();
    }

    updates.forEach((update) => (hour[update] = req.body[update]));
    await hour.save();
    res.send(hour);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/hour/:id', auth, async (req, res) => {
  try {
    const hour = await Hour.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!hour) {
      res.status(404).send();
    }

    res.send(hour);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
