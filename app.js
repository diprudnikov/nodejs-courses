import queryParser from './middlewares/queryParser';
import cookieParser from './middlewares/cookieParser';
import express from 'express';
import apiRouter from './routes/apiRouter';

const app = express();

app.use(queryParser);
app.use(cookieParser);

app.use(apiRouter);

export default app;