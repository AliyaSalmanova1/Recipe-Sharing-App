import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, Paper } from '@mui/material';
import './App.css';

function Recipe() {
  const [recipeInfo, setRecipeInfo] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    (async () => {
      const result = await axios.get(`/recipe/${slug}`);
      console.log('result', result);
      setRecipeInfo(result.data.recipeInfo[0]);
    })();
  }, [slug]);

  console.log('recipeInfo', recipeInfo);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem', borderRadius: '15px' }}>
        {recipeInfo.image_url && (
          <Box textAlign="center">
            <img
              src={recipeInfo.image_url}
              alt={recipeInfo.recipeTitle}
              style={{ width: '100%', borderRadius: '15px' }}
            />
          </Box>
        )}
        <Typography variant="h4" gutterBottom style={{ marginTop: '1rem' }}>
          {recipeInfo.recipeTitle}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {recipeInfo.recipeCaption}
        </Typography>
        <Box
          style={{
            backgroundColor: '#E6E6FA', // light violet color
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        >
          <Typography variant="h6" style={{ color: 'darkviolet' }}>
            Preparation time
          </Typography>
          <Typography variant="body1">- {recipeInfo.prepTime}</Typography>
        </Box>
     
        <Typography variant="h6" style={{ color: 'burgundy' }}>
          Ingredients
        </Typography>
        <Typography variant="body1">- {recipeInfo.ingredients}</Typography>
        <hr />
        <Typography variant="h6" style={{ color: 'burgundy' }}>
          Instructions
        </Typography>
        <Typography variant="body1">{recipeInfo.instructions}</Typography>
      </Paper>
    </Container>
  );
}

export default Recipe;

