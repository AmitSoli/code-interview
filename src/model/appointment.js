const mongoose = require('mongoose')
const validator = require('validator')

const Appointment = mongoose.model('Appointment', {
    name: {
        type: String,
        required: true,
    },
    date: {
        type: date,
        required: true
    }
})

module.exports = Appointment