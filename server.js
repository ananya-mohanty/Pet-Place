const express = require('express');
const mongoose = require('mongoose');
const items = require('./routes/api/donation');
const app = express();

//DB config
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose
    .connect(db)
    .then(() => console.log("Connected to database"))
    .catch(err => console.log(err));

    const port = process.env.PORT || 5000;
    app.use('/api/donations', donations);
    app.listen(port, () => console.log(`Server started on port ${port}`));