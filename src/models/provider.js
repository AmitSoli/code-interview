const mongoose = require('mongoose')
const validator = require('validator')

const Provider = mongoose.model('Provider', {
    name: {
        type: String,
    },
    specialties: [{
        type: String
    }],
    availableDates:[{
        from: Date,
        to: Date
    }]
})

module.exports = Provider