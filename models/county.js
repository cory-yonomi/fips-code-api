const mongoose = require('mongoose')

const countySchema = new mongoose.Schema(
    {
        county: {
            type: String,
            required: true
        },
        fips: {
            type: Number,
            required: true
        }
    }
)

module.exports = countySchema