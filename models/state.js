const mongoose = require('mongoose')
const countySchema = require('./county')

const stateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        stateFips: {
            type: Number,
            required: true
        },
        abbrev: {
            type: String,
            required: true
        },
        counties: [countySchema]
    }
)

module.exports = mongoose.model('State', stateSchema)