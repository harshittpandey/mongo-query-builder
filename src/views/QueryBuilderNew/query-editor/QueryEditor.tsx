import { Component } from "vue-property-decorator";
import Vue, { VNode } from "vue";

import JSONEditor from "jsoneditor";

import "./QueryEditor.css";

@Component({ name: "QueryEditor" })
class QueryEditor extends Vue {
  queryBuilder: JSONEditor | null = null;

  readonly $refs!: {
    queryEditor: HTMLDivElement;
  };

  private integrateJSONEditor(): void {
    this.queryBuilder = new JSONEditor(this.$refs.queryEditor, {
      mode: "code",
      mainMenuBar: false,
      statusBar: false,
      navigationBar: false,
      onChangeText: (json) => {
        if (json === "") this.queryBuilder?.set({});
      },
    });
  }

  mounted(): void {
    this.integrateJSONEditor();
  }

  render(): VNode {
    return (
      <div
        class="w-full bg-secondary py-3 px-6"
        id="queryEditor"
        ref="queryEditor"
      ></div>
    );
  }
}

export default QueryEditor;
