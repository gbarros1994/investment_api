const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async auth(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: 'Token not provided!',
                content: ''
            })
        }

        const [, token] = authHeader.split(' ');

        try {
            const result = jwt.verify(token, authConfig().secret);

            console.log(result)

            return next();
        } catch (err) {
            return res.status(401).json({
                status: false,
                message: 'Token invalid!',
                content: ''
            })
        }
    }
}