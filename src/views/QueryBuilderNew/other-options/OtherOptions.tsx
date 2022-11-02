import { Component } from "vue-property-decorator";
import Vue, { VNode } from "vue";

import { BaseInput } from "@/components/lib-ui";

@Component({ name: "OtherOptions" })
class OtherOptions extends Vue {
  private selectedDatabase = "";
  private selectDatabase(val: string): void {
    console.log("Inside selectDatabase", val);
  }

  render(): VNode {
    return (
      <div>
        <h2 class="py-3 px-4 text-md border-b-1 border-primary font-medium text-editorText bg-primary">
          Other Options
        </h2>
        <div class="mx-4 my-3">
          <div class="mb-4 flex flex-wrap">
            <div class="mr-4">
              <div class="text-editorText mb-2">
                Projections
                <span class="text-xs"> (comma separated values)</span>
              </div>
              <BaseInput
                value={this.selectedDatabase}
                onChange={this.selectDatabase}
                extraOpts={{
                  placeholder: "Projections",
                  fixedClasses: "w-300 text-xs pr-3",
                }}
              />
            </div>
            <div class="mr-4">
              <div class="text-editorText mb-2">
                Sort
                <span class="text-xs"> (comma separated values)</span>
              </div>
              <BaseInput
                value={this.selectedDatabase}
                onChange={this.selectDatabase}
                extraOpts={{
                  placeholder: "Sort",
                  fixedClasses: "w-300 text-xs pr-3",
                }}
              />
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="mr-4">
              <div class="text-editorText mb-2">Skip</div>
              <BaseInput
                value={this.selectedDatabase}
                onChange={this.selectDatabase}
                extraOpts={{
                  type: "number",
                  placeholder: "Enter skip",
                  fixedClasses: "w-200 text-xs pr-3",
                }}
              />
            </div>
            <div class="mr-4">
              <div class="text-editorText mb-2">
                Limit
                <span class="text-xs"> (default 10, max X )</span>
              </div>
              <BaseInput
                value={this.selectedDatabase}
                onChange={this.selectDatabase}
                extraOpts={{
                  type: "number",
                  placeholder: "Sort",
                  fixedClasses: "w-200 text-xs pr-3",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OtherOptions;
