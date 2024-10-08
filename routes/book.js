const express = require('express');
const router = express.Router();
const bookController = require('../controller/book');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Books API Endpoints
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags: [Books]
 *     description: Get all books
 *     responses: 
 *       200:
 *         description: Success
 *         content:
 *              application/json:
 *                  schema:
 *                      type: 
 *                      array:
 *                          items:
 *                          properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                    type: string
 *                                  name: 
 *                                    type: string                                                          
 */

router.post('/books', bookController.addBook);
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

// Route pour obtenir tous les livres d'un utilisateur
router.get('/users/:id/books', authMiddleware, bookController.getUserBooks);

module.exports = router;
