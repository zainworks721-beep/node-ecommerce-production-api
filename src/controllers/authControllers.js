import User from "../model/user.model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/nodemailer.js"
import {welcomeEmail} from '../templates/welcomeEmail.js'

export const registerController = async (req, res, next) => {

    try {
        const { username, email, password, phoneNumber } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            username,
            email,
            password: hashPassword,
            phoneNumber: phoneNumber || null,
        });

        await sendEmail({
            to: email,
            subject: "Welcome!",
            html: welcomeEmail(email, username),
        });

        const createdUser = user.toObject();
        delete createdUser.password;

        return res.status(201).json({

            success: true,
            message: "User registered successfully",
            data: createdUser,

        });


    } catch (error) {

        if (error.code === 11000) {

            const field = Object.keys(error.keyValue)[0];
            return res.status(409).json({
                success: false,
                message: `This ${field} is already in use.`,
            });

        }

        next(error);

    }
};


export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const payload = { id: user._id, role: user.role };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "7d",
        });

        await User.findByIdAndUpdate(user._id, {
            refreshToken: refreshToken,
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: userResponse,
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        next(error);
    }
};