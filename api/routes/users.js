import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/updateUser/:id", updateUser);
//DELETE
router.delete("/deleteUser/:id", deleteUser);
//GET
router.get("/getUser/:id", getUser);
//GETALL
router.get("/getAllUsers", getUsers);

export default router;
