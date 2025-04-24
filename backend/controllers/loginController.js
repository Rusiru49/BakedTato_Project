const { Login, validate } = require('../models/loginModel');
const bcrypt = require('bcrypt');

exports.addLogin = async (req, res) => {
    try {

        const { error } = validate(req.body);

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const user = await Login.findOne({ username: req.body.username });
        if (user) {
            return res.status(409).json({ message: 'This user name is already exists' });
        }

        const salt = await bcrypt.genSalt(Number(10));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newuser = new Login({

            ...req.body,
            password: hashPassword
        });

        await newuser.save();
        res.json({ success: true, message: 'User added successfully' });
    }
    catch (error) {
        console.error('Error adding user: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.getUser = async (req, res) => {
    try {
        const allUser = await Login.find();
        res.json({ allUser });
    } catch (error) {
        console.error('Error getting Users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedUser = await Login.findOneAndDelete({ _id });

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User deleted successfully', data: deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.updateUser = async (req, res) => {

    try {
        const { _id, username, email } = req.body;

        const updatedUser = await Login.findOneAndUpdate({ _id }, {

            _id,
            username,
            email,
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'Selected user not found' });
        }

        res.json({ success: true, message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        console.error('Error updating User:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}



