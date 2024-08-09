/**
 * @swagger
 *   /auth/register:
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
