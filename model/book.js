const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    author: {
        type: mongoose.Schema.Types.ObjectId, // Utilisation de l'ObjectId pour faire référence à un utilisateur
        ref: 'User', // Référence au modèle User
        required: true // L'auteur est obligatoire
    },
    year: Number
});

const Book = mongoose.model('Books', bookSchema);

module.exports = Book;
