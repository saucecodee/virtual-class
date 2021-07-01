const router = require("express").Router();
const UserCtrl = require("./../controllers/user.controller");
const auth = require('./../middlewares/auth.middleware');
const upload = require("./../middlewares/multer.middleware")
const { role } = require("./../config")

router.post("/", auth(role.ADMIN), upload("image"), UserCtrl.create);
router.get("/", auth(role.USER), UserCtrl.getAll);
router.get("/:user_id", auth(role.USER), UserCtrl.getOne);
router.put("/:user_id", auth(role.USER), UserCtrl.update);
router.delete("/:user_id", auth(role.USER), UserCtrl.delete);


module.exports = router