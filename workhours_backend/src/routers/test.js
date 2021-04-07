const express = require('express');
const eachDayOfInterval = require('date-fns/eachDayOfInterval');
const subMonths = require('date-fns/subMonths');
const format = require('date-fns/format');
const User = require('../models/user');
const Department = require('../models/department');
const Project = require('../models/project');
const Hour = require('../models/hour');
const departments = require('../examples/exampleData');
const router = new express.Router();

router.get('/test', async (req, res) => {
  try {
    const user = new User({
      name: 'Test Testerson',
      email: `${new Date().getTime()}@test-user.com`,
      password: `${new Date().getTime()}`,
    });
    await user.save();

    const hours = [];
    const colors = [
      'red',
      'pink',
      'indigo',
      'purple',
      'teal',
      'lime',
      'green',
      'amber',
      'orange',
      'blue',
    ];
    const days = [
      ['08:00', '10:00', '13:00', '16:00'],
      ['08:00', '11:00', '15:00', '16:00'],
      ['08:00', '12:00', '16:00'],
      ['08:00', '16:00'],
      ['09:00', '13:00', '14:00', '16:00'],
      ['08:00', '10:00', '13:00', '17:00'],
      ['07:30', '10:45', '14:00', '16:00'],
      ['08:00', '10:00', '11:00', '19:00'],
      ['08:00', '11:00', '15:00'],
      ['08:00', '10:00', '11:00', '12:00'],
    ];

    for (const iDepartment of departments) {
      const department = new Department({
        name: iDepartment.name,
        user: user._id,
      });
      await department.save();

      for (const iProject of iDepartment.projects) {
        const project = new Project({
          name: iProject.name,
          color: colors.pop(),
          department: department._id,
          user: user._id,
        });
        await project.save();

        for (const hour of iProject.hours) {
          hours.push({
            description: hour,
            project: project._id,
          });
        }
      }
    }

    const end = new Date();
    const start = subMonths(end, 2);
    const dates = eachDayOfInterval({ start, end });

    for (const date of dates) {
      const day = days[Math.floor(Math.random() * days.length)];
      for (let i = 0; i < day.length - 1; i++) {
        const iHour = hours[Math.floor(Math.random() * hours.length)];
        const hour = new Hour({
          description: iHour.description,
          project: iHour.project,
          start: day[i],
          end: day[i + 1],
          date: format(date, 'yyyy-MM-dd'),
          user: user._id,
        });
        await hour.save();
      }
    }
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

module.exports = router;
