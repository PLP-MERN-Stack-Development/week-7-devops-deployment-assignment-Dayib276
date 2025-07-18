// Express production middleware: error handling, security, logging, health check
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

function setupMiddleware(app) {
  app.use(helmet());
  app.use(express.json());
  app.use(morgan('combined'));

  // Health check endpoint
  app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

  // Error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });
}

module.exports = setupMiddleware;
