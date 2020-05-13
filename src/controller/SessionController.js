const User = require('../model/User');
const jwt   = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authConfig = require('../../config/auth');

module.exports = {
    async create(request, response) {
        const { email, password } = request.body;
        const user = await User.find().where('email', email);

        if (!user) {
            return response.status(401).json({
                error: 'User not found'
            })
        }

        if(!(await bcrypt.compare(password, user[0].password ))) { 
            return response.status(401).json({
                error: 'Password does not match'
            });
        }

        const { id, name } = user;

        return response.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig().secret, {
               expiresIn: authConfig().expiresIn
            }),
        })
    }
}
    