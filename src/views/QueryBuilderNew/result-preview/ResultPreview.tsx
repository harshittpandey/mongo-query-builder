import { Component } from "vue-property-decorator";
import Vue, { VNode } from "vue";

import JSONEditor from "jsoneditor";

import "./ResultPreview.css";

@Component({ name: "ResultPreview" })
class ResultPreview extends Vue {
  resultHandler: JSONEditor | null = null;

  readonly $refs!: {
    resultPreview: HTMLDivElement;
  };

  private integrateJSONEditor(): void {
    this.resultHandler = new JSONEditor(this.$refs.resultPreview, {
      mode: "code",
      mainMenuBar: false,
      statusBar: false,
      navigationBar: false,
      onEditable: () => false, // read-only
    });
  }

  mounted(): void {
    this.integrateJSONEditor();
  }

  render(): VNode {
    return <div class="w-full" id="resultPreview" ref="resultPreview"></div>;
  }
}

export default ResultPreview;
