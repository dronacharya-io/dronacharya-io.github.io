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
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import ReplyIcon from "@mui/icons-material/Reply";
import Tooltip from "@mui/material/Tooltip";

export function UserQuizCard(props) {
  const { user } = useUserAuth();
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleEdit = async () => {
    navigate("../editQuiz?quizId=" + props.id + "&userId=" + user.userData._id);
  };

  const handleDelete = async () => {
    await axios.delete(
      "http://localhost:8800/api/quizzes/deleteQuiz/" + props.id
    );
    let arr1 = user.userData.quizzesCreated;
    arr1 = arr1.filter((element) => {
      return element.id !== props.id;
    });
    let arr2 = user.userData.quizzesSubmitted;
    arr2 = arr2.filter((element) => {
      return element.id !== props.id;
    });
    await axios.put(
      "http://localhost:8800/api/users/updateUser/" + user.userData._id,
      { quizzesCreated: arr1, quizzesSubmitted: arr2 }
    );
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
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
        <CardContent
          onClick={() => navigate("../quizSubmissions?id=" + props.id)}
          id="cardContent"
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
        <CardActions id="cardActions">
          <Tooltip
            title="Share Link"
            placement="left"
            disableFocusListener
            disableTouchListener
            arrow
          >
            <div className="cardActionsIcon">
              <CopyToClipboard text={currentBaseURL + props.id}>
                <Button
                  id="button"
                  size="small"
                  variant="outlined"
                  onClick={handleClick}
                >
                  <ReplyIcon />
                </Button>
              </CopyToClipboard>
            </div>
          </Tooltip>
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
              Link Copied!
            </Box>
          </Popper>
          <Tooltip
            title="Edit"
            placement="bottom"
            disableFocusListener
            disableTouchListener
            arrow
          >
            <div className="cardActionsIcon">
              <Button
                id="button"
                size="small"
                variant="outlined"
                onClick={handleEdit}
              >
                <CreateIcon />
              </Button>
            </div>
          </Tooltip>
          <Tooltip
            title="Delete"
            placement="right"
            disableFocusListener
            disableTouchListener
            arrow
          >
            <div className="cardActionsIcon">
              <Button
                id="button"
                size="small"
                variant="outlined"
                onClick={handleDelete}
              >
                <DeleteIcon />
              </Button>
            </div>
          </Tooltip>
        </CardActions>
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
