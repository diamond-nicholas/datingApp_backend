const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');
require('express-async-errors'); //async errors
const datingCards = require('./Routes/datingCards');

//app config
app.use(express.json());
const PORT = process.env.PORT || 8001;

//middlewares

//api endpoints
app.get('/', (req, res) => {
  res.status(200).send('hello world and yey my app is running live');
});

app.use('/api/v1/dating', datingCards);

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
