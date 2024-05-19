const mysql = require('mysql2');

const pool = mysql.createPool({
    host     : process.env.MYSQL_HOST || 'localhost',
    user     : process.env.MYSQL_USER || 'AliyaSalmanova1',
    password : process.env.MYSQL_PASSWORD || 'Yalannan01?',
    database : process.env.MYSQL_DATABASE || 'recipeApp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

async function createRecipe(recipeText, image_url, callback) {
    try {
        const [results, fields] = await promisePool.query(
            'INSERT INTO recipes (recipeText, image_url) VALUES (?, ?)',
            [recipeText, image_url]
        );
        callback(null, results.insertId);
    } catch (error) {
        callback(error);
    }
}

exports.createRecipe = createRecipe;

// Add other functions as needed, using promisePool for queries


function getRecipes() {

}
 

 
