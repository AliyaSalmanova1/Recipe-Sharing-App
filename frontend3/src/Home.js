
import { useState, useEffect } from 'react'
import './App.css';

import axios from 'axios'

import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard.js";

function Home() {

  const [file, setFile] = useState()
  const [recipeText, setRecipeText] = useState("")
  const [recipePosts, setRecipePosts] = useState([])

  useEffect(() => {
    (async() => {
      const result = await axios.get('/recipes')
      console.log('result', result)
      setRecipePosts(result.data.recipes)
    })()
  }, [])
  
  
 

  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#fff9e6',  // Light cream color
    color: '#000',  // Ensuring the text color is readable
  }));
  
  return (

      
      
    <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      {
        recipePosts.map((recipe) => {
          return (
            <RecipeCard recipe={recipe} />
          )
        })
      }
      

      </Container>
      

  );
}

export default Home;