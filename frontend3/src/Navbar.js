
import { useState, useEffect } from 'react'
import './App.css';



import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from "react-router-dom";


function Navbar() {



  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#fff9e6',  // Light cream color
    color: '#000',  // Ensuring the text color is readable
  }));
  
  return (
  
    <StyledAppBar position="static">
    <Toolbar variant="dense">
        <Typography sx={{ flexGrow: 1 }} variant="h6" color="inherit" component="div">
        Recipes
        </Typography>
        <Button color="inherit" href="#add-recipe"><Link to="/">Home</Link></Button>
        <Button color="inherit" href="#add-recipe"><Link to="/addrecipe">Add Recipe</Link></Button>
    </Toolbar>
    
    </StyledAppBar>
      
      
      
 
  );
}

export default Navbar;