import React from 'react';
import { Card, CardContent, CardMedia, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <Link 
      component={RouterLink}
      to={`recipe/${recipe.recipeTitle.replaceAll(' ', '_')}`}
      sx={{ textDecoration: 'none' }}
    >
      <Card sx={{ display: 'flex', margin: 2, padding: 2, height: 200, boxSizing: 'border-box', borderRadius: '12px', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          sx={{ width: 151, height: '100%', objectFit: 'cover', borderRadius: '12px' }}
          image={recipe.image_url}
          alt={recipe.recipeTitle}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
          <Typography component="div" variant="h5" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {recipe.recipeTitle}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {recipe.recipeCaption}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default RecipeCard;





