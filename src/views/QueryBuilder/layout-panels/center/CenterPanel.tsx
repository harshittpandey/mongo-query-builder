import { Component, Prop } from "vue-property-decorator";
import Vue, { VNode } from "vue";

@Component({ name: "CenterPanel" })
class CenterPanel extends Vue {
  static readonly EVENT_TOGGLE_COUNT = "toggleCount";
  static readonly RUN_QUERY = "runQuery";

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

  runQuery() {
    this.$emit(CenterPanel.RUN_QUERY);
  }

  render(): VNode {
    return (
      <div class="h-full">
        <div class="w-full h-4/6">
          <div class="editor-toolbar relative flex justify-between h-12">
            <div class="query-tab py-3 px-6 border-r-1 border-primary bg-secondary">
              Query
            </div>
            <div class="query-actions w-full flex flex-grow items-center relative bg-primary border-b-1 border-primary">
              {(this.selectedDatabase || this.selectedCollection) && (
                <div class="text-sm mx-4 text-primary font-medium font-roboto">
                  <span> {this.selectedDatabase} </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="inline"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                      />
                    </svg>
                  </span>
                  <span> {this.selectedCollection} </span>
                </div>
              )}
              <div class="flex-grow flex justify-end">
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
                      v-model={this.isCountEnabled}
                    />
                    <div class="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondaryBorder"></div>
                    <span class="ml-2 text-sm text-edtiorText">Count</span>
                  </label>
                </span>
                <button
                  class="text-primaryButton bg-secondaryBorder rounded-sm text-sm font-medium cursor-pointer px-3 py-1 mr-6"
                  onClick={this.runQuery}
                  disabled={this.isRunQueryDisabled}
                >
                  Run Query
                </button>
              </div>
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
