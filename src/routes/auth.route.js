const router = require("express").Router();
const AuthCtrl = require("./../controllers/auth.controller");
const upload = require("./../middlewares/multer.middleware")

router.post("/sign-up", upload("image"), AuthCtrl.signup);
router.post("/sign-in", AuthCtrl.signin);

module.exports = router