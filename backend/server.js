const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.set('strictQuery', true);
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log('MOngodb connection established successfully');
})

const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');

app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
})