import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.param("userId", userCtrl.userByID);

router.route("/api/users")
  .post(userCtrl.create)
  .get(userCtrl.list)
  .delete(async (req, res) => { // delete all users (admin only recommended)
    try {
      await userCtrl; // no-op to keep style; replace with direct model call if desired
      // If you want the controller to handle deleteAll, implement it in user.controller.js
      return res.status(501).json({ error: "Delete all users not implemented in controller" });
    } catch (err) {
      return res.status(400).json({ error: "Unable to delete users" });
    }
  });

router.route("/api/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .patch(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

export default router;
