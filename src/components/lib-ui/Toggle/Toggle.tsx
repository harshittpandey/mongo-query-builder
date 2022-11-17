import { Component, Prop } from "vue-property-decorator";
import Vue, { VNode } from "vue";

@Component({ name: "Toggle" })
class Toggle extends Vue {
  private readonly EVENT_CHANGE = "change";

  @Prop({
    type: Boolean,
    default: false,
    required: true,
  })
  private checked!: boolean;

  @Prop({
    type: String,
    default: false,
    required: true,
  })
  private label!: string;

  get _checked() {
    return this.checked;
  }
  set _checked(isEnable: boolean) {
    this.$emit(this.EVENT_CHANGE, isEnable);
  }

  render(): VNode {
    return (
      <span class="inline-flex relative items-center">
        <label
          for="default-toggle"
          class="inline-flex relative items-center cursor-pointer mr-6"
        >
          <input
            type="checkbox"
            value=""
            id="default-toggle"
            class="sr-only peer"
            v-model={this._checked}
          />
          <div class="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondaryBorder"></div>
          <span class="ml-2 text-sm text-edtiorText">{this.label}</span>
        </label>
      </span>
    );
  }
}

export { Toggle };
