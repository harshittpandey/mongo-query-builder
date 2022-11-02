import Component from "vue-class-component";
import Vue, { VNode } from "vue";

import Layout2 from "@/components/layouts/column-layout";
import Accordion from "@/components/lib-ui/Accordion/Accordion";

import QueryEditor from "./query-editor/QueryEditor";
import OtherOptions from "./other-options/OtherOptions";
import ResultPreview from "./result-preview/ResultPreview";

import "./QueryBuilder.css";

type DatabaseId = string;
type CollectionId = string;

@Component({ name: "QueryBuilder" })
class QueryBuilder extends Vue {
  get databases(): string[] {
    return [
      "db1",
      "db2",
      "db3",
      "db4",
      "db5",
      "db6",
      "db7",
      "db8",
      "db9",
      "db10",
    ];
  }

  async fetchCollections(db: string): Promise<string[]> {
    const collections = [
      db + ":collection1",
      db + ":collection2",
      db + ":collection3",
    ];
    return collections;
  }

  private selectedDatabase: DatabaseId = "";
  handleSelectDatabase(database: DatabaseId): void {
    this.selectedDatabase = database;
  }

  private selectedCollection: CollectionId = "";
  handleCollectionSelect(collection: CollectionId): void {
    this.selectedCollection = collection;
  }

  handleAccordionItem([db, collection]: [string, string]) {
    this.handleSelectDatabase(db);
    this.handleCollectionSelect(collection);
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
              fetchItems={() => this.fetchCollections(db)}
              onSelectItem={(collection: string) =>
                this.handleAccordionItem([db, collection])
              }
            />
          ))}
        </template>
        <template slot="center">
          <div class="w-full h-4/6">
            <div class="editor-toolbar relative flex space-between h-12">
              <div class="query-tab py-3 px-6 border-r-1 border-primary bg-secondary">
                Query
              </div>
              <div class="query-actions w-full flex items-center justify-end relative bg-primary border-b-1 border-primary">
                {/* dark theme */}
                {/* <button class="editor-btn mr-4">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="svg-view-stroke"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.6669 9.5834C15.3427 13.0914 12.345 15.7416 8.82376 15.6334C5.30247 15.5252 2.47318 12.696 2.36498 9.17467C2.25679 5.65338 4.90703 2.65573 8.41503 2.33154C6.88938 4.39558 7.10337 7.26521 8.9183 9.08013C10.7332 10.8951 13.6028 11.1091 15.6669 9.5834Z"
                      stroke-opacity="0.87"
                      stroke-width="1.77778"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </button> */}
                <button class="text-primaryButton bg-secondaryBorder rounded-sm text-sm font-medium cursor-pointer px-3 py-1 mr-6">
                  Run Query
                </button>
              </div>
            </div>
            <QueryEditor internalClass="w-full bg-secondary py-3 px-6" />
          </div>
          <div class="w-full h-2/6 overflow-scroll">
            <OtherOptions />
          </div>
        </template>
        <template slot="right">
          <div class="editor-toolbar relative flex space-between items-center h-12 border-b-1 border-primary">
            <div class="px-6">Result</div>
          </div>
          <ResultPreview />
        </template>
      </Layout2>
    );
  }
}

export default QueryBuilder;
