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