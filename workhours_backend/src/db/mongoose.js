const mongoose = require('mongoose');
const fs = require('fs');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DATABASE_NAME,
} = process.env;

mongoose
  .connect(`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DATABASE_NAME}`, {
    user: MONGO_USERNAME,
    pass: MONGO_PASSWORD,
    auth: { authSource: 'admin' },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .catch((error) => {
    console.error(error);
  });
