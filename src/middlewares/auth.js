const jwt = require('jsonwebtoken');
const { User } = require('../model');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'You need to be authenticated.' });
    }
};

module.exports = authMiddleware;