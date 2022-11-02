import { Component, Prop, PropSync } from "vue-property-decorator";
import Vue, { VNode } from "vue";
import { ASYNC_FUNCTION } from "@/types/generic";

import "./Accordion.css";

@Component({ name: "Accordion" })
class Accordion extends Vue {
  static readonly EVENT_SELECT_ITEM = "selectItem";
  static readonly CLICKED_TEXT_CLASS = "text-secondaryText";

  @Prop({
    type: String,
    default: "",
  })
  private readonly header!: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  private readonly highlight!: boolean;

  @Prop({
    type: Function,
    default: () => ({}),
  })
  private readonly fetchItems!: ASYNC_FUNCTION<string[]>;
  private items: string[] = [];
  private item = "";

  private updateSelectedItem(item: string): void {
    this.item = item;
    this.$emit(Accordion.EVENT_SELECT_ITEM, this.item);
  }

  private contentVisible = false;
  private updateContentVisible(toggleVal: boolean): void {
    this.contentVisible = toggleVal;
  }
  private showContents(): void {
    if (this.items.length > 0) this.updateContentVisible(!this.contentVisible);
    else {
      this.fetchItems().then((items: string[]) => {
        this.items = items;
        this.updateContentVisible(true);
      });
    }
  }

  render(): VNode {
    const headerClass = `header text-sm font-medium font-roboto mt-1 leading-5 cursor-pointer ${
      this.highlight ? Accordion.CLICKED_TEXT_CLASS : "text-editorText"
    }`;
    return (
      <div>
        <div class="flex pb-2 overflow-hidden">
          <div class="accordion-left-wrapper">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="svg-view"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 0C1.34315 0 0 1.34315 0 3V7V15C0 16.6569 1.34314 18 3 18H21C22.6569 18 24 16.6569 24 15V7V3C24 1.34315 22.6569 0 21 0H3ZM22 6V3C22 2.44771 21.5523 2 21 2H3C2.44772 2 2 2.44772 2 3V6H22ZM2 8H7L7 16H3C2.44772 16 2 15.5523 2 15V8ZM9 16V8H15V16H9ZM17 16H21C21.5523 16 22 15.5523 22 15V8H17V16Z"
                fill-opacity="0.67"
              ></path>
            </svg>
          </div>
          <div class="accordion-container pl-2 grow">
            <div class={headerClass} v-on:click={this.showContents}>
              {this.header}
            </div>
            {this.contentVisible && (
              <ul class="content-items list-none relative pt-1 pb-6 font-medium">
                {this.items.map((item) => (
                  <li
                    class={`content-item pt-1 text-xs cursor-pointer -ml-5 ${
                      item === this.item && this.highlight
                        ? Accordion.CLICKED_TEXT_CLASS
                        : "text-secondary"
                    }`}
                    v-on:click={() => this.updateSelectedItem(item)}
                  >
                    <div class="text text-sm font-normal font-roboto relative pl-5">
                      {item}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Accordion;
