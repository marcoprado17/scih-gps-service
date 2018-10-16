const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const GpsDataScheme = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
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

GpsDataScheme.plugin(timestamps)

module.exports = exports = mongoose.model('GpsData', GpsDataScheme)
