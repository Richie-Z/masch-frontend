<template>
  <div class="container">
    <div class="mt-4 my-5 pt-4">
      <div class="jumbotron">
        <h1 class="display-4">Welcome</h1>
        <p class="lead">Hello, {{details.name}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      details: [],
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
  },
};
</script>