const express = require('express')
const appointmentController = require('../controllers/appointment')

const router = new express.Router()

router.post('/appointments', appointmentController.postAppointment)

router.get('/appointments', appointmentController.getAppointments)


module.exports = router