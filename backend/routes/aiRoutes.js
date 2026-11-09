import express from "express";
import { summarizeNote, autoTagNote, saveNoteSummary } from "../controller/aiController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/summarize/:noteId", summarizeNote);
router.post('/auto-tag/:noteId', autoTagNote)
router.put('/save-summary/:noteId',saveNoteSummary)



export default router;