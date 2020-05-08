const axios = require('axios');
const sgMail = require('@sendgrid/mail');
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
    }
}