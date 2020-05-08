const { Schema, model } = require('mongoose');

const BankSchema = new Schema({
    idUser: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

module.exports = model('Bank',  BankSchema);