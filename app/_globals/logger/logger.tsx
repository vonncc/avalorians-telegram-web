import { createLogger, format, transports } from 'winston';

// Create the logger
const logger = createLogger({
  level: 'info', // Minimum level of logs to capture (error, warn, info, etc.)
  format: format.combine(
    format.timestamp(), // Add timestamp to logs
    format.json() // Format logs as JSON
  ),
  transports: [
    // Output logs to console
    new transports.Console({
      format: format.combine(
        format.colorize(), // Add color to console logs
        format.simple() // Simple format for console
      )
    }),
    // Output logs to a file
    new transports.File({ filename: 'logs/app.log' })
  ]
});

export default logger;
