const mysql = require('mysql2');

const pool = mysql.createPool({
    host     : process.env.MYSQL_HOST || '127.0.0.1',
    user     : process.env.MYSQL_USER || 'AliyaSalmanova1',
    password : process.env.MYSQL_PASSWORD || 'Yalannan01?',
    database : process.env.MYSQL_DATABASE || 'recipeApp',
    waitForConnections: true,
 
    queueLimit: 0,
    port: 3306
});

const promisePool = pool.promise();

async function createRecipe(image_url, recipeTitle,
    recipeCaption,
    prepTime,
    ingredients,
    instructions, callback) {
    try {
        const [results, fields] = await promisePool.query(
            'INSERT INTO recipes (image_url, recipeTitle, recipeCaption, prepTime, ingredients, instructions) VALUES (?, ?, ?, ?, ?, ?)',
            [image_url, recipeTitle, recipeCaption, prepTime, ingredients, instructions]
        );
        callback(null, results.insertId);
    } catch (error) {
        console.log('in catch')
        callback(error);
    }
}

exports.createRecipe = createRecipe;

// Add other functions as needed, using promisePool for queries


async function getRecipes(callback) {
    try {
        const [results, fields] = await promisePool.query(
            'SELECT * FROM recipes'
        );
        callback(null, results);
    } catch (error) {
        callback(error);
    }
}

exports.getRecipes = getRecipes;

async function getRecipeInfo(callback, recipeTitleVar) {
    try {
        
        const [results, fields] = await promisePool.query(
            'SELECT * FROM recipes WHERE recipeTitle = ?', [recipeTitleVar]

        );
        callback(null, results);
    } catch (error) {
        callback(error);
    }
}

exports.getRecipeInfo = getRecipeInfo;
 

 
