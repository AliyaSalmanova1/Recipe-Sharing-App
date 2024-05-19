var mysql  = require('mysql2');

var connection = mysql.createConnection({
    host     :  'localhost',
    user     :  'AliyaSalmanova1',
    password :  'Yalannan01?',
    database :  'recipeApp'
  })
 
connection.connect();

function createRecipe(recipeText, image_url, callback) {

    const query = `
    INSERT INTO recipes (recipeText, image_url)
    VALUES (?, ?)
    `

    const params = [recipeText, image_url]

    connection.query(query, params, (error, results, fields) => {
        if (error) {
            callback(error)
            return
        }
        callback(null, results.inserId)
        console.log('The solution is: ', results[0].solution);
    });

}


exports.createRecipe = createRecipe

function getRecipes() {

}
 

 
connection.end();