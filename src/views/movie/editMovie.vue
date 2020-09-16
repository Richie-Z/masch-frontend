<template>
  <div class="container">
    <div class="card mt-4 mx-auto" style="width: 30rem;">
      <div class="card-header">Edit Movie</div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="name">Movies Name</label>
            <input
              type="text"
              class="form-control"
              v-model="form.name"
              id="name"
              name="name"
              placeholder="input studio name"
            />
            <span class="text-danger" v-if="errors.name">{{errors.name[0]}}</span>
          </div>
          <div class="form-group">
            <label for="minute_length">Movie Length</label>
            <input
              type="number"
              class="form-control"
              v-model="form.minute_length"
              id="minute_length"
              name="minute_length"
              placeholder="input minute length"
            />
            <span class="text-danger" v-if="errors.minute_length">{{errors.minute_length[0]}}</span>
          </div>
          <div class="form-group">
            <label for="picture_url">Movie Picture</label>
            <input
              type="text"
              class="form-control"
              v-model="form.picture_url"
              id="picture_url"
              name="picture_url"
              placeholder="input picture url movie"
            />
            <span class="text-danger" v-if="errors.picture_url">{{errors.picture_url[0]}}</span>
          </div>
          <div v-if="form.picture_url" align="center" style="margin:10px;">
            <h3 class="text-centered">Preview Picture</h3>
            <img v-bind:src="form.picture_url" style="width:200px;" />
          </div>
          <center>
            <button @click.prevent="edit" class="btn btn-primary">Edit Studio</button> |
            <router-link to="/movie" class="btn btn-warning">Cancel</router-link>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        minute_length: "",
        picture_url: "",
      },
      errors: [],
    };
  },
  mounted() {
    fetch("http://127.0.0.1:8000/api/movie/" + this.$route.params.id)
      .then((response) => response.json())
      .then((data) => {
        this.form = data;
      });
  },
  methods: {
    edit() {
      fetch("http://127.0.0.1:8000/api/movie/" + this.$route.params.id, {
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
        },
        method: "PUT",
        body: JSON.stringify({
          name: this.form.name,
          minute_length: this.form.minute_length,
          picture_url: this.form.picture_url,
        }),
      })
        .then(async (response) => {
          if (!response.ok) {
            const data = await response.json();
            const error = data;
            return Promise.reject(error);
          } else {
            this.$swal.fire({
              icon: "success",
              title: "success",
            });
            this.$router.push("/movie");
          }
        })
        .catch((error) => {
          this.errors = error;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>
