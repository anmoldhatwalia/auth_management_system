const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const sendEmail = require('../utils/sendEmail');

/* =========================
   REGISTER
========================= */

exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: 'Name, email and password are required'
            });

        }

        const userExists = await User.findOne({ email });

        if (userExists) {

            return res.status(400).json({
                message: 'User already exists'
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = new User({

            name,
            email,
            password: hashedPassword

        });

        await user.save();

        res.status(201).json({

            message: 'User created successfully',
            user

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: 'Internal Server Error'

        });

    }

};


/* =========================
   LOGIN
========================= */

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(400).json({

                message: 'User not found'

            });

        }

        const match =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!match) {

            return res.status(400).json({

                message: 'Invalid password'

            });

        }

        const token = jwt.sign(

            { id: user._id },

            process.env.JWT_SECRET,

            { expiresIn: '15m' }

        );

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

        res.status(500).json({

            message: 'Internal Server Error'

        });

    }

};


/* =========================
   GET USERS
========================= */

exports.getUsers = async (req, res) => {

    try {

        const users = await User.find()

            .select('-password');

        res.status(200).json(users);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};


/* =========================
   FORGOT PASSWORD
========================= */

exports.forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                message: 'User not found'

            });

        }

        const token = jwt.sign(

            { id: user._id },

            process.env.JWT_SECRET,

            { expiresIn: '15m' }

        );

        user.resetToken = token;

        await user.save();

        const resetLink =
            `http://localhost:4200/reset-password/${token}`;

        await sendEmail(

            user.email,

            resetLink

        );

        res.status(200).json({

            message: 'Reset link sent successfully'

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};


/* =========================
   RESET PASSWORD
========================= */

exports.resetPassword = async (req, res) => {

    try {

        const { token, password } = req.body;

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        const user =
            await User.findById(
                decoded.id
            );

        if (!user) {

            return res.status(404).json({

                message: 'User not found'

            });

        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        user.password =
            hashedPassword;

        user.resetToken = null;

        await user.save();

        res.status(200).json({

            message:
                'Password reset successful'

        });

    }

    catch (err) {

        console.log(err);

        res.status(400).json({

            message:
                'Invalid or expired token'

        });

    }

};