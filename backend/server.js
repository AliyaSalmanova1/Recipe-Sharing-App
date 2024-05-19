const express = require('express')

const app = express()

app.get('/recipes', (req, res) => {

})

app.post('/recipes', (req, res) => {

})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})