const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.register = async (req, res) => {
    console.log('Register Controller Hit');
    console.log(req.body)
    try {
        const { name, email, password } = req.body;


        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const HashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: HashPassword
        });

        await user.save();
        res.status(201).json({ message: 'User Created', user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server Error', error: err.message });
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: "User not found" })
        }

        const match = await bcrypt.compare(
            password, user.password
        );

        if (!match) {
            res.status(400).json({ message: 'Invalid password' })
        }

        const token = jwt.sign(
            { id: user._id }, process.env.JWT_SECRET,
            { expiresIn: '15m' }
        )

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' })
    }
}

exports.getUsers = async (req, res) => {
    try {

        const users = await User.find()
            .select('-password');

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};