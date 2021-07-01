const router = require("express").Router();
const ClassCtrl = require("./../controllers/class.controller");


router.post("/", ClassCtrl.create);
router.get("/", ClassCtrl.getAll);
router.get("/:class_id", ClassCtrl.getOne);
router.put("/:class_id", ClassCtrl.update);
router.delete("/:class_id", ClassCtrl.delete);

router.use("/:class_id/lectures", require("./lecture.route"));




module.exports = router