const fs = require('fs')
const Provider = require('../models/provider')
const Appointment = require('../models/appointment')
const AppointmentRequest = require('../models/appointmentRequest')

const loadProviders = () => {
    try {
        const dataBuffer = fs.readFileSync('..\\..\\..\\vim\\code-interview\\providers\\providers.json')
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


const specialtyIncluded = (specialties, wantedSpecialty) => {
    
    const isIncluded = specialties.find((specialty) => {
        return wantedSpecialty.toLowerCase() == specialty.toLowerCase()
    })
    return isIncluded
}

const compareByScore = (a, b) => {
    if (a.score > b.score){
        return -1
    }
    return 1
}


exports.getAppointments = async (req, res) => { 
    try {
        //const appointmentRequest = new AppointmentRequest(req.params)
        //console.log(req.query)
        const minScore = req.query.minScore
        const specialty = req.query.specialty
        const requestedDate = req.query.date
        if (!specialty){
            return res.status(400).send()
        }
        var regExp = /[a-zA-Z]/g;
                    
        if(regExp.test(requestedDate)){
            return res.status(400).send()
        }
        if (!specialty){
            return res.status(400).send()
        }

        
        //console.log(minScore,specialty,requestedDate)
        const providers = loadProviders()
        let relevantProviders = providers.filter((provider) => {
            //console.log(provider)
            return provider.score >= minScore &&
                    specialtyIncluded(provider.specialties,specialty) &&
                    isProviderAvailable(provider.availableDates,requestedDate)            
        })
        relevantProviders.sort(compareByScore)
        res.send(relevantProviders.map((provider) => provider.name))
    } catch (e) {
        console.log("failed sending providers")
        res.status(500).send()
    }
}



exports.postAppointment = async (req, res) => {
    try {
        console.log(req.body)
        const name = req.body.name
        const date = req.body.date
        const providers = loadProviders()
        const chosenProvider = providers.find((provider) => {
            return name === provider.name
        })

        if (!chosenProvider){
            console.log('Provider was not found')
            return res.status(400).send();
        }
        if (!isProviderAvailable(chosenProvider.availableDates,date)){
            console.log('Provider is not available')
            return res.status(400).send();
        }
        return res.status(200).send()

    } catch (e) {
        
    }
}

