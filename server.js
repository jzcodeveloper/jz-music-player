//Models
require("./models/AlbumArt");
require("./models/User");

//Dependencies
require("colors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const port = process.env.PORT || 5001;

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport config
app.use(passport.initialize());
require("./config/passport")(passport);

//Use routes
app.use(require("./routes/index"));

//DB config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB Connected".green))
  .catch(err => console.log("Could not connect to MongoDB".red));

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  // Always renders index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Starts server
app.listen(port, () => console.log(`Server running on port: ${port}`.blue));
