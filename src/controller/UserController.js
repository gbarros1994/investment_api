const User = require('../model/User');
const Bank = require('../model/Bank');

module.exports = {
    async create(request, response) {
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

    /*Deverá ser possível listar os depósitos, compras e resgates, com suas respectivas datas e cotações 
    para o cliente ter transparência do que foi feito nos últimos 90 dias ou por intervalo customizado. */
    async extract(request, response) {
        const extract = await Bank.find().where('idUser', request.params.id);

        if (extract) {
            response.status(200).json({
                content: extract,
                status: true,
                message: 'Quotation found successfully!'
            });
        } else {
            response.status(400).json({
                content: extract,
                status: false,
                message: 'Unable to check balance!'
            });
        }
    }
};