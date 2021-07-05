const router = require("express").Router();
const AuthServ = require("./../../services/auth.service")
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
  res.render("pages/watch")
});

router.get("/dashboard/", (req, res) => {
  const user = req.session.user
  console.log({ user })
  res.render("pages/dashboard", { user })
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