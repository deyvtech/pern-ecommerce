import winston from 'winston';
import config from '../config.js';
const { combine, timestamp, printf, colorize, errors } = winston.format;

// 1. Define your custom format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  // If there's an error stack, show it; otherwise, show the message
  return `${timestamp} [${level}]: ${stack || message}`;
});

// 2. Initialize the logger
const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: combine(
    errors({ stack: true }), // Capture stack traces for errors
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  ),
  transports: [
    // Output to the Console
    new winston.transports.Console({
      format: combine(
        colorize(), // Add colors to the levels (info = green, error = red)
        logFormat
      )
    }),
    // Optional: Save errors to a file
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
});

export default logger;