module.exports = app => {
    const recipeController = require("../controllers/recipe.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Recipe
    router.post("/", recipeController.create);
  
    // Retrieve all recipes
    router.get("/", recipeController.findAll);

    // Retrieve recipe by tag
    router.get("/tag", recipeController.findByTag)
  
    // Retrieve all published recipes
    router.get("/published", recipeController.findAllPublished);
  
    // Retrieve a single Recipe with id
    router.get("/:id", recipeController.findOne);
  
    // Update a Recipe with id
    router.put("/:id", recipeController.update);
  
    // Delete a Recipe with id
    router.delete("/:id", recipeController.delete);
  
    // Delete all recipes
    router.delete("/", recipeController.deleteAll);
  
    app.use('/api/recipes', router);
  };