const express = require('express');
const router = express.Router();

const bookRoutes = require('./book');
const userRoutes = require('./user');
const authRoutes = require('./auth');

router.use(bookRoutes); 
router.use(userRoutes); 
router.use(authRoutes);  

module.exports = router;
