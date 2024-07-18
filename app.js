import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import contactRouter from './routes/contact-router.js';
import educationRouter from './routes/education-router.js';
import authRouter from './routes/auth/auth-router.js';
import experienceRouter from './routes/experience-router.js';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/contact_information', contactRouter);
app.use('/education', educationRouter);
app.use('/experience', experienceRouter);
app.use('/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

export default app;
