import Vue, { VNode } from "vue";
import { Component } from "vue-property-decorator";
import JSONEditor, { SelectionPosition } from "jsoneditor";

import "jsoneditor/dist/jsoneditor.min.css";

@Component({ name: "QueryPreview" })
class QueryPreview extends Vue {
  mongoResult: JSONEditor | null = null;
  selectedText = "";

  readonly $refs!: {
    resultPreview: HTMLDivElement;
  };

  mounted(): void {
    this.mongoResult = new JSONEditor(this.$refs.resultPreview, {
      mode: "code",
      mainMenuBar: false,
      statusBar: false,
      onTextSelectionChange: this.handleResultTextSelection,
      onEditable: () => false, // read-only
    });
  }

  handleResultTextSelection(
    start: SelectionPosition,
    end: SelectionPosition,
    text: string
  ) {
    this.selectedText = text;
  }

  // handleCopyResults() {
  //   const copiedJson: string =
  //     this.selectedText || (this.mongoResult?.getText() as string);
  //   this.copyTextToClipboard(copiedJson);
  // }

  copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
      console.error("Async: Could not copy text.");
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => console.log("Async: Copying to clipboard was successful!"),
      (err) => console.error("Async: Could not copy text: ", err)
    );
  }

  render(): VNode {
    return (
      <div class="h-full py-3 px-3 flex flex-col">
        <p class="mx-2 text-sm font-semibold">Results</p>
        <div class="h-full flex-1" ref="resultPreview"></div>
      </div>
    );
  }
}

export { QueryPreview };
