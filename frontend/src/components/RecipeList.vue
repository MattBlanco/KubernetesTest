<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by title"
            v-model="title"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchTitle"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Recipe List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(recipe, index) in recipes"
            :key="index"
            @click="setActiveRecipe(recipe, index)"
          >
            {{ recipe.title }}
          </li>
        </ul>
  
        <button class="m-3 btn btn-sm btn-danger" @click="removeAllRecipes">
          Remove All
        </button>
      </div>
      <div class="col-md-6">
        <div v-if="currentRecipe">
          <h4>Recipe</h4>
          <div>
            <label><strong>Title:</strong></label> {{ currentRecipe.title }}
          </div>
          <div>
            <label><strong>Description:</strong></label> {{ currentRecipe.description }}
          </div>
          <div>
            <label><strong>Status:</strong></label> {{ currentRecipe.published ? "Published" : "Pending" }}
          </div>
  
          <a class="badge badge-warning"
            :href="'/recipes/' + currentRecipe.id"
          >
            Edit
          </a>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Recipe.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import RecipeDataService from "../services/RecipeDataService";
  
  export default {
    name: "recipes-list",
    data() {
      return {
        recipes: [],
        currentRecipe: null,
        currentIndex: -1,
        title: ""
      };
    },
    methods: {
      retrieveRecipes() {
        RecipeDataService.getAll()
          .then(response => {
            this.recipes = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveRecipes();
        this.currentRecipe = null;
        this.currentIndex = -1;
      },
  
      setActiveRecipe(recipe, index) {
        this.currentRecipe = recipe;
        this.currentIndex = index;
      },
  
      removeAllRecipes() {
        RecipeDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      searchTitle() {
        RecipeDataService.findByTitle(this.title)
          .then(response => {
            this.recipes = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.retrieveRecipes();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>