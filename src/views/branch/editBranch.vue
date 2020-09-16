<template>
  <div class="container">
    <div class="card mt-4 mx-auto" style="width: 30rem;">
      <div class="card-header">Edit Branch</div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="branch">Branch Name</label>
            <input
              type="text"
              class="form-control"
              id="branch"
              name="branch"
              placeholder="input branch region"
              v-model="form.branch"
            />
            <span class="text-danger" v-if="errors.name">{{errors.name[0]}}</span>
          </div>
          <center>
            <button @click.prevent="edit" class="btn btn-primary">Edit Branch</button>
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
        branch: "",
      },
      errors: [],
    };
  },
  mounted() {
    fetch("http://127.0.0.1:8000/api/branch/" + this.$route.params.id)
      .then((response) => response.json())
      .then((data) => {
        this.form.branch = data.name;
      });
  },
  methods: {
    edit() {
      fetch("http://127.0.0.1:8000/api/branch/" + this.$route.params.id, {
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
        },
        method: "PUT",
        body: JSON.stringify({
          name: this.form.branch,
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
          console.error("eror:", error);
        });
    },
  },
};
</script>
