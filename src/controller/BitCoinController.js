const axios = require('axios');
const sgMail = require('@sendgrid/mail');
const Bank = require('../model/Bank');
require('dotenv').config();

module.exports = {
    async price(request, response) {

        // process.env.SENDGRID_API_KEY = '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';
        sgMail.setApiKey('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');
        const msg = {
            to: "gersonalifer@hotmail.com",
            from: "gersonalifear@hotmail.com",
            subject: "Send grid",
            text: "super facil",
            html: "<strong>kk</strong>"
        };

       sgMail.send(msg).then(() => {
        res.redirect('/users');
        }).catch((error) => {
            console.log('error', error);
        });


        const result = await axios.get('https://www.mercadobitcoin.net/api/BTC/ticker/');

        if (result) {
            const priceBTC = {
                buy: result.data.ticker.buy,
                sell: result.data.ticker.sell
            };
            response.json({
                content: priceBTC,
                status: true,
                message: 'Quotation found successfully!'
            });
        } else {
            response.json({
                content: '',
                status: false,
                message: 'The quotations could not be consulted.'
            })
        }
    },

    /*O Cliente deve poder fazer compras de bitcoins usando seu saldo disponível na conta.
     Essa compra será a conversão do valor em reais pela cotação de venda.
    Deve ser enviado um email informando o valor investido em R$ e o valor comprado de BTC. */
    async buy(request, response) {

        const { idUser } = request.body;

        var extract = await Bank.find().where('idUser', idUser);
        console.log(extract[0].value);

        var element = 0;
        for (let index = 0; index < extract.length; index++) {
             element += extract[index].value;
            
        }
        console.log(element)
        

        const result = await axios.get('https://www.mercadobitcoin.net/api/BTC/ticker/');


        response.json(result.data.ticker.sell);

    },

    /*O Cliente poderá vender seus bitcoins. O valor será debitado de seus investimentos,
     na ordem da compra e na cotação do momento do BTC até atingir o valor de saque desejado.
      O dinheiro deve retornar para a conta dele na plataforma.
    No caso de venda parcial o investimento deve ser liquidado completamente, e o valor residual
     deve ser reinvestido usando a cotação original do BTC. As duas transações (saque parcial e
     investimento) devem estar presentes no extrato.
    Deve ser enviado um email informando o valor vendido em BTC e o valor resgatado em R$*/
    async sale(request, response) {

    },

    /*Deverá ser possível listar os depósitos, compras e resgates, com suas respectivas datas e cotações 
    para o cliente ter transparência do que foi feito nos últimos 90 dias ou por intervalo customizado. */
    async extract(request, response) {

    }
}