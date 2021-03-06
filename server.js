// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

//models

// Creating express app and configuring middleware needed for authentication
var app = express();
// urlencoded is a function 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//static lets you connect to the public folder through express
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status

// we are passing information and using secession and this a middle-ware
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser. %s", PORT, PORT, "Good Luck");
    console.log(`Listening on port ${PORT}.`);
  });
});
// the precent s (%s) is hosting the port on