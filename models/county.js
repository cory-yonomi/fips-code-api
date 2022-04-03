const mongoose = require('mongoose')


const countySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        fips: {
            type: String,
            required: true
        },
        stateFips: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        abbrev: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('County', countySchema)