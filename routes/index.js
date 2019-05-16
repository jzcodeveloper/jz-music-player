const express = require("express");
const app = express();

//Routes
app.use("/", require("./metadata"));
app.use("/auth", require("./auth"));
app.use("/favorites", require("./favorites"));
app.use("/playlists", require("./playlists"));

module.exports = app;
