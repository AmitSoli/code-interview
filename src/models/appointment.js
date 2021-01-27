const mongoose = require('mongoose')
const validator = require('validator')

const Appointment = mongoose.model('Appointment', {
    name: {
        type: String,
    },
    date: {
        type: Date,
    }
})

module.exports = Appointment