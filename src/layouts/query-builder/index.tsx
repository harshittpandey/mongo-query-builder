import Vue, { VNode } from "vue";
import { Component } from "vue-property-decorator";
import { BasicLayout } from "@/components/layouts/basic-layout";
import { Button, MultiSelect, Toggle } from "@/components/lib-ui";
import { BUTTON_TYPE_ENUM } from "@/components/lib-ui/Button/Button";
import JSONEditor, { SelectionPosition } from "jsoneditor";

import "jsoneditor/dist/jsoneditor.min.css";

const DUMMY_DATA = [
  {
    name: "United States",
    capital: "Washington, D.C.",
    continent: "North America",
    language: "English",
    population: 328239523,
  },
  {
    name: "Ivory Coast",
    capital: "Abidjan",
    continent: "Africa",
    language: "French",
    population: 26378274,
  },
  {
    name: "France",
    capital: "Paris",
    continent: "Europe",
    language: "French",
    population: 67081000,
  },
  {
    name: "Australia",
    capital: "Canberra",
    continent: "Australia",
    language: "English",
    population: 25681300,
  },
  {
    name: "Japan",
    capital: "Tokyo",
    continent: "Asia",
    language: "Japanese",
    population: 125960000,
  },
  {
    name: "Brazil",
    capital: "Brasília",
    continent: "South America",
    language: "Portuguese",
    population: 210147125,
  },
];

@Component({ name: "QueryBuilder" })
class QueryBuilder extends Vue {
  editor: JSONEditor | null = null;
  mongoResult: JSONEditor | null = null;
  selectedText = "";

  readonly $refs!: {
    queryEditor: HTMLDivElement;
    resultPreview: HTMLDivElement;
  };

  private integrateJSONEditor(): void {
    console.log("Inside integrateJSONEditor");
    this.editor = new JSONEditor(this.$refs.queryEditor, {
      mode: "code",
      mainMenuBar: false,
      statusBar: false,
    });
  }

  mounted(): void {
    this.integrateJSONEditor();
    this.mongoResult = new JSONEditor(this.$refs.resultPreview, {
      mode: "code",
      mainMenuBar: false,
      statusBar: false,
      onTextSelectionChange: this.handleResultTextSelection,
      onEditable: () => false, // read-only
    });
  }

  fetchMongoResults(): void {
    console.log("Fetching mongo results for", this.editor?.get());
    this.mongoResult?.set(DUMMY_DATA);
  }

  handleResultTextSelection(
    start: SelectionPosition,
    end: SelectionPosition,
    text: string
  ) {
    this.selectedText = text;
  }

  handleCopyResults() {
    const copiedJson: string =
      this.selectedText || (this.mongoResult?.getText() as string);
    this.copyTextToClipboard(copiedJson);
  }

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

  private databases: string[] = ["first db", "second db"];
  private selectedDatabase = "";
  selectDatabase(database: string) {
    this.selectedDatabase = database;
  }

  private collections: string[] = ["first collection", "second collection"];
  private selectedCollection = "";
  selectCollection(collection: string) {
    this.selectedCollection = collection;
  }

  private projections: string[] = ["first projection", "second projection"];
  private selectedProjection = "";
  selectProjection(collection: string) {
    this.selectedCollection = collection;
  }

  private isCount = false;
  handleCountToggle(enable: boolean) {
    this.isCount = enable;
  }

  render(): VNode {
    return (
      <BasicLayout>
        <template slot="left">
          <div class="py-3 px-2 h-full">
            <div class="flex">
              <MultiSelect
                class="my-4"
                options={this.databases}
                option={this.selectedDatabase}
                onSelect={this.selectDatabase}
                extraOpts={{
                  placeholder: "Select Database",
                  fixedClasses: "w-200 text-xs",
                }}
              />
              <MultiSelect
                class="my-4 mx-4"
                options={this.collections}
                option={this.selectedCollection}
                onSelect={this.selectCollection}
                extraOpts={{
                  label: "Select Collection",
                  placeholder: "Select Collection",
                  fixedClasses: "w-200 text-xs",
                }}
              />
            </div>
            <p class="mx-2 text-sm font-semibold">Query</p>
            <div class="h-2/4" ref="queryEditor"></div>
            <div>
              <MultiSelect
                class="my-4"
                options={this.projections}
                option={this.selectedProjection}
                onSelect={this.selectProjection}
                extraOpts={{
                  label: "Select Projection",
                  placeholder: "Select Projection",
                  fixedClasses: "w-200 text-xs",
                }}
              />
            </div>
          </div>
        </template>
        <template slot="right">
          <div class="h-full py-3 px-3 flex flex-col">
            <div class="flex items-center justify-between">
              <p class="mx-2 text-sm font-semibold">Results</p>
              <Toggle
                label="Count"
                checked={this.isCount}
                onChange={this.handleCountToggle}
              />
            </div>
            <div class="h-full flex-1" ref="resultPreview"></div>
          </div>
        </template>
        <template slot="toolbar">
          <div class="flex flex-row justify-between">
            <Button onClick={this.fetchMongoResults}>Run query</Button>
            <Button
              type={BUTTON_TYPE_ENUM.SECONDARY}
              onClick={this.handleCopyResults}
            >
              Copy {this.selectedText ? "Selection" : "Results"}
            </Button>
          </div>
        </template>
      </BasicLayout>
    );
  }
}

export { QueryBuilder };
