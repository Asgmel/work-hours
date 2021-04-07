require('./db/mongoose');
const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/user');
const hourRouter = require('./routers/hour');
const projectRouter = require('./routers/project');
const departmentRouter = require('./routers/department');
const testRouter = require('./routers/test');

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(hourRouter);
app.use(projectRouter);
app.use(departmentRouter);
app.use(testRouter);

module.exports = app;
