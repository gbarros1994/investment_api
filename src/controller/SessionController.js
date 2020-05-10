const User = require('../model/User');
const jwt   = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authConfig = require('../../config/auth');

module.exports = {
    async store(request, response) {
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
             token: jwt.sign({ id }, '2e3746e131d178d04609038957bfa567', {
                expiresIn: '7d'
             }),
         })
    }
}
    