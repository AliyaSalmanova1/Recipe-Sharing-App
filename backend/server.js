const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

const database = require('./database')

app.get('/recipes', (req, res) => {
    console.log('in get request')

})

app.post('/recipes', upload.single('image'), (req, res) => {
    console.log('in post', req.file)

    const { filename, path } = req.file
    const recipeText = req.body.recipeText

    //save data to database

    const image_url = `images/${filename}`


    database.createRecipe(recipeText, image_url, (error, insertId) => {
        if (error) {
            res.send({error: error.message})
            return
        }
        res.send({
            id: insertId,
            recipeText,
            image_url

        })
    })
  

})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
