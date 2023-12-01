const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// use when starting application locally with node command
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// use with k8s
let mongoUrlK8s = `mongodb://${process.env.USER_NAME}:${process.env.USER_PWD}@${process.env.DB_URL}`

const db = require("./app/models");
db.mongoose
  .connect(mongoUrlK8s)
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
