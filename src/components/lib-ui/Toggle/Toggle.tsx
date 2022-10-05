import { Component, Prop } from "vue-property-decorator";
import Vue, { VNode } from "vue";
import { TCheckbox } from "vue-tailwind/dist/components";

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

  handleToggle(enable: boolean) {
    this.$emit(this.EVENT_CHANGE, enable);
  }

  toggle() {
    this.handleToggle(!this.checked);
  }

  render(): VNode {
    return (
      <span class="flex items-center">
        <span class="mx-2">{this.label}</span>
        <TCheckbox
          autofocus={true}
          checked={this.checked}
          onChange={this.handleToggle}
        />
      </span>
    );
  }
}

export { Toggle };
