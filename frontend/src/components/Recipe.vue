<template>
    <div v-if="currentRecipe" class="edit-form">
      <h4>Tutorial</h4>
      <form>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title"
            v-model="currentRecipe.title"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" class="form-control" id="description"
            v-model="currentRecipe.description"
          />
        </div>
  
        <div class="form-group">
          <label><strong>Status:</strong></label>
          {{ currentRecipe.published ? "Published" : "Pending" }}
        </div>
      </form>
  
      <button class="badge badge-primary mr-2"
        v-if="currentRecipe.published"
        @click="updatePublished(false)"
      >
        UnPublish
      </button>
      <button v-else class="badge badge-primary mr-2"
        @click="updatePublished(true)"
      >
        Publish
      </button>
  
      <button class="badge badge-danger mr-2"
        @click="deleteRecipe"
      >
        Delete
      </button>
  
      <button type="submit" class="badge badge-success"
        @click="updateRecipe"
      >
        Update
      </button>
      <p>{{ message }}</p>
    </div>
  
    <div v-else>
      <br />
      <p>Please click on a Recipe.</p>
    </div>
  </template>
  
  <script>
  import RecipeDataService from "../services/RecipeDataService";
  
  export default {
    name: "recipe-details",
    data() {
      return {
        currentRecipe: null,
        message: ''
      };
    },
    methods: {
      getTutorial(id) {
        RecipeDataService.get(id)
          .then(response => {
            this.currentRecipe = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      updatePublished(status) {
        var data = {
          id: this.currentRecipe.id,
          title: this.currentRecipe.title,
          description: this.currentRecipe.description,
          published: status
        };
  
        RecipeDataService.update(this.currentRecipe.id, data)
          .then(response => {
            this.currentRecipe.published = status;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      updateTutorial() {
        RecipeDataService.update(this.currentRecipe.id, this.currentRecipe)
          .then(response => {
            console.log(response.data);
            this.message = 'The tutorial was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      deleteTutorial() {
        RecipeDataService.delete(this.currentRecipe.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "tutorials" });
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.message = '';
      this.getRecipe(this.$route.params.id);
    }
  };
  </script>
  
  <style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>