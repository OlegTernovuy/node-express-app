import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';

const swaggerSpec = swaggerJsDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bookshelf API',
            version: '1.0.0',
            description: 'A CRUD Bookshelf project',
        },
    },
    apis: [
      path.join(__dirname, '../routes/*.js'),  // Шлях до всіх .js файлів у папці routes
      path.join(__dirname, '../routes/*.ts'),  // Шлях до всіх .ts файлів у папці routes
      path.join(__dirname, './swagger.js'),    // Шлях до файлу swagger.js у папці utils
      path.join(__dirname, './swagger.ts'),    // Шлях до файлу swagger.ts у папці utils
    ],
});

export default swaggerSpec;
