import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();

router.use(authCtrl.requireSignin);

router.param("contactId", contactCtrl.contactByID);

router.route("/api/contacts")
  .post(contactCtrl.create)
  .get(contactCtrl.list)
  .delete(contactCtrl.removeAll);


router.route("/api/contacts/:contactId")
  .get(contactCtrl.read)
  .put(contactCtrl.update)
  .delete(contactCtrl.remove);

export default router;
