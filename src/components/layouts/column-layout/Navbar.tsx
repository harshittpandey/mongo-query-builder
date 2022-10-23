import { Prop, Component } from "vue-property-decorator";
import Vue, { VNode } from "vue";

import "./navbar.css";

@Component({ name: "Navbar" })
class Navbar extends Vue {
  @Prop({
    default: "Hey there!!",
  })
  private readonly navHeader!: string;

  readonly $slots!: {
    navActions: VNode[];
  };

  render(): VNode {
    return (
      <header class="iteration-2-navbar flex items-center justify-between py-3 px-6 bg-primary border-b-1 border-primary base-height">
        <div class="text-sm"> {this.navHeader} </div>
        <div>{this.$slots.navActions}</div>
      </header>
    );
  }
}

export default Navbar;
