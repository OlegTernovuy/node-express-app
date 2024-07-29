import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { countryRoutes, dishesRoutes } from './src/routes/index';
import errorHandler from './src/middlewares/errorHandler';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4200;

mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log('MongoDB conected successfully'))
    .catch((err) => console.log('MongoDB conected failed', err));

app.use(express.json());

app.use('/countries', countryRoutes);

app.use('/', dishesRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
