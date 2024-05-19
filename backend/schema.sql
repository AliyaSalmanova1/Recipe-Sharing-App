create database recipeApp;

use recipeApp

CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(255),
    image_url VARCHAR(255)
    'timestamp' TIMESTAMP DEFAULT NOW()
)
