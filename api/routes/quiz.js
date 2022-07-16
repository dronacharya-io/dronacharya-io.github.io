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
router.put("/updateQuiz/:id", verifyUser, updateQuiz);
//DELETE
router.delete("/deleteQuiz/:id", verifyUser, deleteQuiz);
//GET
router.get("/attemptQuiz/:id", getQuiz);
//GETALL
router.get("/getquizzes", verifyUser, getQuizzes);
//CREATE
router.post("/", createQuiz);
//COUNT
// router.get("/countBySubject", countBySubject);
// router.get("/countByType", countByType);

export default router;
