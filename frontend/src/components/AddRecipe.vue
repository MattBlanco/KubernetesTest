<template>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="recipe.title"
            name="title"
          />
        </div>
  
        <div class="form-group">
          <label for="description">Description</label>
          <input
            class="form-control"
            id="description"
            required
            v-model="recipe.description"
            name="description"
          />
        </div>

        <div class="form-group">
          <label for="Url">URL</label>
          <input
            class="form-control"
            id="url"
            required
            v-model="recipe.url"
            name="url"
          />
        </div>
  
        <button @click="saveRecipe" class="btn btn-success">Submit</button>
      </div>
  
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newRecipe">Add</button>
      </div>
    </div>
  </template>
  
  <script>
  import RecipeDataService from "../services/RecipeDataService";
  
  export default {
    name: "add-recipe",
    data() {
      return {
        recipe: {
          id: null,
          title: "",
          description: "",
          url: null,
          tags: "",
          published: false
        },
        submitted: false
      };
    },
    methods: {
      saveRecipe() {
        var data = {
          title: this.recipe.title,
          description: this.recipe.description,
          url: this.recipe.url
        };
  
        RecipeDataService.create(data)
          .then(response => {
            console.log(response.data);
            this.recipe.id = response.data.id;
            this.submitted = true;
            console.log(this.recipe.id)
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      newRecipe() {
        this.submitted = false;
        this.recipe = {};
      }
    }
  };
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>