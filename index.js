const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./db/connect');
require('express-async-errors'); //async errors
const datingCards = require('./Routes/datingCards');
const users = require('./Routes/user');
const conversation = require('./Routes/Conversation');
const message = require('./Routes/Message');

//app config
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
const PORT = process.env.PORT || 8001;

//middlewares

//api endpoints
app.get('/', (req, res) => {
  res.status(200).send('hello world and yey my app is running live');
});

app.use('/api/v1/dating', datingCards);
app.use('/api/v1/users', users);
app.use('api/v1/conversation', conversation);
app.use('api/v1/message', message);

//listener
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`app is listening on port ${PORT}....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
