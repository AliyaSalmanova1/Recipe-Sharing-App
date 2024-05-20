const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const fs = require('fs')
const path = require('path')

const app = express()

const database = require('./database')

app.get('/images/:filename', (req, res) => {
    console.log('inside get images')
    const filename = req.params.filename

    const readStream = fs.createReadStream(path.join(__dirname, 'uploads', filename))
    readStream.pipe(res)
})

app.get('/recipes', (req, res) => {
    console.log('in get request')

    database.getRecipes((error, recipes) => {
        if (error) {
            res.send({error: error.message})
            return
        }
        res.send({recipes})
    })

})



app.post('/recipes', upload.single('image'), (req, res) => {
    console.log('in post', req.file)

    const { filename, path } = req.file
    const recipeText = req.body.recipeText

    //save data to database

    const image_url = `http://localhost:8080/images/${filename}`


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
