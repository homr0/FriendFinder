// Dependencies
var express = require("express");
var path = require("path");

// Global variables
var app = express();
var PORT = process.env.PORT || 3000;

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, './app/public/assets')));

// Handles routes.
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Starts the server to begin listening.
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});