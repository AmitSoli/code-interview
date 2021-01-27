const mongoose = require('mongoose')
const validator = require('validator')

const Provider = mongoose.model('Provider', {
    name: {
        type: String,
        required: true,
    },
    specialties: [{
        type: String
    }],
    availableDates:[{
        fro
    }]
})

module.exports = Provider