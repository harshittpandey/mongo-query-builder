import Vue, { VNode, PropType, PropOptions } from "vue";
import { Component, Emit, Prop, PropSync } from "vue-property-decorator";
import { TSelect } from "vue-tailwind/dist/components";

interface OptionWithText {
  text: string;
  value: string;
}

type Option = OptionWithText | string;

@Component({ name: "MultiSelect" })
class MultiSelect extends Vue {
  private readonly SELECT_EVENT = "select";
  @Prop({
    type: Array as PropType<OptionWithText[]>,
    required: false,
    default: () => [],
  })
  readonly options!: Option[];

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
  readonly option!: string;

  get selectedOption(): string {
    return this.option;
  }
  set selectedOption(val: string) {
    this.$emit(this.SELECT_EVENT, val);
  }

  readonly tSelectDefaultProps =
    "block pl-3 pr-10 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";

  get menuOptions(): OptionWithText[] {
    return this.options.map((option) => {
      if (typeof option === "string") return { text: option, value: option };
      else return option;
    });
  }

  render(): VNode {
    return (
      <div>
        <TSelect
          options={this.menuOptions}
          classes={this.tSelectDefaultProps + " text-sm"}
          v-model={this.selectedOption}
          {...{ props: this.extraOpts }}
        />
      </div>
    );
  }
}

export { MultiSelect };
