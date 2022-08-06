import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

export function UserSubmissionCard(props) {
  const navigate = useNavigate();
  const [zero, setZero] = useState("0");
  const [currentDate, setCurrentDate] = useState(
    new Date().getFullYear() +
      "-" +
      zero +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
  );
  const [currentTime, setCurrentTime] = useState(
    new Date().getHours() + ":" + new Date().getMinutes()
  );
  const tempImage = "https://picsum.photos/seed/picsum/240/240";

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const currentBaseURL =
    window.location.href.split("classroom")[0] + "joinQuiz/?id=";

  useEffect(() => {
    setInterval(() => {
      if (new Date().getMonth() + 1 > 9) {
        setZero("");
      }
      setCurrentDate(
        new Date().getFullYear() +
          "-" +
          zero +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate()
      );
      setCurrentTime(new Date().getHours() + ":" + new Date().getMinutes());
    }, 1000);

    setInterval(() => {}, 3600000);

    setInterval(() => {}, 60000);
  }, []);

  return (
    <>
      <Card sx={{ maxWidth: 345 }} id="card">
        {props.startDate >= currentDate ? (
          <div>
            <Button
              color="success"
              style={{ letterSpacing: "5px" }}
              className="quizStatusLive"
            >
              Live
            </Button>
            <Badge
              badgeContent=" "
              color="success"
              variant="dot"
              className="quizStatusLive"
            ></Badge>
          </div>
        ) : (
          <Button
            style={{ letterSpacing: "2px" }}
            disabled
            className="quizStatusEnded"
          >
            Quiz Ended
          </Button>
        )}
        <CardMedia
          components="img"
          alt="quizImg"
          height="2400"
          image={tempImage}
        />
        <CardContent
          onClick={() => navigate("../quizSubmissions?id=" + props.id)}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="quizData"
          >
            {props.quizName}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            className="quizData"
          >
            {props.startDate}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            className="quizData"
          >
            {props.attendance || props.runTime}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export const CardSkeleton = () => {
  return (
    <Card id="card">
      <Button disabled>
        <Skeleton width={200} height={40} />
      </Button>
      <Skeleton height={100} width="100%" />
      <CardContent>
        <Skeleton height={40} width="70%" />
        <Skeleton variant="text" width="30%" />
      </CardContent>
      <CardActions>
        <Button size="small">
          <Skeleton height={40} width="50%" />
        </Button>
        <Button size="small">
          <Skeleton height={40} width="50%" />
        </Button>
      </CardActions>
    </Card>
  );
};

//css of this card is in aboutUs.css in aboutUs folder
