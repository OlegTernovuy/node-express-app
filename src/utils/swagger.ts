import swaggerJsDoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJsDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bookshelf API',
            version: '1.0.0',
            description: 'A CRUD Bookshelf project',
        },
        servers: [{ url: 'https://loki-api2.axels.com.ua' }, { url: 'http://localhost:3100' }],
    },
    apis: [`${__dirname}/../routes/*.ts`, `${__dirname}/../routes/*.js`],
});

export default swaggerSpec;
