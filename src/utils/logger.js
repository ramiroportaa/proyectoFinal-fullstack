import winston from "winston";

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm' }),
        winston.format.label({ label: process.pid }),
        winston.format.printf((dataLog) => {
          return `[${dataLog.level.toUpperCase()}] | ${dataLog.timestamp} | pid: ${dataLog.label}: ${dataLog.message}`;
        })
    ),
    transports: [
        new winston.transports.Console({level: "info"}),
        new winston.transports.File({filename: "logs/warn.log", level: "warn"}),
        new winston.transports.File({filename: "logs/error.log", level: "error"})
    ]
})

export default logger;