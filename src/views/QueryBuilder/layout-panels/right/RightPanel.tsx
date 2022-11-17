import { Component, Prop } from "vue-property-decorator";
import Vue, { VNode } from "vue";
import ResultPreview from "../../result-preview/ResultPreview";

import { CopyTextToClipboard } from "@/utils/CopyToClipboard";

@Component({ name: "RightPanel" })
class RightPanel extends Vue {
  static readonly COPY_RESULTS = "copyResults";
  static readonly RESULTS_LABEL = "Results";
  static readonly RESULTS_COPIED = "Results Copied!!";
  static readonly COPY_RESULTS_LABEL = "Copy Results";

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

  private copyResults(): void {
    this.textCopied = true;
    CopyTextToClipboard(this.resultPreviewHandler.getResultsInText());
    setTimeout(() => {
      this.textCopied = false;
    }, 2000);
  }

  render(): VNode {
    const defaultButtonStyles = "rounded-sm text-xs cursor-pointer px-2 py-1 ";
    const buttonStyles = this.textCopied
      ? defaultButtonStyles + "text-primaryButton bg-secondaryBorder"
      : defaultButtonStyles +
        "text-secondaryBorder bg-primary border-1 border-secondaryBorder";
    const buttonText = this.textCopied
      ? RightPanel.RESULTS_COPIED
      : RightPanel.COPY_RESULTS_LABEL;
    return (
      <div class="h-full">
        <div class="editor-toolbar relative flex justify-between items-center h-12 border-b-1 border-primary">
          <div class="px-6">{RightPanel.RESULTS_LABEL}</div>
          <div class="mr-4">
            {this.showCopyIcon && (
              <button class={buttonStyles} onClick={this.copyResults}>
                {buttonText}
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
