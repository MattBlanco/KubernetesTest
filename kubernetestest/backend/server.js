const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to mongoDB!");
  })
  .catch((err) => {
    console.log("Cannot connect to mongoDB: ", err);
    process.close();
  });

// test route
app.get("/", (req, res) => {
  res.json({ message: "testing" });
});

require("./app/routes/recipe.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
