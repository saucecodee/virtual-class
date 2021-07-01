const router = require("express").Router();
const LectureCtrl = require("./../controllers/lecture.controller");


router.post("/", LectureCtrl.create);
router.get("/", LectureCtrl.getAll);
router.get("/:lecture_id" ,LectureCtrl.getOne);
router.put("/:lecture_id" ,LectureCtrl.update);
router.delete("/:lecture_id" ,LectureCtrl.delete);


module.exports = router