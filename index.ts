import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import errorHandler from './src/middlewares/errorHandler';
import { router } from './src/routes/countries';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4200;

mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log('MongoDB conected successfully'))
    .catch((err) => console.log('MongoDB conected failed', err));

app.use(express.json());

app.use('/countries', router);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
