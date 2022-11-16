import { Component, Prop } from "vue-property-decorator";
import Vue, { VNode } from "vue";
import ResultPreview from "../../result-preview/ResultPreview";

import { CopyTextToClipboard } from "@/utils/CopyToClipboard";

@Component({ name: "RightPanel" })
class RightPanel extends Vue {
  static readonly COPY_RESULTS = "copyResults";

  @Prop({
    type: Boolean,
  })
  private readonly isCountEnabled!: boolean;

  @Prop({
    type: Object,
  })
  private readonly resultPreviewHandler!: ResultPreview;

  get showCopyIcon() {
    return !this.isCountEnabled;
  }

  private textCopied = false;

  private copyResults() {
    this.textCopied = true;
    CopyTextToClipboard(this.resultPreviewHandler.getResultsInText());
    setTimeout(() => {
      this.textCopied = false;
    }, 2000);
  }

  render(): VNode {
    return (
      <div class="h-full">
        <div class="editor-toolbar relative flex justify-between items-center h-12 border-b-1 border-primary">
          <div class="px-6">Result</div>
          <div class="mr-4">
            {this.showCopyIcon && (
              <button
                class={`rounded-sm text-xs cursor-pointer px-2 py-1 
                ${
                  this.textCopied
                    ? " text-primaryButton bg-secondaryBorder"
                    : " text-secondaryBorder bg-primary border-1 border-secondaryBorder"
                }`}
                onClick={this.copyResults}
              >
                {this.textCopied ? "Results Copied!!" : "Copy Results"}
              </button>
            )}
          </div>
        </div>
        {this.$slots.resultPreviewSlot}
      </div>
    );
  }
}

export { RightPanel };
