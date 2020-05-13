const axios = require('axios');
const sgMail = require('@sendgrid/mail');
const Bank = require('../model/Bank');
const User = require('../model/User');
require('dotenv').config();

module.exports = {
    async price(request, response) {
        const result = await axios.get('https://www.mercadobitcoin.net/api/BTC/ticker/');

        if (result) {
            const priceBTC = {
                buy: result.data.ticker.buy,
                sell: result.data.ticker.sell
            };
            response.status(201).json({
                status: true,
                message: 'Quotation found successfully!',
                content: priceBTC
            });
        } else {
            response.status(400).json({
                status: false,
                message: 'The quotations could not be consulted.',
                content: ''
            });
        }
    },

    async buy(request, response) {

        const { idUser, quantity } = request.body;
        const extract = await Bank.find().where('idUser', idUser);
        const {email} = await User.findById(idUser);

        const sumResult = extract.map(a => {
            const extract =+ a.value;
            return extract
        })

        const numbers = sumResult;
        const sum = (acumulado, x) => acumulado + x;
        const total = numbers.reduce(sum);
        const result = await axios.get('https://www.mercadobitcoin.net/api/BTC/ticker/');
        const totalBuy = quantity * result.data.ticker.sell;

        if(total > totalBuy) {
            const bank = await Bank.create({
                idUser,
                value: -totalBuy,
                description: "compra bitcoin",
                status: "1"
            });
    
            if (bank) {
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                    to: email,
                    from: process.env.FROM_EMAIL,
                    subject: "Send grid",
                    text: "Investiment",
                    html: "<strong>Total investment "+totalBuy+" </strong><br/><strong>Total buy "+quantity+" </strong>"
                };
                sgMail.send(msg).then(() => {
                res.redirect('/users');
                }).catch((error) => {
                    console.log('error', error);
                });
            } else {
                response.status(400).json({
                    content: '',
                    status: false,
                    message: 'It was not possible to buy.'
                })
            }
        } else {
            response.status(200).json({
                content: '',
                status: false,
                message: 'insufficient funds'
            })
        }
    },
}