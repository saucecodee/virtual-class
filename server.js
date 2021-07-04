require("express-async-errors");
const app = require("express")();
const { APP_PORT } = require("./src/config")


// Pre-route middlewares
require("./src/middlewares/pre-route.middleware")(app);

// View routes
app.use("/", require("./src/routes/web-view"));

// API routes
app.use("/api", require("./src/routes"));

// Ping route for testing connection
app.get("/ping", (req, res) => res.status(200).send("Hello world!"));

// Error middlewares
require("./src/middlewares/error.middleware")(app);

// Listen to server port
app.listen(APP_PORT, async () => {
  //Initialize MongoDB
  await require("./src/config/mongo-db.config")()
  console.log(`:::> Server listening on port ${APP_PORT} @ http://localhost:${APP_PORT}`);
});

// On  server error
app.on("error", (error) => {
  console.error(`<::: An error occurred on the server: \n ${error}`);
});


module.exports = app