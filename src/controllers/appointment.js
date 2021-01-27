const fs = require('fs')
const Provider = require('../models/provider')
const Appointment = require('../models/appointment')
const AppointmentRequest = require('../models/appointmentRequest')

const loadProviders = () => {
    try {
        const dataBuffer = fs.readFileSync('../../providers/providers.json')
        console.log('opened providers  0')
        const dataJSON = dataBuffer.toString()
        console.log('opened providers')
        return JSON.parse(dataJSON)
        
    } catch (e) {
        console.log('failes providers')
        return []
    }
}

const isProviderAvailable = (dates, reqDate) => {
    
    const isAvailable = dates.find((date) => {
        return reqDate >= date["from"] && reqDate <= date["to"]
    })
    return isAvailable
}

exports.getAppointments = async (req, res) => { 
    try {
        const appointmentRequest = new AppointmentRequest(req.body)
        const providers = loadProviders()
        console.log(appointmentRequest)
        const relevantProviders = providers.filter((provider) => {
            console.log(provider)
            return provider.score >= appointmentRequest.minScore &&
                    provider.specialties.includes(appointmentRequest.specialty) &&
                    isProviderAvailable(provider.availableDates,appointmentRequest.date)            
        })
        res.send(relevantProviders)
    } catch (e) {
        console.log("failed sending providers")
        res.status(500).send()
    }
}



exports.postAppointment = async (req, res) => { }

