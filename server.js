const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const morgan = require('morgan');

const server = express();

// Middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'));
server.use(cors());

//imports from codebase
const publicRouter = require('./data/router/publicRouter.js')

// Routes
server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the DJ Helper backend.'});
})

server.use('/api/', publicRouter);


// Exports
module.exports = server;