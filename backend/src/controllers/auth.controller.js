import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
export const signup = async (request, response) => {
    const { email, username, name, password } = request.body;
    try {
        if (!email || !username || !name || !password) {
            return response.status(404).json({ success: false, message: "some fields are required!!" });
        }
        const userAlreadyExist = await User.findOne({ email, username });
        if (userAlreadyExist) {
            return response.status(400).json({ success: false, message: "username or email already exist!!" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            username,
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //24 hours
        });
        await user.save();
        generateTokenAndSetCookie(response, user._id);
        return response.status(201).json({
            success: true,
            message: "user has been created successfully!!",
            user: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        return response.status(404).json({ success: false, message: error.message })
    }
};
export const login = async (request, response) => {
    response.send("login page");
};
export const logout = async (request, response) => {
    response.send("logout page");
};