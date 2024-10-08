const Book = require('../model/book');
const User = require('../model/user');
const { verifyBook } = require('../validator/book');

exports.addBook = async (req, res) => {
    verifyBook(req.body);
    const { title, description, author, year } = req.body;
    // Vérifier si l'auteur est bien un utilisateur dans la base de données
    const user = await User.findById(author);

    if (!user) {
        return res.status(404).json({ message: 'Author not found' });
    }

    const newBook = new Book({
        title,
        description,
        author,
        year
    });

    try {
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        console.error('Error saving the book:', error);
        res.status(500).json({ message: 'Error saving the book' });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books' });
    }
};

exports.getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id).populate('author', 'username email');
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error fetching the book:', error);
        res.status(500).json({ message: 'Error fetching the book' });
    }
};

exports.updateBook = async (req, res) => {
    verifyBook(req.body);
    const { id } = req.params;
    const { title, description, author, year } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, description, author, year }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        console.error('Error updating the book:', error);
        res.status(500).json({ message: 'Error updating the book' });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting the book:', error);
        res.status(500).json({ message: 'Error deleting the book' });
    }
};

exports.getUserBooks = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findById(id);

        // Rechercher tous les livres dont l'auteur est cet utilisateur
        const books = await Book.find({ author: id });

        // Si l'utilisateur n'a pas de livres
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found for this user' });
        }

        res.json(books);
    } catch (error) {
        console.error('Error fetching books for user:', error);
        res.status(500).json({ message: 'Error fetching books for user' });
    }
};
