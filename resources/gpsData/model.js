const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const GpsDataSchema = new mongoose.Schema({
    data: {
        // Latitude e longitude encriptada
        encryptedGpsData: { 
            type: String,
            required: true,
        },
        // Unix timestamp de quando essa amostra
        // de sinal GPS foi obtida
        creationUnixTimestamp: {   
            type: Number,
            required: true,
        }
    },
    // Endereço de quem enviou tal dado
    from: {
        type: String,
        require: true
    },
    // Reconver id
    v: {
        type: Number,
        required: true
    },
    // Parâmetro r da assinatura ECDSA
    r: {
        type: Buffer,
        required: true
    },
    // Parâmetro s da assinatura ECDSA
    s: {
        type: Buffer,
        required: true
    },
    // Endereço ethreum da conta que envou tal sinal
    accountId: {
        type: String,
        required: true,
    },
    // Endereço Ethereum do contrato
    contractId: {
        type: String,
        required: true,
    },
}, { collection: 'gpsData' })

GpsDataSchema.plugin(timestamps)

module.exports = exports = mongoose.model('GpsData', GpsDataSchema)
