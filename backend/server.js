const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.get('/recipes', (req, res) => {
    console.log('in get request')

})

app.post('/recipes', upload.single('image'), (req, res) => {
    console.log('in post', req.file)

    const { filename, path } = req.file
    const text = req.body.text

    //save data to database
    res.send('sending')

})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
