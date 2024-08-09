import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - published
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the book
 *         author:
 *           type: string
 *           descripton: Name of the author of the book
 *         published:
 *           type: boolean
 *           descripton: If the book is published or not
 *       example:
 *         title: A great book
 *         author: John
 *         published: true
 *     BookUpdate:
 *       type: object
 *       optional:
 *         - title
 *         - author
 *         - published
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the book
 *         author:
 *           type: string
 *           descripton: Name of the author of the book
 *         published:
 *           type: boolean
 *           descripton: If the book is published or not
 *       example:
 *         title: An updated book title
 *         author: A new author
 *         published: true
 *
 * @swagger
 *  tags:
 *    name: Books
 */

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
