const express = require('express');
const mongoose = require('mongoose');
const donations = require('./routes/api/donation');
const config = require('config');

const app = express();

//bodyparser middleware
app.use(express.json());

//DB config
const db = config.get('mongoURI');

//Connect to mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("Connected to database"))
    .catch(err => console.log(err));

   
app.use('/api/donations', donations);
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
