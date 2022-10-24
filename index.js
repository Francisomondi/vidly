const Joi = require('joi');
const express = require("express");
const genresRoute = require("./routes/genres")
const homeRoute = require("./routes/home")

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.use("/api/genres", genresRoute);
app.use("/", homeRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));