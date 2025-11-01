import express from "express";
import {
  getAllTeams,
  getTeamByType,
  createMember
} from "../controllers/teamController.js";


const router = express.Router();

router.get("/", getAllTeams);
router.get("/:type", getTeamByType);


router.post("/",  createMember);

export default router;
