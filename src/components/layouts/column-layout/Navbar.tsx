import { Prop, Component, Inject } from "vue-property-decorator";
import Vue, { VNode } from "vue";

import "./navbar.css";

@Component({ name: "Navbar" })
class Navbar extends Vue {
  @Prop({
    default: "MongoDB Query Builder",
  })
  private readonly navHeader!: string;

  readonly $slots!: {
    navActions: VNode[];
  };

  @Inject() hideBuilderHandler!: () => void;

  private handleCloseEditor() {
    this.hideBuilderHandler();
  }

  render(): VNode {
    return (
      <header class="iteration-2-navbar flex items-center justify-between py-3 px-6 bg-primary border-b-1 border-primary base-height">
        <div class="flex items-center text-sm font-medium font-roboto">
          {this.navHeader}
          {/*
            <div class="mongodb-online-indicator ml-2">
              <span class="blink"></span>
            </div>
          */}
        </div>
        <div>{this.$slots.navActions}</div>
        <div>
          <button
            class="flex items-center pointer font-medium"
            onClick={this.handleCloseEditor}
          >
            <span class="text-xs text-red-600 mr-1 px-2 py-1 rounded-full bg-red-200">
              Close Editor
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </button>
        </div>
      </header>
    );
  }
}

export default Navbar;
