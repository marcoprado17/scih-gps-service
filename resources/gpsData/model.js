const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const GpsDataSchema = new mongoose.Schema({
    data: {
        encryptedGpsData: {
            type: String,
            required: true,
        },
        creationUnixTimestamp: {
            type: Number,
            required: true,
        }
    },
    from: {
        type: String,
        require: true
    },
    v: {
        type: Number,
        required: true
    },
    r: {
        type: Buffer,
        required: true
    },
    s: {
        type: Buffer,
        required: true
    },
    accountId: {
        type: String,
        required: true,
    },
    contractId: {
        type: String,
        required: true,
    },
}, { collection: 'gpsData' })

GpsDataSchema.plugin(timestamps)

module.exports = exports = mongoose.model('GpsData', GpsDataSchema)
