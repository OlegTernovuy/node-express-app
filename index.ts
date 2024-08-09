import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggetJsdoc from 'swagger-jsdoc';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { countryRoutes, dishesRoutes } from './src/routes/index';
import errorHandler from './src/middlewares/errorHandler';
import swaggerSpec from './src/utils/swagger';
// import swaggerSpec from './src/swagger';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4200;

const swaggerUICss =
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css';

// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Docs',
//             version: '1.0.0',
//             description: 'Documentation for axels-loki-api',
//         },
//         servers: [{ url: 'https://loki-api2.axels.com.ua/api' }],
//     },
//     apis: ['src/routes/*.ts'],
// };

// const swaggerSpec = swaggetJsdoc(options);

mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log('MongoDB conected successfully'))
    .catch((err) => console.log('MongoDB conected failed', err));

app.use(express.json());

// app.use(
//     '/docs',
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerSpec, { customCssUrl: swaggerUICss })
// );

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { customCssUrl: swaggerUICss })
);

app.use('/countries', countryRoutes);

app.use('/', dishesRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
