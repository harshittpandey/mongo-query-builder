import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import values from "lodash/values";

export enum BUTTON_TYPE_ENUM {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface Props {
  BUTTON_TYPE_ENUM?: BUTTON_TYPE_ENUM;
}

@Component({ name: "Button" })
class Button extends Vue {
  static readonly EVENT_CLICK = "click";
  readonly borderRight = "border-r-2 border-gray-200";
  readonly primaryButton =
    "bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded";
  readonly secondaryButton =
    "bg-gray-200 hover:bg-gray-400 text-black text-xs font-bold py-2 px-4 rounded";

  @Prop({
    type: String,
    required: false,
    default: BUTTON_TYPE_ENUM.PRIMARY,
    validator: (value: BUTTON_TYPE_ENUM): boolean => {
      return values(BUTTON_TYPE_ENUM).indexOf(value) > -1;
    },
  })
  readonly type!: BUTTON_TYPE_ENUM;

  get buttonBUTTON_TYPE_ENUM(): string {
    switch (this.type) {
      case BUTTON_TYPE_ENUM.SECONDARY:
        return this.secondaryButton;
      case BUTTON_TYPE_ENUM.PRIMARY:
      default: {
        return this.primaryButton;
      }
    }
  }

  render() {
    const clickHandler = () => this.$emit(Button.EVENT_CLICK);
    return (
      <button class={this.buttonBUTTON_TYPE_ENUM}>
        {" "}
        {/* onClick={clickHandler} */}
        {this.$slots.default}
      </button>
    );
  }
}

export { Button };
