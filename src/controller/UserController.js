const User = require('../model/User');

module.exports = {
    async createUser(request, response) {
        const { name, email, password } = request.body;

        const userExists = await User.findOne().where('email', email);

        if(userExists) {
            return response.status(400).json({
                error: 'user already exists.'
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        if(user) {
            return response.status(200).json({
                status: true,
                message: 'User has been registred',
                content: name
            });
        } else {
            return response.status(400).json({
                status: false,
                message: 'Error',
                content: 'name'
            })
        }
    },

    async updateUser(request, response) {
        response.json({
            status: true,
        });
    }
};