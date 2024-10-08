const User = require('../model/user');
const { verifyUser } = require('../validator/user');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        console.error('Error fetching the user:', error);
        res.status(500).json({ message: 'Error fetching the user' });
    }
};

exports.updateUser = async (req, res) => {
    verifyUser(req.body);
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, password: hashedPassword },
            { new: true }
        );

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating the user:', error);
        res.status(500).json({ message: 'Error updating the user' });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting the user:', error);
        res.status(500).json({ message: 'Error deleting the user' });
    }
};
