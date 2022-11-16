import { Component, Prop } from "vue-property-decorator";
import Vue, { VNode } from "vue";

import JSONEditor from "jsoneditor";

import "./ResultPreview.css";

@Component({ name: "ResultPreview" })
class ResultPreview extends Vue {
  resultHandler: JSONEditor | null = null;

  readonly $refs!: {
    resultPreview: HTMLDivElement;
  };

  @Prop({
    type: Number,
    default: -1,
  })
  private readonly documentCount!: number;

  private integrateJSONEditor(): void {
    this.resultHandler = new JSONEditor(this.$refs.resultPreview, {
      mode: "code",
      mainMenuBar: false,
      statusBar: false,
      navigationBar: false,
      onEditable: () => false, // read-only
    });
  }

  showResults(result: object = {}) {
    if (this.documentCount === -1) {
      this.resultHandler?.set(result);
    }
  }

  getResultsInText(): string {
    return this.resultHandler?.getText() || "";
  }

  mounted(): void {
    this.integrateJSONEditor();
  }

  render(): VNode {
    const countUI = (
      <div class="w-full h-5/6 flex items-center justify-center text-6xl font-bold text-editorText font-roboto">
        {this.documentCount}
      </div>
    );
    const jsonUI = (
      <div class="w-full" id="resultPreview" ref="resultPreview"></div>
    );
    return this.documentCount === -1 ? jsonUI : countUI;
  }
}

export default ResultPreview;
