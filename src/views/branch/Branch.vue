<template>
  <div class="container">
    <div class="card mt-5">
      <div class="card-header">Branch</div>
      <div class="card-body">
        <router-link to="/branch/add" class="btn btn-primary">Add Branch</router-link>
        <table class="table table-bordered table-hover mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th style="text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in form.data" :key="b.id">
              <td>{{ b.name }}</td>
              <td align="center">
                <router-link :to="'/branch/' + b.id" class="btn btn-sm btn-warning">Edit</router-link>&#x20;|
                <button v-on:click="deleteData(b.id)" class="btn btn-sm btn-danger">Delete</button>
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
      fetch("http://127.0.0.1:8000/api/branch?page=" + page)
        .then((response) => response.json())
        .then((data) => {
          this.form = data;
        });
    },
    loadData() {
      fetch("http://127.0.0.1:8000/api/branch")
        .then((response) => response.json())
        .then((data) => {
          this.form = data;
        });
    },
    // deleteData(id) {
    //   fetch("http://127.0.0.1:8000/api/branch/" + id, {
    //     method: "delete",
    //   }).then(() => {
    //     this.loadData();
    //   });
    // },
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
            fetch("http://127.0.0.1:8000/api/branch/" + id, {
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
