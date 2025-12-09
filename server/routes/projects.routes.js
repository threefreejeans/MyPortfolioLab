import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js"; // default import

const router = express.Router();

// Protect all /api/projects routes
router.use("/api/projects", authCtrl.requireSignin);

router.route("/api/projects")
  .post(projectCtrl.create)
  .get(projectCtrl.list)
  .delete(projectCtrl.removeAll);

router.route("/api/projects/:projectId")
  .get(projectCtrl.read)
  .put(projectCtrl.update)
  .patch(projectCtrl.update)
  .delete(projectCtrl.remove);

router.param("projectId", projectCtrl.projectByID);

export default router;
