<template>
  <div class="container">
    <div class="card mt-5">
      <div class="card-header">Schedule</div>
      <div class="card-body">
        <div>
          <form class="form-inline">
            <div class="form-group mb-2">
              <input
                class="form-control"
                type="date"
                id="start"
                name="start"
                v-model="filter.start"
              />
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <select class="form-control" v-model="filter.branch" id="branch" name="branch">
                <option v-for="b in branches" :key="b.id" v-bind:value="b.id">{{b.name}}</option>
              </select>
            </div>
            <button @click.prevent="filtering" class="btn btn-primary mb-2">Filter</button>
          </form>
          <br />
        </div>
        <table class="table table-bordered table-hover mt-4">
          <thead>
            <tr>
              <th>Name Movie</th>
              <th>Price</th>
              <th>Start Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in form" :key="s.id">
              <td>{{ s.name }}</td>
              <td align="right">Rp. {{ s.price }}</td>
              <td align="center">{{ s.start_time.replace(",", " ") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: [],
      filter: {
        start: "",
        branch: "",
      },
      branches: [],
    };
  },
  mounted() {
    this.loadData();
    fetch("http://127.0.0.1:8000/api/v1/branches")
      .then((response) => response.json())
      .then((data) => {
        this.branches = data;
      });
  },
  methods: {
    loadData() {
      fetch("http://127.0.0.1:8000/api/v1/user/schedule")
        .then((response) => response.json())
        .then((data) => {
          this.form = data;
        });
    },
    filtering() {
      fetch("http://127.0.0.1:8000/api/v1/schedule/filter", {
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
        },
        method: "POST",
        body: JSON.stringify({
          branch: this.filter.branch,
          start: this.filter.start,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.form = data;
        });
    },
  },
};
</script>
