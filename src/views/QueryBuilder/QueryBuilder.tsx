import { Component, Prop } from "vue-property-decorator";
import Vue, { VNode } from "vue";

import Layout2 from "@/components/layouts/column-layout";
import { LeftPanel } from "./layout-panels/left/LeftPanel";
import { CenterPanel } from "./layout-panels/center/CenterPanel";
import { RightPanel } from "./layout-panels/right/RightPanel";

import QueryEditor from "./query-editor/QueryEditor";
import OtherOptions from "./other-options/OtherOptions";
import ResultPreview from "./result-preview/ResultPreview";

import "./QueryBuilder.css";
import { CONNECTION_HANDLER_TYPE } from "@/types/connection";
import { Collections, Collection } from "@/types/database";

type DatabaseId = string;
type CollectionId = string;

@Component({ name: "QueryBuilder" })
class QueryBuilder extends Vue {
  @Prop({
    type: Object,
    required: true,
    default: () => ({}),
  })
  private readonly connectionHandler!: CONNECTION_HANDLER_TYPE;

  readonly $refs!: {
    queryEditor: QueryEditor;
    otherOptions: OtherOptions;
    resultPreview: ResultPreview;
  };

  get databases(): string[] {
    return this.connectionHandler?.getDatabaseNames;
  }

  async populateCollections(db: string): Promise<string[]> {
    const collections: Collections =
      await this.connectionHandler.getCollections(db);
    return collections.map((c: Collection) => c.name || "");
  }

  private selectedDatabase: DatabaseId = "";
  handleSelectDatabase(database: DatabaseId): void {
    this.selectedDatabase = database;
  }

  private selectedCollection: CollectionId = "";
  handleCollectionSelect(collection: CollectionId): void {
    this.selectedCollection = collection;
  }

  private isCountEnabled = false;
  private documentCount = -1;

  handleAccordionItem([db, collection]: [string, string]) {
    this.handleSelectDatabase(db);
    this.handleCollectionSelect(collection);
  }

  private runQuery() {
    this.documentCount = -1;
    const query = {
      db: this.selectedDatabase,
      collection: this.selectedCollection,
      query: {
        query: this.$refs.queryEditor.getQuery(),
        ...this.$refs.otherOptions.getOtherOptions(),
        count: this.isCountEnabled,
      },
    };
    console.log("firing this query", query);
    this.connectionHandler.query(query).then((res) => {
      console.log("Inside QueryBuilder", res);
      if (typeof res === "object") this.$refs.resultPreview?.showResults(res);
      else if (typeof res === "number") this.documentCount = res;
    });
  }

  render(): VNode {
    return (
      <Layout2>
        <template slot="left">
          <LeftPanel
            databases={this.databases}
            populateCollections={this.populateCollections}
            selectedDatabase={this.selectedDatabase}
            onSelectDbAndCollection={this.handleAccordionItem}
          />
        </template>
        <template slot="center">
          <CenterPanel
            selectedDatabase={this.selectedDatabase}
            selectedCollection={this.selectedCollection}
            countEnabled={this.isCountEnabled}
            onToggleCount={(e: boolean) => (this.isCountEnabled = e)}
            onRunQuery={this.runQuery}
          >
            <template slot="queryEditorSlot">
              <QueryEditor
                ref="queryEditor"
                internalClass="w-full bg-secondary py-3 px-6"
              />
            </template>
            <template slot="otherOptionsSlot">
              <OtherOptions ref="otherOptions" />
            </template>
          </CenterPanel>
        </template>
        <template slot="right">
          <RightPanel
            isCountEnabled={this.isCountEnabled}
            resultPreviewHandler={this.$refs.resultPreview}
          >
            <template slot="resultPreviewSlot">
              <ResultPreview
                ref="resultPreview"
                documentCount={this.documentCount}
              />
            </template>
          </RightPanel>
        </template>
      </Layout2>
    );
  }
}

export default QueryBuilder;
