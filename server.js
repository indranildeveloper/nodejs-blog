const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const { render } = require("ejs");
const { result } = require("lodash");

// Set an Express App
const app = express();
// Connect to MongoDB
const dbURI = "mongodb://localhost:27017/nodejs-blog";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(8000))
  .catch((err) => console.log(err));

// Register view engine
app.set("view engine", "ejs");
// app.set('views', '<folder name>');

// Middleware for static files and MiddleWare
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog Routes
app.use("/blogs", blogRoutes);

// 404 Page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
