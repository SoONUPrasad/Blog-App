const express = require("express");
const cookieParser = require("cookie-parser");
const staticRoutes = require("./src/routes/static.routes");
const userRoutes = require("./src/routes/user.routes");
const blogRoutes = require("./src/routes/blog.routes");
const connectDB = require("./src/db/connection");

const app = express();
connectDB();


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));

// set the view engine
app.set("view engine", "ejs");
app.set("views", "./src/views/pages");

app.use('/', staticRoutes);
app.use('/user', userRoutes);
app.use('/blogs', blogRoutes);





module.exports = app;