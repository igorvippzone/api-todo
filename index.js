const express = require("express");
// const todoRouter = require("./api");
const formData = require("express-form-data");

const api = "/api/device";

const app = express();

app.use(formData.parse());
app.use(api, require("./api"));

const hostname = "0.0.0.0";
const PORT = process.env.PORT || 3000;

app.listen(PORT, hostname, () => {
  console.log(`Server run http://localhost:${PORT}/`);
});
