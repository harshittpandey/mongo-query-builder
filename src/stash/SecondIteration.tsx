import Component from "vue-class-component";
import Vue, { VNode } from "vue";

import Layout2 from "@/components/layouts/column-layout";

@Component({ name: "SecondIteration" })
class SecondIteration extends Vue {
  render(): VNode {
    return <Layout2></Layout2>;
  }
}

export default SecondIteration;
