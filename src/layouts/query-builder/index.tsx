import Vue, { VNode } from "vue";
import { Component, Prop } from "vue-property-decorator";
import { BasicLayout } from "@/components/layouts/basic-layout";
import { Button, MultiSelect, Toggle } from "@/components/lib-ui";
import { BUTTON_TYPE_ENUM } from "@/components/lib-ui/Button/Button";
import JSONEditor, { SelectionPosition } from "jsoneditor";

import "jsoneditor/dist/jsoneditor.min.css";
import { CONNECTION_HANDLER_TYPE } from "@/types/connection";
import { Collections, DatabaseItems, Collection } from "@/types/database";

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

  @Prop({
    type: Object,
    required: true,
    default: () => ({}),
  })
  private readonly connectionHandler!: CONNECTION_HANDLER_TYPE;

  private integrateJSONEditor(): void {
    this.editor = new JSONEditor(this.$refs.queryEditor, {
      mode: "code",
      mainMenuBar: false,
      statusBar: false,
    });
  }

  fetchMongoResults(): void {
    console.group("Fetching mongo results for");
    console.log("query", this.editor?.get());
    console.log("selectDatabase", this.selectedDatabase);
    console.log("selectedCollection", this.selectedCollection);
    console.groupEnd();
    this.connectionHandler
      .query({
        db: this.selectedDatabase,
        collection: this.selectedCollection,
        query: {
          query: this.editor?.get(),
          count: false,
        },
      })
      .then((res) => {
        console.log("Inside QueryBuilder", res);
        if (typeof res === "object") this.mongoResult?.set(res);
      });
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

  // private databases: DatabaseItems = [];
  get databases(): string[] {
    return this.connectionHandler?.getDatabaseNames;
  }
  private selectedDatabase = "";
  selectDatabase(database: string) {
    this.selectedDatabase = database;
    this.populateCollections(database);
  }

  private collections: Collections = [];
  get collectionNames() {
    return this.collections.map((c) => c.name || "");
  }
  private populateCollections(database: string) {
    this.connectionHandler
      .getCollections(database)
      .then((collections: Collections) => {
        this.collections = collections;
      });
  }
  private selectedCollection = "";
  selectCollection(collection: string) {
    const _collection: Collection | undefined = this.collections.find(
      (c) => c.name === collection
    );
    if (_collection) this.selectedCollection = _collection.name || "";
  }

  private projections: string[] = ["first projection", "second projection"];
  private selectedProjection = "";
  handleProjectionSelect() {
    console.log("handleProjectionSelect", this.selectedProjection);
  }

  private isCount = false;
  handleCountToggle(enable: boolean) {
    this.isCount = enable;
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
                options={this.collectionNames}
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
                onSelect={this.handleProjectionSelect}
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
