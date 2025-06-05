import jwt from 'jsonwebtoken';
export const verifyToken = async (request, response, next) => {
    const token = request.cookies.token;
    if (!token) {
        return response.status(404).json({ success: false, message: 'Unauthorized - no token provided!!' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return response.status(404).json({ success: false, message: 'Unauthorized - invalid token!!' })
        request.userId = decoded.userId;
        next();
    }
    catch (error) {
        return response.status(400).json({ success: false, message: error.message });
    }
};