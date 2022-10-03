import Vue, { VNode } from "vue";
import { Component } from "vue-property-decorator";

@Component({ name: "BasicLayout" })
class BasicLayout extends Vue {
  readonly $slots!: {
    toolbar: VNode[];
    left: VNode[];
    right: VNode[];
    footer: VNode[];
  };

  readonly borderRight = "border-r-2 border-gray-200";
  readonly dashedBorder = "border-4 border-dashed border-gray-200";

  render() {
    return (
      <div class="bg-slate-100 w-screen h-screen py-6 px-6 flex flex-col">
        {/* toolbar */}
        <div class="custom-navbar max-h-10"> {this.$slots.toolbar} </div>
        {/* cols container */}
        <div class="flex-1 px-4 py-4 sm:px-0 grid grid-cols-2">
          <div class={"h-full rounded-l-lg bg-white " + this.borderRight}>
            {this.$slots.left}
          </div>
          <div class="h-full rounded-r-lg bg-white">{this.$slots.right}</div>
        </div>
        {/* footer */}
        <div class="custom-footer max-h-10"> {this.$slots.footer} </div>
      </div>
    );
  }
}

export { BasicLayout };
