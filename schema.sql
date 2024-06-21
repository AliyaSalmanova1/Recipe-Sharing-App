create database recipeApp;

use recipeApp;


CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    image_url VARCHAR(255),
    recipeTitle VARCHAR(255),
    recipeCaption VARCHAR(255),
    prepTime VARCHAR(255),
    ingredients VARCHAR(255),
    instructions VARCHAR(255),
    `timestamp` TIMESTAMP DEFAULT NOW()
);
