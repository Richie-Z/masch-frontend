<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">CinemaXIX</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/branch" v-if="isLoggedin">Branch</b-nav-item>
          <b-nav-item to="/studio" v-if="isLoggedin">Studio</b-nav-item>
          <b-nav-item to="/movie" v-if="isLoggedin">Movie</b-nav-item>
          <b-nav-item to="/schedule" v-if="isLoggedin">Schedule</b-nav-item>
          <b-nav-item to="/user/schedule" v-if="isLoggedin">Schedule</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="details.name" right v-if="isLoggedin">
            <b-dropdown-item @click.prevent="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/login" v-if="!isLoggedin">Login</b-nav-item>
          <b-nav-item to="/studio" v-if="!isLoggedin">Register</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "Navigation",
  data() {
    return {
      details: [],
      isLoggedin: false,
    };
  },
  mounted() {
    let token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/api/v1/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.details = data;
      });
    this.$root.$on("login", () => {
      this.isLoggedin = true;
    });
    this.isLoggedIn = !!token;
  },
  methods: {
    logout() {
      let token = localStorage.getItem("token");
      fetch("http://127.0.0.1:8000/api/v1/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        localStorage.removeItem("token");
        this.isLoggedIn = false;
        this.$router.push({ name: "Home" });
      });
    },
  },
};
</script>
