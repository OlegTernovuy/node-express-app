import { Router } from 'express';

import {
    addDishes,
    countDishesByCountry,
    deleteDishes,
    getDishes,
    getDishesByCountryId,
    updateDishes,
} from '../controllers/dishesController';

const dishesRoutes = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a user
 *     description: Create a new user and default set status disabled
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: email@test.com
 *                 password:
 *                   type: string
 *                   example: password
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully. Awaiting approval
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Some Server Error
 */

dishesRoutes.get('/dishes', getDishes);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a user
 *     description: Authenticate a user and create a session cookie
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: email@test.com
 *                 password:
 *                   type: string
 *                   example: password
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User login successfully
 *       400:
 *         description: Invalid auth-credential
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid auth-credential
 *       403:
 *         description: Disabled account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User account is disabled
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */

dishesRoutes.get('/dishes/countDishes', countDishesByCountry);

/**
 * @openapi
 * /api/auth/check-auth:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Check auth
 *     description: Check if the user is authenticated
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User is authenticated
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       example: unique identifier
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Some Server Error
 */

dishesRoutes.get('/dishes/country/:countryId', getDishesByCountryId);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout
 *     description: Logout from account and delete session cookie
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged out
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error logout user
 */

dishesRoutes.post('/dishes', addDishes);

dishesRoutes.patch('/dishes/:id', updateDishes);

dishesRoutes.delete('/dishes/:id', deleteDishes);

export { dishesRoutes };
