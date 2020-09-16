<template>
  <div class="container">
    <div class="card mt-4 mx-auto" style="width: 30rem;">
      <div class="card-header">Create Schedule</div>
      <div class="card-body">
        <div class="alert alert-danger" v-if="errors.messages">
          <p style="text-align:center;">{{errors.messages}}</p>
        </div>
        <form>
          <div class="form-group">
            <label for="movie_id">Movies</label>
            <select v-model="form.movie_id" id="movie_id" class="form-control" name="movie_id">
              <option v-for="m in movie" :key="m.id" v-bind:value="m.id">{{m.name}}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="studio_id">Studios</label>
            <select v-model="form.studio_id" id="studio_id" class="form-control" name="studio_id">
              <option v-for="s in studio" :key="s.id" v-bind:value="s.id">{{s.name}}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="start">Start Time</label>
            <input
              type="datetime-local"
              class="form-control"
              id="start"
              name="start"
              v-model="form.start"
            />
          </div>

          <center>
            <button @click.prevent="add" class="btn btn-primary">Add Schedule</button> |
            <router-link to="/schedule" class="btn btn-warning">Cancel</router-link>
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
        movie_id: "",
        studio_id: "",
        start: "",
      },
      movie: [],
      studio: [],
      errors: {
        messages: "",
      },
    };
  },
  mounted() {
    fetch("http://127.0.0.1:8000/api/movies")
      .then((response) => response.json())
      .then((data) => {
        this.movie = data;
      });
    fetch("http://127.0.0.1:8000/api/studios")
      .then((response) => response.json())
      .then((data) => {
        this.studio = data;
      });
  },
  methods: {
    add() {
      fetch("http://127.0.0.1:8000/api/schedule/", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          charset: "utf-8",
        },
        method: "POST",
        body: JSON.stringify({
          movie_id: this.form.movie_id,
          studio_id: this.form.studio_id,
          start: this.form.start,
        }),
      })
        .then(async (response) => {
          if (response.status === 400) {
            const error = "schedule overlapped";
            this.$swal.fire({
              icon: "error",
              title: "Schedule Overlapped",
            });
            return Promise.reject(error);
          } else {
            this.$swal.fire({
              icon: "success",
              title: "success",
            });
            this.$router.push("/schedule");
          }
        })
        .catch((error) => {
          this.errors.messages = error;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>
