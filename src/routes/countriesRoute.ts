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
