const router = require("express").Router();
const AuthServ = require("./../../services/auth.service")
const ClassServ = require("./../../services/class.service")
const UserServ = require("./../../services/user.service")

// Home page
router.get("/", (req, res) => {
  let sess = req.session;
  if (sess.user) return res.redirect("/dashboard");

  res.render("pages/home")
});

router.get("/sign-up", async (req, res) => {
  const body = req.query

  if (!body.role) return res.render("pages/sign-up")

  const userData = await AuthServ.signup({
    name: body.name,
    password: body.password,
    email: body.email,
    role: body.role.toUpperCase()
  })

  if (!userData) return res.render("pages/sign-up")

  req.session.user = userData;
  res.redirect("/dashboard");
});

router.get("/sign-in", async (req, res) => {
  const body = req.query

  if (!body.email || !body.password) return res.render("pages/sign-in")

  const userData = await AuthServ.signin({
    password: body.password,
    email: body.email
  })

  if (!userData) return res.render("pages/sign-in")

  req.session.user = userData;
  res.redirect("/dashboard");
});

router.get('/log-out', (req, res) => {
  req.session.destroy((err) => {
    if (err) return console.log(err);
    res.redirect('/');
  });
});

router.get("/lectures/:lecture_id/watch", (req, res) => {
  const user = req.session.user
  res.render("pages/watch", { user })
});

router.get("/dashboard/", (req, res) => {
  const user = req.session.user
  res.render("pages/dashboard", { user })
});


// Class
router.get("/classes", async (req, res) => {
  const user = req.session.user
  let data

  if (user.role == "TUTOR") {
    data = await ClassServ.getTutorClasses({ tutor_id: user.user_id })
  } else {
    data = await ClassServ.getStudentClasses({ student_id: user.user_id })
  }

  res.render("pages/classes", { user, data })
});

router.get("/classes/create", async (req, res) => {
  const body = req.query
  const user = req.session.user

  if (!body.title) return res.render("pages/class", { user, mode: "create" })

  const data = await ClassServ.create({ ...req.query, ...{ USER_ID: user.user_id } })

  if (!data) return res.render("pages/class", { user, mode: "create" })

  res.redirect("/classes")
});

router.get("/classes/:class_id/", async (req, res) => {
  const user = req.session.user

  const data = await ClassServ.getOne({ _id: req.params.class_id })

  res.render("pages/class", { user, data, mode: "update" })
});


// Lectures
router.get("/lectures", (req, res) => {
  const user = req.session.user
  res.render("pages/lectures", { user })
});

// Class
router.get("/lectures", async (req, res) => {
  const user = req.session.user
  let data

  if (user.role == "TUTOR") {
    data = await ClassServ.getTutorClasses({ tutor_id: user.user_id })
  } else {
    data = await ClassServ.getStudent1es({ student_id: user.user_id })
  }

  res.render("pages/lectures", { user, data })
});

router.get("/lectures/create", async (req, res) => {
  const body = req.query
  const user = req.session.user

  if (!body.title) return res.render("pages/class", { user, mode: "create" })

  const data = await ClassServ.create({ ...req.query, ...{ USER_ID: user.user_id } })

  if (!data) return res.render("pages/class", { user, mode: "create" })

  res.redirect("/lectures")
});

router.get("/lectures/:class_id/", async (req, res) => {
  const user = req.session.user

  const data = await ClassServ.getOne({ _id: req.params.class_id })

  res.render("pages/class", { user, data, mode: "update" })
});

router.get("/students", (req, res) => {
  const user = req.session.user
  res.render("pages/students", { user })
});

router.get("/profile", (req, res) => {
  const user = req.session.user
  res.render("pages/profile", { user })
});




module.exports = router