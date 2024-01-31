import express from "express";
import {
  createAssessment,
  deleteAssessment,
  getAssessment,
  getAssessments,
  updateAssessment,
} from "../controllers/assessmentController.js";

const router = express.Router();

router.post("/", createAssessment);
router.get("/", getAssessments);
router.get("/:id", getAssessment);
router.patch("/:id", updateAssessment);
router.delete("/:id", deleteAssessment);
 
export default router;
