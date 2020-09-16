<template>
  <div class="container">
    <div class="card mt-4 mx-auto" style="width: 30rem;">
      <div class="card-header">Create Branch</div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="name">Branch Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              placeholder="input branch region"
              v-model="form.name"
            />
            <span class="text-danger" v-if="errors.name">
              {{
              errors.name[0]
              }}
            </span>
          </div>
          <center>
            <button @click.prevent="add" class="btn btn-primary">Add Branch</button>
            |
            <router-link to="/branch" class="btn btn-warning">Cancel</router-link>
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
      },
      errors: [],
    };
  },
  methods: {
    add() {
      fetch("http://127.0.0.1:8000/api/v1/branch/", {
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
        },
        method: "POST",
        body: JSON.stringify({
          name: this.form.name,
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
            this.$router.push("/branch");
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
