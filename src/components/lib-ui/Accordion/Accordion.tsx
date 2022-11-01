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
    if (this.item.length > 0) this.updateContentVisible(!this.contentVisible);
    else {
      this.fetchItems().then((items: string[]) => {
        this.items = items;
        this.updateContentVisible(true);
      });
    }
  }

  render(): VNode {
    const headerClass = `header text-sm font-medium mt-1 leading-5 cursor-pointer pb-2 ${
      this.highlight ? Accordion.CLICKED_TEXT_CLASS : "text-editorText"
    }`;
    return (
      <div>
        <div class="flex">
          <div class="accordion-left-wrapper">
            <img src="./db-table.svg" alt="" class="w-5 h-5" />
          </div>
          <div class="accordion-container pl-2">
            <div class={headerClass} v-on:click={this.showContents}>
              {this.header}
            </div>
            {this.contentVisible && (
              <ul class="content-items list-none relative pt-1 pb-6 font-medium">
                {this.items.map((item) => (
                  <li
                    class={`content-item pt-1 text-xs cursor-pointer -ml-4 ${
                      item === this.item && this.highlight
                        ? Accordion.CLICKED_TEXT_CLASS
                        : "text-secondary"
                    }`}
                    v-on:click={() => this.updateSelectedItem(item)}
                  >
                    <div class="text relative pl-4">{item}</div>
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
