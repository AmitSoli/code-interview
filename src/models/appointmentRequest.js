const mongoose = require('mongoose')

const AppointmentRequest = mongoose.model('AppointmentRequest', {
    minScore: {
        type: Number
    },
    date: {
        type: Date,
    },
    specialty: {
        type: String
    },
})

module.exports = AppointmentRequest