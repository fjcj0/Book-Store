import jwt from 'jsonwebtoken';
export const generateTokenAndSetCookieAdmin = (response, adminId) => {
    const tokenAdmin = jwt.sign({ adminId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    response.cookie("tokenAdmin", tokenAdmin, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return tokenAdmin;
}
