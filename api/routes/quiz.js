import express from "express";
import {
  updateQuiz,
  deleteQuiz,
  getQuiz,
  getQuizes,
  createQuiz,
  countBySubject,
  countByType,
} from "../controllers/quiz.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateQuiz);
//DELETE
router.delete("/:id", verifyUser, deleteQuiz);
//GET
router.get("/:id", verifyUser, getQuiz);
//GETALL
router.get("/", verifyUser, getQuizes);
//CREATE
router.post("/", verifyUser, createQuiz);
//COUNT
router.get("/countBySubject", countBySubject);
router.get("/countByType", countByType);

export default router;
