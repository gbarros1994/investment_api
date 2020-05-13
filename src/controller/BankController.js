const Bank = require('../model/Bank');
const User = require('../model/User');

module.exports = {
    async create(request, response) {
        const { idUser, value, description, status } = request.body;
        const existUser = await User.find().where('_id', idUser);

        if (existUser) {
            const bank = await Bank.create({
                idUser,
                value,
                description,
                status
            });
    
            if (bank) {
                return response.status(201).json({
                    status: true,
                    content: bank,
                    message: 'Successful deposit!'
                });
            } else {
                return response.status(204).json({
                    status: false,
                    content: '',
                    message: 'Could not make deposit!'
                });
            }
        } else {
            return response.status(400).json({
                status: false,
                content: '',
                message: 'Could not make deposit!'
            });
        }

    },

    async extract(request, response) {
       const extract = await Bank.find().where('idUser', request.params.id);

        const sumResult = extract.map(a => {
            const extract =+ a.value;
            return extract
        })

        const numbers = sumResult;
        const sum = (acumulado, x) => acumulado + x;
        const total = numbers.reduce(sum);

        if (total) {
            return response.status(200).json({
                status: true,
                message: 'Account balance ',
                content: {
                    idUser: request.params.id,
                    value: total
                }
            });
        } else {
            return response.status(400).json({
                status: true,
                message: 'Could not query.',
                content: ''
            });
        }
    }
};