const express = require("express");
// const todoRouter = require("./api");
const formData = require("express-form-data");

const api = "/api/todo/";

const app = express();

app.use(formData.parse());
app.use(api, require("./api"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server run http://localhost:${PORT}/`);
});
