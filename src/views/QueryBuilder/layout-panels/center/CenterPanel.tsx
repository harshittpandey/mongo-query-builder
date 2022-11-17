import { Component, Prop } from "vue-property-decorator";
import Vue, { VNode } from "vue";

import { Toggle } from "@/components/lib-ui";
import { ArrowRight } from "@/components/lib-ui/Icons";

@Component({ name: "CenterPanel" })
class CenterPanel extends Vue {
  static readonly EVENT_TOGGLE_COUNT = "toggleCount";
  static readonly RUN_QUERY = "runQuery";
  static readonly LABEL_QUERY = "Query";

  @Prop({
    type: String,
    default: "",
  })
  private readonly selectedDatabase!: string;

  @Prop({
    type: String,
    default: "",
  })
  private readonly selectedCollection!: string;

  get isRunQueryDisabled(): boolean {
    return !this.selectedDatabase || !this.selectedCollection;
  }

  @Prop({
    type: Boolean,
  })
  private readonly countEnabled!: boolean;

  get isCountEnabled(): boolean {
    return this.countEnabled;
  }
  set isCountEnabled(isEnable: boolean) {
    this.$emit(CenterPanel.EVENT_TOGGLE_COUNT, isEnable);
  }
  updateToggle(e: boolean) {
    this.isCountEnabled = e;
  }

  runQuery() {
    this.$emit(CenterPanel.RUN_QUERY);
  }

  render(): VNode {
    const countToggle = (
      <Toggle
        label="Count"
        checked={this.isCountEnabled}
        onChange={this.updateToggle}
      />
    );

    const runQueryButton = (
      <button
        class={`text-primaryButton bg-secondaryBorder rounded-sm text-sm font-medium px-3 py-1 mr-6
          ${this.isRunQueryDisabled ? " opacity-20" : ""}`}
        onClick={this.runQuery}
        disabled={this.isRunQueryDisabled}
      >
        Run Query
      </button>
    );

    const actions = [countToggle, runQueryButton];
    return (
      <div class="h-full">
        <div class="w-full h-4/6">
          <div class="editor-toolbar relative flex justify-between h-12">
            <div class="query-tab py-3 px-6 border-r-1 border-primary bg-secondary">
              {CenterPanel.LABEL_QUERY}
            </div>
            <div class="query-actions w-full flex flex-grow items-center relative bg-primary border-b-1 border-primary">
              {(this.selectedDatabase || this.selectedCollection) && (
                <div class="text-sm mx-4 text-primary font-medium font-roboto">
                  <span> {this.selectedDatabase} </span>
                  <span>{<ArrowRight />}</span>
                  <span> {this.selectedCollection} </span>
                </div>
              )}
              <div class="flex-grow flex justify-end">{actions}</div>
            </div>
          </div>
          {this.$slots.queryEditorSlot}
        </div>
        <div class="w-full h-2/6 overflow-scroll">
          {this.$slots.otherOptionsSlot}
        </div>
      </div>
    );
  }
}

export { CenterPanel };
