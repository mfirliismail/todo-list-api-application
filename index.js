const express = require('express')
const app = express()
const port = 6000
const router = require('./routes')

app.use(express.json())

app.use('/api/v1', router)


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})