import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Token missing or malformed');
        return res.status(401).json({ error: 'Token required' });
    }


    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

        console.log('Decoded Token:', decoded);

        req.user = decoded;

        next();
    } catch (error) {
        console.log('Token verification error:', error);

        res.status(403).json({ error: 'Invalid or expired token' });
    }
};
