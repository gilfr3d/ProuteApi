import 'dotenv/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { logger } from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors'
import { corsOptions } from './config/corsOptions.js';
import { fileURLToPath } from 'url';


const PORT = process.env.PORT || 3000; //change it to your port Mr Gil
const app = express();

app.use((req, res, next) => {
  logger(req, res, next, __dirname);
});
app.use(cors(corsOptions))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

app.use('/', express.static(path.join(__dirname, "public")));

//* Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//middleware for cookies
app.use(cookieParser());

// * Routes
app.use('/api', routes);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));


