<template>
  <div class="container">
    <div class="card mt-4 mx-auto" style="width: 30rem;">
      <div class="card-header">Create Studio</div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="name">Studio Name</label>
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
            <label for="branch_id">Branch</label>
            <select v-model="form.branch_id" id="branch_id" class="form-control" name="branch_id">
              <option v-for="b in branch" :key="b.id" v-bind:value="b.id">{{b.name}}</option>
            </select>
            <span class="text-danger" v-if="errors.branch_id">{{errors.branch_id[0]}}</span>
          </div>
          <div class="form-group">
            <label for="basic_price">Basic Price</label>
            <input
              type="number"
              class="form-control"
              id="basic_price"
              name="basic_price"
              placeholder="input basic price"
              v-model="form.basic_price"
            />
            <span class="text-danger" v-if="errors.basic_price">{{errors.basic_price[0]}}</span>
          </div>
          <div class="form-group">
            <label for="aditional_friday_price">Aditional Friday Price</label>
            <input
              type="number"
              class="form-control"
              id="aditional_friday_price"
              name="aditional_friday_price"
              placeholder="input aditional friday price"
              v-model="form.aditional_friday_price"
            />
            <span
              class="text-danger"
              v-if="errors.aditional_friday_price"
            >{{errors.aditional_friday_price[0]}}</span>
          </div>
          <div class="form-group">
            <label for="aditional_saturday_price">Aditional Saturday Price</label>
            <input
              type="number"
              class="form-control"
              id="aditional_saturday_price"
              name="aditional_saturday_price"
              placeholder="input aditional saturday price"
              v-model="form.aditional_saturday_price"
            />
            <span
              class="text-danger"
              v-if="errors.aditional_saturday_price"
            >{{errors.aditional_saturday_price[0]}}</span>
          </div>
          <div class="form-group">
            <label for="aditional_sunday_price">Aditional Sunday Price</label>
            <input
              type="number"
              class="form-control"
              id="aditional_sunday_price"
              name="aditional_sunday_price"
              placeholder="input aditional sunday price"
              v-model="form.aditional_sunday_price"
            />
            <span
              class="text-danger"
              v-if="errors.aditional_sunday_price"
            >{{errors.aditional_sunday_price[0]}}</span>
          </div>
          <center>
            <button @click.prevent="add" class="btn btn-primary">Add Studio</button> |
            <router-link to="/studio" class="btn btn-warning">Cancel</router-link>
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
        branch_id: "",
        basic_price: "",
        aditional_friday_price: "",
        aditional_saturday_price: "",
        aditional_sunday_price: "",
      },
      branch: [],
      errors: [],
    };
  },
  mounted() {
    let token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/api/v1/branches", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.branch = data;
      });
  },
  methods: {
    add() {
      let token = localStorage.getItem("token");
      fetch("http://127.0.0.1:8000/api/v1/studio/", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          charset: "utf-8",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          name: this.form.name,
          branch_id: this.form.branch_id,
          basic_price: this.form.basic_price,
          aditional_friday_price: this.form.aditional_friday_price,
          aditional_saturday_price: this.form.aditional_saturday_price,
          aditional_sunday_price: this.form.aditional_sunday_price,
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
            this.$router.push("/studio");
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
