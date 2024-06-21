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

app.get('/recipe/:recipeTitle', (req, res) => {

    const recipeTitle = req.params.recipeTitle.replaceAll('_', ' ');
    console.log('in get req,', req.params)
    database.getRecipeInfo((error, recipeInfo) => {
        if (error) {
            res.send({error: error.message})
            return
        }
        res.send({recipeInfo})
    }, recipeTitle)

})



app.post('/recipes', upload.single('image'), async (req, res) => {
    console.log('in post', req.file)


    const { filename, path } = req.file
    const recipeTitle = req.body.recipeTitle
    const recipeCaption = req.body.recipeCaption
    const prepTime = req.body.prepTime
    const ingredients = req.body.ingredients
    const instructions = req.body.instructions


    await s3.uploadFile(req.file)

    //save data to database

    const image_url = `/images/${filename}`


    database.createRecipe(image_url,
        recipeTitle,
        recipeCaption,
        prepTime,
        ingredients,
        instructions, (error, insertId) => {
        if (error) {
            console.log('in error')
            res.send({error: error.message})
            return
        }
        res.send({
            id: insertId,
            image_url,
            recipeTitle,
            recipeCaption,
            prepTime,
            ingredients,
            instructions


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
