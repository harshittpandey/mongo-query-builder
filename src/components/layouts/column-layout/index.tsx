import { Component, Prop } from "vue-property-decorator";
import Vue, { VNode } from "vue";
import Navbar from "./Navbar";
import LayoutContent from "./LayoutContent";

import "./layout.css";

@Component({ name: "Layout2" })
class Layout2 extends Vue {
  @Prop({
    default: "MongoDB Query Builder",
  })
  private readonly pageHeader!: string;

  render(): VNode {
    return (
      <div>
        <Navbar navHeader={this.pageHeader}>
          <template slot="navActions"> {this.$slots.navActions} </template>
        </Navbar>
        <LayoutContent>
          <template slot="left"> {this.$slots.left} </template>
          <template slot="center"> {this.$slots.center} </template>
          <template slot="right"> {this.$slots.right} </template>
        </LayoutContent>
      </div>
    );
  }
}

export default Layout2;
