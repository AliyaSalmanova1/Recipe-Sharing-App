const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const fs = require('fs')
const path = require('path')

const app = express()

const database = require('./database')

const s3 = require('./s3')

app.use(express.static('build'))

app.get('/images/:filename', async (req, res) => {
    console.log('inside get images');
    const filename = req.params.filename;
  
    try {
        console.log('inside try block')
      const readStream = await s3.getFileStream(filename);
  
    
      readStream.pipe(res);
    } catch (err) {
      res.status(500).send('Error retrieving file');
    }
  });

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



app.post('/recipes', upload.single('image'), async (req, res) => {
    console.log('in post', req.file)

    const { filename, path } = req.file
    const recipeText = req.body.recipeText

    await s3.uploadFile(req.file)

    //save data to database

    const image_url = `/images/${filename}`


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
//for react router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'))
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
