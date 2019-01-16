// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Global variables
var app = express();
var PORT = process.env.PORT || 3000;

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Handles routes.
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Starts the server to begin listening.
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});