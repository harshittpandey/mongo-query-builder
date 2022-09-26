<template>
  <div id="app">
    <QueryBuilder />
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />-->
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { QueryBuilder } from "@/layouts/query-builder";

@Component({
  components: {
    QueryBuilder,
  },
})
export default class App extends Vue {}
</script>

<style>
@import url("./index.css");
</style>
