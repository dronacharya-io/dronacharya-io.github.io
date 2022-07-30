import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function UserQuizCard(props){
    const [zero, setZero] = useState("0");
    const [currentDate, setCurrentDate] = useState(new Date().getFullYear() + "-" +zero+ (new Date().getMonth()+1)+"-"+ new Date().getDate() );
    const [currentTime, setCurrentTime] = useState(new Date().getHours()+":"+new Date().getMinutes())
    const tempImage = "https://picsum.photos/seed/picsum/240/240"; 

    useEffect(()=>{ 
        setInterval(()=>{
            if((new Date().getMonth()+1) > 9){
                setZero("")
            }
            setCurrentDate(new Date().getFullYear() + "-" +zero+ (new Date().getMonth()+1)+"-"+ new Date().getDate())
            setCurrentTime(new Date().getHours()+":"+new Date().getMinutes()) 
        },1000)
    },[])

    return(
       <>
            <Card sx={{ maxWidth: 345 }} className="card" >
                <CardMedia 
                    components="img"
                    alt="quizImg"
                    height="2400"
                    image={tempImage}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.quizName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.startDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.runTime}
                </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default UserQuizCard;