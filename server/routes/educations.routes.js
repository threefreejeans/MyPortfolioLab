import express from "express";
import educationCtrl from "../controllers/education.controller.js";

const router = express.Router();

router.param("educationId", educationCtrl.educationByID);

router.route("/api/qualifications")
  .post(educationCtrl.create)
  .get(educationCtrl.list)
  .delete(educationCtrl.removeAll);

router.route("/api/qualifications/:educationId")
  .get(educationCtrl.read)
  .put(educationCtrl.update)
  .patch(educationCtrl.update)
  .delete(educationCtrl.remove);

export default router;
