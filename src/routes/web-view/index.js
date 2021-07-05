const router = require("express").Router();

// Home page
router.get("/", (req, res) => {
  res.render("pages/home")
});

router.get("/sign-up", (req, res) => {
  res.render("pages/sign-up")
});

router.get("/sign-in", (req, res) => {
  res.render("pages/sign-in")
});

router.get("/lectures/:lecture_id/watch", (req, res) => {
  res.render("pages/watch")
});

router.get("/dashboard", (req, res) => {
  res.render("pages/dashboard")
});

router.get("/classes", (req, res) => {
  res.render("pages/classes")
});

router.get("/lectures", (req, res) => {
  res.render("pages/lectures")
});

router.get("/students", (req, res) => {
  res.render("pages/students")
});

router.get("/profile", (req, res) => {
  res.render("pages/profile")
});




module.exports = router