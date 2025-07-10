import jwt from 'jsonwebtoken';
export const verifyTokenAdmin = async (request, response, next) => {
    const tokenAdmin = request.cookies.tokenAdmin;
    if (!tokenAdmin) {
        return response.status(404).json({ success: false, message: 'Unauthorized - no token provided!!' });
    }
    try {
        const decoded = jwt.verify(tokenAdmin, process.env.JWT_SECRET);
        if (!decoded) return response.status(404).json({ success: false, message: 'Unauthorized - invalid token!!' })
        request.adminId = decoded.adminId;
        next();
    }
    catch (error) {
        return response.status(400).json({ success: false, message: error.message });
    }
};