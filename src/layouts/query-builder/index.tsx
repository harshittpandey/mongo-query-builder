import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({ name: "QueryBuilder" })
class QueryBuilder extends Vue {
  render() {
    return <div class="text-green-400">Inside Query builder</div>;
  }
}

export { QueryBuilder };
