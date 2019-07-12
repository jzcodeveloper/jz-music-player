const express = require("express");
const app = express();

//Routes
app.use("/auth", require("./auth"));
app.use("/metadata", require("./metadata"));
app.use("/favorites", require("./favorites"));
app.use("/playlists", require("./playlists"));

module.exports = app;
