<template>
  <div class="container">
    <div class="card mt-5">
      <div class="card-header">Movie</div>
      <div class="card-body">
        <router-link to="/movie/add" class="btn btn-primary">Add Movie</router-link>
        <table class="table table-bordered table-hover mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Movie Length</th>
              <th>Image</th>
              <th style="text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in form.data" :key="m.id">
              <td>{{ m.name }}</td>
              <td>{{ m.minute_length }}</td>
              <td align="center">
                <img v-bind:src="m.picture_url" style="width:100px;" />
              </td>
              <td align="center">
                <router-link :to="'/movie/' + m.id" class="btn btn-sm btn-warning">Edit</router-link>&#x20;|
                <button v-on:click="deleteData(m.id)" class="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <pagination style="float:right;" :data="form" @pagination-change-page="getResult"></pagination>
        <p>Total Data : {{ form.total }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: [],
    };
  },
  mounted() {
    this.loadData();
    this.getResult();
  },
  methods: {
    getResult(page) {
      fetch("http://127.0.0.1:8000/api/movie?page=" + page)
        .then((response) => response.json())
        .then((data) => {
          this.form = data;
        });
    },
    loadData() {
      fetch("http://127.0.0.1:8000/api/movie")
        .then((response) => response.json())
        .then((data) => {
          this.form = data;
        });
    },
    deleteData(id) {
      this.$swal
        .fire({
          title: "Apakah kamu yakin?",
          text: "Jika kamu hapus, maka data tidak akan kembali lagi.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Hapus",
          cancelButtonText: "Cancel",
        })
        .then((result) => {
          if (result.value) {
            this.$swal.fire({
              title: "Success!",
              text: "Article deleted successfully",
              icon: "success",
              timer: 1000,
            });
            fetch("http://127.0.0.1:8000/api/movie/" + id, {
              method: "delete",
            }).then(() => {
              this.loadData();
            });
          }
        });
    },
  },
};
</script>
