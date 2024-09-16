const { Author } = require('../model');

exports.createAuthor = async (req, res, next) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch (error) {
        next(error);
    }
};

exports.getAllAuthors = async (req, res, next) => {
    try {
        const authors = await Author.findAll();
        res.status(200).json(authors);
    } catch (error) {
        next(error);
    }
};

exports.getOneAuthor = async (req, res, next) => {
    try {
        const { id } = req.params; // Récupérer l'ID de l'auteur depuis les paramètres de la requête
        const author = await Author.findByPk(id); // Trouver l'auteur par son ID

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json(author);
    } catch (error) {
        next(error);
    }
};

exports.updateAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await Author.update(req.body, { where: { id } });

        if (updated[0] === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }

        const updatedAuthor = await Author.findOne({ where: { id } });
        res.status(200).json(updatedAuthor);
    } catch (error) {
        next(error);
    }
};

exports.deleteAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Author.destroy({ where: { id } });

        if (deleted === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        next(error);
    }
};
