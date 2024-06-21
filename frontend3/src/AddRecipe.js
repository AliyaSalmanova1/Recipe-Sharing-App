import { useState } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  height: '56px'
}));

function AddRecipe() {
  const [file, setFile] = useState(null);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeCaption, setRecipeCaption] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const submit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('image', file);
    data.append('recipeTitle', recipeTitle);
    data.append('recipeCaption', recipeCaption);
    data.append('prepTime', prepTime);
    data.append('ingredients', ingredients);
    data.append('instructions', instructions);

    console.log('data', data);

    const result = await axios.post('/recipes', data);
    console.log('result', result);

    data.delete('image');
    data.delete('recipeTitle');
    data.delete('recipeCaption');
    data.delete('prepTime');
    data.delete('ingredients');
    data.delete('instructions');

    setFile(null);
    setRecipeTitle("");
    setRecipeCaption("");
    setPrepTime("");
    setIngredients("");
    setInstructions("");
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem', borderRadius: '15px' }}>
      <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', mt: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Add a New Recipe
        </Typography>
        <TextField
          type="file"
          onChange={e => setFile(e.target.files[0])}
          InputLabelProps={{ shrink: true }}
          inputProps={{ accept: "image/*" }}
          label="Photo of Delicious Dish"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          onChange={e => setRecipeTitle(e.target.value)}
          label="Recipe Title"
          variant="outlined"
          value={recipeTitle}
          sx={{ mb: 2 }}
        />
        <TextField
          onChange={e => setRecipeCaption(e.target.value)}
          label="Caption"
          variant="outlined"
          value={recipeCaption}
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />
        <TextField
          onChange={e => setPrepTime(e.target.value)}
          label="Preparation Time"
          variant="outlined"
          value={prepTime}
          sx={{ mb: 2 }}
       
        />
        <TextField
          onChange={e => setIngredients(e.target.value)}
          label="Ingredients"
          variant="outlined"
          value={ingredients}
          multiline
          sx={{ mb: 2 }}
          rows={4}
        />
        <TextField
          onChange={e => setInstructions(e.target.value)}
          label="Instructions"
          variant="outlined"
          value={instructions}
          multiline
          sx={{ mb: 2 }}
          rows={4}
        />
        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </SubmitButton>
      </Box>
      </Paper>
    </Container>
  );
}

export default AddRecipe;

