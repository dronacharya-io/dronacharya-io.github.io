import React from "react";
import Cards from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./Cards.css";

export default function Card(props){

    return(
        <>
            <Cards sx={{ maxWidth: 345 }} id="card" >
                <CardMedia 
                    components="img"
                    alt="quizImg"
                    height="2400"
                    image={props.img}
                />
                <CardContent>
                <Typography style={{color:"white"}} gutterBottom variant="h5" component="div">
                    {props.topic}
                </Typography>
                <Typography style={{color:"white"}} variant="body2" color="text.secondary">
                    {props.startDate}
                </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" style={{color:"white" , borderColor:"white"}} size="small">Share</Button>
                    <Button variant="outlined" style={{color:"white" , borderColor:"white"}} size="small">Learn</Button>
                </CardActions>
            </Cards>
        </>
    );
}