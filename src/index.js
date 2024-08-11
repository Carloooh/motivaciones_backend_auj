const express = require("express");
const { connectToMongoDB } = require("./connect");
const motivacionesRoute = require("./routes/motivaciones");
const cors = require("cors");

const app = express();
const PORT = 8001;

app.use(cors());
app.options("*", cors());

connectToMongoDB().then(() => console.log("Mongodb connected"));

app.use(express.json());

app.use("/motivaciones", motivacionesRoute);

app.listen(PORT, () => console.log(`Server Started at http://localhost:${PORT}`));

module.exports = app;