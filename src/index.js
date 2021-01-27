const express = require('express')

const appointmentRouter = require('./routers/appointment')

const app = express()
const port = process.env.PORT || 3500

app.use(express.json())
app.use(appointmentRouter)

app.listen(port, () => {
    console.log('Server is up on port ', port)
})