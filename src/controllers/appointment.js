const fs = require('fs')
const Provider = require('../models/provider')
const Appointment = require('../models/appointment')
const AppointmentRequest = require('../models/appointmentRequest')

const loadProviders = () => {
    try {
        const dataBuffer = fs.readFileSync('C:\\workspace\\vim\\code-interview\\providers\\providers.json')
        //C:\workspace\vim\code-interview\providers\providers.json
      //  vim\code-interview\providers\providers.json
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
        //const appointmentRequest = new AppointmentRequest(req.params)
        console.log(req.query)
        const minScore = req.query.minScore
        const specialty = req.query.specialty
        const requestedDate = req.query.date
        console.log(minScore,specialty,requestedDate)
        const providers = loadProviders()
        const relevantProviders = providers.filter((provider) => {
            console.log(provider)
            return provider.score >= minScore &&
                    provider.specialties.includes(specialty) &&
                    isProviderAvailable(provider.availableDates,requestedDate)            
        })
        res.send(relevantProviders)
    } catch (e) {
        console.log("failed sending providers")
        res.status(500).send()
    }
}



exports.postAppointment = async (req, res) => { }

