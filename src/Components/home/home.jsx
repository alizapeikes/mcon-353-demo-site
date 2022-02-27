import './home.css';
import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';

export const Home =() => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <div className="App">
          
          <Card sx={{ maxWidth: 500, mx: "auto", mt: "4em", mb:"4em"}} >
              <CardMedia
                component="img"
                height="300"
                image="coding.jpg"
                alt="coding"
              />
              <CardContent>
                  <Typography gutterBottom variant="h2" component="div">
                      Welcome!
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                      Welcome to my personal home page. My name is Aliza Peikes, and I am 
                      currently pursuing a BS in Computer science at Touro LAS. I currently 
                      work in the R&D department of S&F Supplies, a sign supply company. I
                      organize and analyze purchasing and marketing data using Microsoft Excel.
                  </Typography>
              </CardContent>
              <CardActions >
                  <Link target="_blank" color="purple" href="https://www.linkedin.com/in/alizapeikes/" underline="hover">LinkedIn</Link>
                  <Link target="_blank" color="purple" href="https://github.com/alizapeikes" underline="hover">GitHub</Link>
              </CardActions>
          </Card>   
          <Stack 
            direction="row"
            justifyContent="center"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={3}
            sx={{ mb:"1em"}} >
              
                <Item>JAVA</Item>
                <Item>C#</Item>
                <Item>PYTHON</Item>
                <Item>SQL</Item>
                <Item>JAVASCRIPT</Item>
                <Item>REACT</Item>
                <Item>NODE</Item>
                <Item>PHP</Item>
                <Item>HTML</Item>
                <Item>CSS</Item>
          </Stack>   
    </div>
  );
}
