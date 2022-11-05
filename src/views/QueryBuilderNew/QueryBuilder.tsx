import { Component, Prop } from "vue-property-decorator";
import Vue, { VNode } from "vue";

import Layout2 from "@/components/layouts/column-layout";
import Accordion from "@/components/lib-ui/Accordion/Accordion";

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

  private isCountEnabled = true;
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
          {this.databases.map((db: string) => (
            <Accordion
              class="my-6 box-border border-b-1 border-primary text-xs"
              header={db}
              highlight={this.selectedDatabase === db}
              fetchItems={() => this.populateCollections(db)}
              onSelectItem={(collection: string) =>
                this.handleAccordionItem([db, collection])
              }
            />
          ))}
        </template>
        <template slot="center">
          <div class="w-full h-4/6">
            <div class="editor-toolbar relative flex justify-between h-12">
              <div class="query-tab py-3 px-6 border-r-1 border-primary bg-secondary">
                Query
              </div>
              <div class="query-actions w-full flex flex-grow items-center relative bg-primary border-b-1 border-primary">
                {(this.selectedDatabase || this.selectedCollection) && (
                  <div class="text-sm mx-4 text-primary font-medium font-roboto">
                    <span> {this.selectedDatabase} </span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="inline"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                        />
                      </svg>
                    </span>
                    <span> {this.selectedCollection} </span>
                  </div>
                )}
                <div class="flex-grow flex justify-end">
                  <button
                    class="text-primaryButton bg-secondaryBorder rounded-sm text-sm font-medium cursor-pointer px-3 py-1 mr-6"
                    onClick={this.runQuery}
                  >
                    Run Query
                  </button>
                </div>
              </div>
            </div>
            <QueryEditor
              ref="queryEditor"
              internalClass="w-full bg-secondary py-3 px-6"
            />
          </div>
          <div class="w-full h-2/6 overflow-scroll">
            <OtherOptions ref="otherOptions" />
          </div>
        </template>
        <template slot="right">
          <div class="editor-toolbar relative flex justify-between items-center h-12 border-b-1 border-primary">
            <div class="px-6">Result</div>
            <label
              for="default-toggle"
              class="inline-flex relative items-center cursor-pointer mx-6"
            >
              <input
                type="checkbox"
                value=""
                id="default-toggle"
                class="sr-only peer"
                v-model={this.isCountEnabled}
              />
              <div class="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondaryBorder"></div>
              <span class="ml-3 text-sm text-edtiorText">Count</span>
            </label>
          </div>
          <ResultPreview
            ref="resultPreview"
            documentCount={this.documentCount}
          />
        </template>
      </Layout2>
    );
  }
}

export default QueryBuilder;
