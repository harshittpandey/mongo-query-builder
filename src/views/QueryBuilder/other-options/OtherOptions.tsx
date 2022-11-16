import { Component } from "vue-property-decorator";
import Vue, { VNode } from "vue";

import { BaseInput } from "@/components/lib-ui";

type MONGO_FORMAT = Record<string, 1>;

// move to shared UTIL
function changeInMongoFormat(spaceSeaparatedStr: string): MONGO_FORMAT {
  const multiVals: string[] = spaceSeaparatedStr.split(",");
  return multiVals
    .filter(Boolean)
    .map((val: string) => val.trim())
    .reduce((obj: MONGO_FORMAT, next: string) => {
      return Object.assign(obj, { [next]: 1 });
    }, {});
}

@Component({ name: "OtherOptions" })
class OtherOptions extends Vue {
  static readonly DEFAULT_SKIP = -1;
  static readonly DEFAULT_LIMIT = 10;
  static readonly MAX_SKIP = 10000;
  static readonly MAX_LIMIT = 20;
  // projection
  private projection = "";
  private updateProjection(val: string): void {
    this.projection = val;
  }
  get formattedProjectionOutput(): MONGO_FORMAT {
    return changeInMongoFormat(this.projection);
  }

  // sort
  private sortKey = "";
  private updateSortKey(val: string): void {
    this.sortKey = val;
  }
  get formattedSortOutput(): MONGO_FORMAT {
    return changeInMongoFormat(this.sortKey);
  }

  // skip
  private skip: number = OtherOptions.DEFAULT_SKIP;
  private updateSkip(val: string): void {
    if (+val > OtherOptions.MAX_SKIP) {
      this.skip = OtherOptions.MAX_SKIP;
    } else if (+val > 0) {
      this.skip = +val;
    } else this.limit = OtherOptions.DEFAULT_SKIP;
  }

  // limit
  private limit: number = OtherOptions.DEFAULT_LIMIT;
  private updateLimit(val: string): void {
    if (+val > OtherOptions.MAX_LIMIT) {
      this.limit = OtherOptions.MAX_LIMIT;
    } else if (+val > 0) {
      this.limit = +val;
    } else this.limit = OtherOptions.DEFAULT_LIMIT;
  }

  getOtherOptions(): object {
    const returnObj = {
      projection: this.formattedProjectionOutput,
      sortKey: this.formattedSortOutput,
      limit: this.limit,
    };
    if (this.skip !== OtherOptions.DEFAULT_SKIP)
      Object.assign(returnObj, { skip: this.skip });
    return returnObj;
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
                value={this.projection}
                onChange={this.updateProjection}
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
                value={this.sortKey}
                onChange={this.updateSortKey}
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
                value={this.skip + ""}
                onChange={this.updateSkip}
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
                <span class="text-xs">
                  {" "}
                  (default 10, max {OtherOptions.MAX_LIMIT} )
                </span>
              </div>
              <BaseInput
                value={this.limit + ""}
                onChange={this.updateLimit}
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
