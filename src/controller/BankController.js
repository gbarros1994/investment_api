const Bank = require('../model/Bank');
const User = require('../model/User');

module.exports = {
    //DEPOSITVA O VALOR NA CONTA DO CLIENTE
    async createUserDeposit(request, response) {
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
                return response.status(200).json({
                    status: true,
                    content: bank,
                    message: 'Deposito no valor de: $' +value+ 'reais efetuado com sucesso!'
                });
            } else {
                return response.status(400).json({
                    status: false,
                    message: 'Não foi possível efeturar o deposito'
                });
            }
        } else {
            return response.status(400).json({
                status: false,
                message: 'Usuário informado não esta cadastrado.'
            });
        }

    },

    //TRAS O VALOR EM CONTA DO CLIENTE
    async extractUser(request, response) {
       const extract = await Bank.find().where('idUser', request.params.id);
       console.log(extract)

      const teste = Bank.aggregate([{
        $count: extract[0]
      }])
       console.log(teste)

      return response.json(teste)
    }
};