import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { countryRoutes, dishesRoutes } from './src/routes/index';
import errorHandler from './src/middlewares/errorHandler';
import swaggerSpec from './src/utils/swagger';

const swaggerUICss =
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.4.0/swagger-ui.min.css';

const customCss =
    '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; width: 100%; }, .opblock .opblock-control-arrow { background: none; border: none; } ';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4200;

mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log('MongoDB conected successfully'))
    .catch((err) => console.log('MongoDB conected failed', err));

app.use(express.json());

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customCssUrl: swaggerUICss,
        customCss: customCss,
    })
);

app.use('/countries', countryRoutes);

app.use('/', dishesRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
