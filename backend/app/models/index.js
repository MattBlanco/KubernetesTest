const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.recipes = require("./recipe.model.js")(mongoose);

module.exports = db;
