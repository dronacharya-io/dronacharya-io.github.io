import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


function UserQuizCard(props){
    const [zero, setZero] = useState("0");
    const [currentDate, setCurrentDate] = useState(new Date().getFullYear() + "-" +zero+ (new Date().getMonth()+1)+"-"+ new Date().getDate() );
    const [currentTime, setCurrentTime] = useState(new Date().getHours()+":"+new Date().getMinutes())
    const tempImage = "https://picsum.photos/seed/picsum/240/240"; 
    const [runTime, setRunTime] = useState(0);
   
   

    useEffect(()=>{ 
        setInterval(()=>{
            if((new Date().getMonth()+1) > 9){
                setZero("")
            }
            setCurrentDate(new Date().getFullYear() + "-" +zero+ (new Date().getMonth()+1)+"-"+ new Date().getDate())
            setCurrentTime(new Date().getHours()+":"+new Date().getMinutes()) 
        },1000)

        setInterval(()=>{
            
        },3600000)

        setInterval(()=>{
            
        },60000)
    },[])
    
    console.log(runTime)

    return(
       <>
            <Card sx={{ maxWidth: 345 }} className="card" >
                { !props.loading ? props.startDate >= currentDate  ? ( <div> <Button  color="success" style={{ letterSpacing : "5px" }}>
                    Live 
                </Button> <Badge badgeContent=" " color="success" variant="dot"></Badge> </div>) : (<Button style={{ letterSpacing : "2px" }} disabled>
                    Quiz Ended
                </Button>) : (<Skeleton variant="circular" width={40} height={40} />)}
                { !props.loading  ? <CardMedia 
                    components="img"
                    alt="quizImg"
                    height="2400"
                    image={tempImage}
                /> :  <Skeleton
                        animation="wave"
                        height="100%"
                        width="100%"
                        style={{ marginBottom: 6 }}
                    /> }
                <CardContent>
                {!props.loading && props.quizName ? 
                    <Typography gutterBottom variant="h5" component="div">
                        {props.quizName} 
                    </Typography>
                        : 
                        <Skeleton variant="text" />
                }
                    {!props.loading && props.startDate ? <Typography variant="body2" color="text.secondary">
                        {props.startDate}
                    </Typography> : <Skeleton height={20} width="50%"  />}

                    {!props.loading && props.runTime ? <Typography variant="body2" color="text.secondary">
                        {props.runTime}
                    </Typography> : <Skeleton height={20} width="50%"  />}
                </CardContent>
                <CardActions>
                    { !props.loading ?<Button size="small">Share</Button> : <Skeleton height={40} width="50%"  /> }
                    { !props.loading ?  <Button size="small">Edit</Button> : <Skeleton height={40} width="50%"  />}
                </CardActions>
            </Card>  
        </>
    )
}

export default UserQuizCard;



<Box sx={{ pt: 0.5 }}>
<Stack spacing={1}>
    <Skeleton variant="text" />
    <Skeleton variant="circular" width={40} height={40} />
    <Skeleton variant="rectangular" width={200} height={200} />
</Stack>
</Box>
