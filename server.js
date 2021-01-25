const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// routes
app.use('/api/infos', require('./routes/api/infos'))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
