const models = require("../models");
const Recipe = models.recipes;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Recipe requires a title" });
  }

  const newRecipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    url: req.body.url,
    tags: req.body.tags,
  });

  newRecipe
    .save(newRecipe)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Recipe.",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Recipe.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recipe.",
      });
    });
};

exports.findByTag = (req, res) => {
  const desiredTags = req.body.tags;

  Recipe.find({ tags: desiredTags })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recipe.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Recipe.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Recipe with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Recipe with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Recipe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found!`,
        });
      } else res.send({ message: "Recipe was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Recipe with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Recipe.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`,
        });
      } else {
        res.send({
          message: "Recipe was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Recipe with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Recipe.deleteMany({})
    .then((data) => {
      res.send({
        message: `All ${data.deletedCount} Recipes were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Recipes.",
      });
    });
};

exports.findAllPublished = (req, res) => {
  Recipe.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Recipes.",
      });
    });
};
