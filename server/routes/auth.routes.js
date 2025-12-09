// server/routes/auth.routes.js
import express from "express";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/api/auth/signin", authCtrl.signin);
router.get("/api/auth/signout", authCtrl.signout);

export default router;
