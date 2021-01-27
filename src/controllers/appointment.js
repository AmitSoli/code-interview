const fs = require('fs')

const loadProviders = () => {
    try {
        const dataBuffer = fs.readFileSync('../../providers/providers.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}


exports.getAppointments = async (req, res) => { 
    try {
        const providers = loadProviders()
        const relevantProviders = providers.filter((provider) => {
            
        })
    } catch (e) {
        
    }
}



exports.postAppointment = async (req, res) => { }

