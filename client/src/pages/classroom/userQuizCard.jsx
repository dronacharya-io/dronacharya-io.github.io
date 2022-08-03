import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Skeleton from "@mui/material/Skeleton";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function UserQuizCard(props) {
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

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

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
      <Card sx={{ maxWidth: 345 }} className="card">
        {props.startDate >= currentDate ? (
          <div>
            <Button color="success" style={{ letterSpacing: "5px" }}>
              Live
            </Button>
            <Badge badgeContent=" " color="success" variant="dot"></Badge>
          </div>
        ) : (
          <Button style={{ letterSpacing: "2px" }} disabled>
            Quiz Ended
          </Button>
        )}
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
          <CopyToClipboard text={props.id}>
            <Button size="small" onClick={handleClick}>
              Share
            </Button>
          </CopyToClipboard>
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
              Code Copied!
            </Box>
          </Popper>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </>
  );
}

export const CardSkeleton = () => {
  return (
    <Card className="card">
      <Button style={{ letterSpacing: "2px" }} disabled>
        <Skeleton variant="circular" width={40} height={40} />
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
