const { Book, Author } = require('../model');

exports.createBook = async (req, res, next) => {
    try {
        // req.body > get the data from the request body (from the form on the frontend)
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
};

exports.getAllBooks = async (req, res, next) => {
    try {
        // SELECT * FROM books LEFT JOIN authors ON books.author_id = authors.id
        const books = await Book.findAll({ include: Author });
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

exports.getOneBook = async (req, res, next) => {
    try {
        const { id } = req.params; // Récupérer l'ID du livre depuis les paramètres de la requête
        const book = await Book.findByPk(id, {
            include: Author // Inclure les informations de l'auteur
        });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

exports.updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await Book.update(req.body, { where: { id } });

        if (updated[0] === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const updatedBook = await Book.findOne({ where: { id }, include: Author });
        res.status(200).json(updatedBook);
    } catch (error) {
        next(error);
    }
};

exports.deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Book.destroy({ where: { id } });

        if (deleted === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        next(error);
    }
};