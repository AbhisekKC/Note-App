import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        // CLEAN FIX: Standardized, case-insensitive check for "Bearer <token>"
        if (!authHeader || !/^Bearer\s+/i.test(authHeader)) {
            return res.status(401).json({ 
                message: 'Authorization header missing or malformed', 
                success: false 
            });
        }   

        // Splits at the space character to isolate the token string cleanly
        const token = authHeader.split(' ')[1];

        // Decode payload synchronously
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // Ensure decoded key matches payload structural signing ('id' or '_id')
        const targetId = decoded.id || decoded._id;

        // Optimization: only select('_id') to limit database overhead
        const userExists = await User.findById(targetId).select('_id'); 
        
        if (!userExists) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Attach ID to request object pipeline
        req.userId = userExists._id; 
        next();
    } 
    catch (error) {
        // Handle specific JWT expiration and structural errors gracefully
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token', success: false });
        }
        
        console.error("Auth Middleware Error:", error); 
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};
