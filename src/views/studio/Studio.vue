<template>
  <div class="container">
    <div class="card mt-5">
      <div class="card-header">Studio</div>
      <div class="card-body">
        <router-link to="/studio/add" class="btn btn-primary">Add Studio</router-link>
        <table class="table table-bordered table-hover mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>Basic Price</th>
              <th>Aditional Friday Price</th>
              <th>Aditional Saturday Price</th>
              <th>Aditional Sunday Price</th>
              <th style="text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in form.data" :key="s.id">
              <td>{{ s.name }}</td>
              <td>{{ s.branch_name }}</td>
              <td align="right">Rp. {{ s.basic_price }}</td>
              <td align="right">Rp. {{ s.aditional_friday_price }}</td>
              <td align="right">Rp. {{ s.aditional_saturday_price }}</td>
              <td align="right">Rp. {{ s.aditional_sunday_price }}</td>
              <td align="center">
                <router-link :to="'/studio/' + s.id" class="btn btn-sm btn-warning">Edit</router-link>&#x20;|
                <button v-on:click="deleteData(s.id)" class="btn btn-sm btn-danger">Delete</button>
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
      let token = localStorage.getItem("token");
      fetch("http://127.0.0.1:8000/api/v1/studio?page=" + page, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.form = data;
        });
    },
    loadData() {
      let token = localStorage.getItem("token");
      fetch("http://127.0.0.1:8000/api/v1/studio", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.form = data;
        });
    },
    deleteData(id) {
      let token = localStorage.getItem("token");
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
            fetch("http://127.0.0.1:8000/api/v1/studio/" + id, {
              method: "delete",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then(() => {
              this.loadData();
            });
          }
        });
    },
  },
};
</script>
