const jwt = require('jsonwebtoken');
const User = require('../model/user');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');

        // Chercher l'utilisateur dans la base de données
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // req.user contiendra tout le payload : userId, username, role, etc.
        req.user = decoded;

        next(); //transmet req.user aux routes ou autres middlewares
    } catch (error) {
        res.status(400).json({ error, message: 'Invalid token' });
    }
};
