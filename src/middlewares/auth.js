const jwt = require('jsonwebtoken');
const promisify  = require('util');
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
            // const decoded = await promisify(jwt.verify)(token, '2e3746e131d178d04609038957bfa567');
            const result = jwt.verify(token, '2e3746e131d178d04609038957bfa567');
            console.log(result)
            console.log(authConfig.secret);

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