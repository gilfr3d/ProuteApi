import rateLimit from "express-rate-limit";
import { logEvents } from "./logger.js";

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5, //limit each IP to 5 login request per `window` per minute
    message: {
        message: 'Too many login attempts from this IP, please try again after 60 seconds'
    },
    handler: (req, res, next, options) => {
        logEvents(`Too Many Request: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errorLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, // Return rate limit info in the `Ratelimit-*` headers
    legacyHeaders: false, // Disable the `X-Ratelimit-*` headers
})

export default loginLimiter