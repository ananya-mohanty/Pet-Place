const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

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

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/ngo', require('./routes/api/auth2'));
app.use('/api/ngoregister', require('./routes/api/ngo'));
app.use('/api/donations', require('./routes/api/donation'));
app.use('/api/contribute', require('./routes/api/contribute'));
app.use('/api/post', require('./routes/api/post'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));