import { check } from 'express-validator';
import { Router } from 'express';

import {
    addCountry,
    countryWithDishes,
    deleteCountry,
    getCountries,
    getCountryById,
    searchCountry,
    updateCountry,
} from '../controllers/countriesController';

import { upload } from '../utils/imageStorege';

const countryRoutes = Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: the list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

countryRoutes.get('/', getCountries);

countryRoutes.get('/countryWithDishes', countryWithDishes);

countryRoutes.get('/search', searchCountry);

countryRoutes.get('/:id', getCountryById);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Gets a book by id
 *     tags: [Books]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of book
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: book info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: book is not found
 */

countryRoutes.post(
    '/',
    upload.single('images'),
    [
        check('country', 'Country is required').notEmpty(),
        check('capital', 'Capital is required').notEmpty(),
    ],
    addCountry
);

countryRoutes.patch('/:id', updateCountry);

countryRoutes.delete('/:id', deleteCountry);

export { countryRoutes };
