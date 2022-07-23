import express from "express";
import {
  updateQuiz,
  deleteQuiz,
  getQuiz,
  getQuizzes,
  createQuiz,
} from "../controllers/quiz.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/updateQuiz/:id", updateQuiz);
//DELETE
router.delete("/deleteQuiz/:id", deleteQuiz);
//GET
router.get("/attemptQuiz/:id", getQuiz);
//GETALL
router.get("/getquizzes", getQuizzes);
//CREATE
router.post("/", createQuiz);
//COUNT
// router.get("/countBySubject", countBySubject);
// router.get("/countByType", countByType);

export default router;
