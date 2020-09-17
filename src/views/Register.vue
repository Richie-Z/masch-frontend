<template>
  <div class="container">
    <div class="card mt-4 mx-auto" style="width: 30rem;">
      <div class="card-header">Register</div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="name">Name</label>
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
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              v-model="form.username"
              id="username"
              name="username"
              placeholder="input username"
            />
            <span class="text-danger" v-if="errors.username">{{errors.username[0]}}</span>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="form.password"
              id="password"
              name="password"
              placeholder="input password"
            />
            <span class="text-danger" v-if="errors.password">{{errors.password[0]}}</span>
          </div>
          <div class="form-group">
            <label for="c_password">Confirm Password</label>
            <input
              type="c_password"
              class="form-control"
              v-model="form.c_password"
              id="c_password"
              name="c_password"
              placeholder="input c_password"
            />
            <span class="text-danger" v-if="errors.c_password">{{errors.c_password[0]}}</span>
          </div>
          <center>
            <button @click.prevent="add" class="btn btn-primary">Register</button>
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
        username: "",
        password: "",
        c_password: "",
      },
      errors: [],
    };
  },
  methods: {
    add() {
      fetch("http://127.0.0.1:8000/api/v1/register/", {
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
        },
        method: "POST",
        body: JSON.stringify({
          name: this.form.name,
          username: this.form.username,
          password: this.form.password,
          c_password: this.form.c_password,
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
            this.$router.push("/login");
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
