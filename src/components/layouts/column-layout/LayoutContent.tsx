import { Component, Prop, Watch } from "vue-property-decorator";
import Vue, { VNode } from "vue";

import "./layout-content.css";

@Component({ name: "LayoutContent" })
class LayoutContent extends Vue {
  readonly $slots!: {
    left: VNode[];
    center: VNode[];
    right: VNode[];
  };

  @Prop({
    type: Boolean,
    default: false,
  })
  private readonly leftCollapse!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  private readonly rightCollapse!: boolean;

  private internalLeftCollapse = false;
  private internalRightCollapse = false;

  @Watch("leftCollapse")
  onLeftCollapseChange(isCollapsed: boolean) {
    this.internalLeftCollapse = isCollapsed;
  }

  @Watch("rightCollapse")
  onRightCollapseChange(isCollapsed: boolean) {
    this.internalRightCollapse = isCollapsed;
  }

  private toggleLeftWrapperCollapse(): void {
    this.internalLeftCollapse = !this.internalLeftCollapse;
  }

  private toggleRightWrapperCollapse(): void {
    this.internalRightCollapse = !this.internalRightCollapse;
  }

  render(): VNode {
    const chevronRight = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="svg-view-stroke"
          d="M6 12L10 8L6 4"
          stroke="#25265E"
          stroke-opacity="0.87"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    );

    const leftWrapperClass = `left-wrapper bg-primary relative overflow-y-auto ${
      this.internalLeftCollapse ? "minimized" : ""
    }`;

    const rightWrapperClass = `right-wrapper relative bg-primary overflow-y-auto ${
      this.internalRightCollapse ? "minimized" : ""
    }`;

    return (
      <div class="layout-content flex">
        <div class={leftWrapperClass}>
          <div class="layout-container mt-6 px-4 pb-3">{this.$slots.left}</div>
        </div>
        <div class="middle-wrapper relative w-3/6 grow border-l-1 border-r-1 border-primary">
          <span
            class={`left-wrapper-arrow-icon ${
              this.internalLeftCollapse ? "" : "rotate-180"
            }`}
          >
            {chevronRight}
          </span>
          {this.$slots.center}
          <span
            class={`right-wrapper-arrow-icon ${
              this.internalRightCollapse ? "rotate-180" : ""
            }`}
          >
            {chevronRight}
          </span>
        </div>
        <div class={rightWrapperClass}>{this.$slots.right}</div>
      </div>
    );
  }
}

export default LayoutContent;
