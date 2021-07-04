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

// Tutor dashboard
router.get("/tutor/dashboard", (req, res) => {
  res.render("pages/tutor/dashboard")
});

router.get("/tutor/classes", (req, res) => {
  res.render("pages/tutor/classes")
});

router.get("/tutor/lectures", (req, res) => {
  res.render("pages/tutor/lectures")
});

router.get("/tutor/students", (req, res) => {
  res.render("pages/tutor/students")
});

router.get("/tutor/profile", (req, res) => {
  res.render("pages/tutor/profile")
});


// Student dashboard
router.get("/student/dashboard", (req, res) => {
  res.render("pages/student/dashboard")
});



module.exports = router