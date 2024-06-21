import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function RecipeCard({recipe}) {

  console.log('recipe', recipe)
  return (
    <Link 
    component={RouterLink}
    to={`recipe/${recipe.recipeTitle.replaceAll(' ', '_')}`}
    sx={{ textDecoration: 'none' }}>
        <Card sx={{ display: 'flex', margin: 2 }}>
        <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={recipe.image_url}
            alt={recipe.recipeTitle}
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
            {recipe.recipeTitle}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
            {recipe.recipeCaption}
            </Typography>
        </CardContent>
        </Card>
    </Link>
  );
}

export default RecipeCard;
