require("dotenv").config();
const express = require("express");
const userRouting = require("./routes/users")
const { swaggerDocs } = require("./swagger");
const app = express();
app.use(express.json());
app.use('/api', userRouting);
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});
swaggerDocs(app,  3000);
module.exports = app;