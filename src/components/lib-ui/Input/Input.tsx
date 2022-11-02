import Vue, { VNode, PropType, PropOptions } from "vue";
import { Component, Emit, Prop, PropSync } from "vue-property-decorator";
import { TInput } from "vue-tailwind/dist/components";

@Component({ name: "BaseInput" })
class BaseInput extends Vue {
  static readonly CHANGE_EVENT = "change";

  @Prop({
    type: Object,
    required: false,
    default: () => ({}),
  })
  readonly extraOpts!: object;

  @Prop({
    type: String,
    default: "",
    required: true,
  })
  readonly value!: string;

  get internalValue(): string {
    return this.value;
  }
  set internalValue(val: string) {
    this.$emit(BaseInput.CHANGE_EVENT, val);
  }

  readonly tSelectDefaultProps =
    "block pl-3 pr-10 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";

  render(): VNode {
    return (
      <div>
        <TInput
          classes={this.tSelectDefaultProps + " text-sm"}
          v-model={this.internalValue}
          {...{ props: this.extraOpts }}
        />
      </div>
    );
  }
}

export { BaseInput };
