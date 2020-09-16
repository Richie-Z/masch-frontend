<template>
  <div class="home col-5 mx-auto py-5 mt-5">
    <div class="card">
      <div class="card-header text-center">Login</div>

      <div class="card-body">
        <div class="form-group">
          <label for="Username">Username</label>
          <input type="text" class="form-control" id="username" v-model="form.username" />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" class="form-control" id="password" v-model="form.password" />
        </div>
        <button @click.prevent="login" class="btn btn-primary btn-block">Login</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      fetch("http://127.0.0.1:8000/api/login", {
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
        },
        method: "POST",
        body: JSON.stringify({
          username: this.form.username,
          password: this.form.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.$root.$emit("login", true);
          localStorage.setItem("token", data);
          this.$router.push({ name: "Dashboard" });
        });
    },
  },
};
</script>