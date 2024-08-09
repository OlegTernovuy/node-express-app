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
 * @openapi
 * paths:
 *   /countries/countryWithDishes:
 *     post:
 *       tags:
 *         - Auth
 *       summary: Register a user
 *       description: Create a new user and default set status disabled
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     example: email@test.com
 *                   password:
 *                     type: string
 *                     example: password
 *       responses:
 *         201:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: User registered successfully. Awaiting approval      
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
