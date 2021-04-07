const express = require('express');
const Project = require('../models/project');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/project', auth, async (req, res) => {
  const project = new Project({
    ...req.body,
    user: req.user._id,
  });

  try {
    await project.save();
    res.status(201).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /project?limit=10&skip=20
// GET /project?sortBy=createdAt:desc
router.get('/project', auth, async (req, res) => {
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: 'project',
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.project);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/project/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const project = await Project.findOne({ _id });

    if (!project) {
      return res.status(404).send();
    }

    res.send(project);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/project/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'color', 'department'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const project = await Project.findOne({ _id: req.params.id });

    if (!project) {
      return res.status(404).send();
    }

    updates.forEach((update) => (project[update] = req.body[update]));
    await project.save();
    res.send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/project/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      res.status(404).send();
    }

    res.send(project);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
