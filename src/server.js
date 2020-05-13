const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://gerson:gerson@cluster0-lyyse.mongodb.net/investment?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

server.use(express.json());
server.use(routes);
server.use(errors());

server.listen(3333);