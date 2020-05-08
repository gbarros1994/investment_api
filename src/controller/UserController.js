const User = require('../model/User');

module.exports = {
    async createUser(request, response) {
        const { name, email, password } = request.body;

        const verifyEmail = await User.find().where('email', email);

            const user = await User.create({
                name,
                email,
                password
            });

            return response.json(user)
    },
};