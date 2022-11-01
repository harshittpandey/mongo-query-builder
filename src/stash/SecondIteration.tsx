import Component from "vue-class-component";
import Vue, { VNode } from "vue";

import Layout2 from "@/components/layouts/column-layout";
import Accordion from "@/components/lib-ui/Accordion/Accordion";

type DatabaseId = string;
type CollectionId = string;

@Component({ name: "SecondIteration" })
class SecondIteration extends Vue {
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
          <div class="editor-toolbar relative flex space-between">
            <div class="query-tab py-3 px-6 border-r-1 border-primary bg-secondary">
              Query
            </div>
            <div class="query-actions w-full flex items-center justify-end relative bg-primary border-b-1 border-primary">
              <button class="text-primaryButton bg-secondaryBorder rounded-sm text-sm font-medium cursor-pointer px-1 py-1 mr-6">
                Run Query
              </button>
            </div>
          </div>
        </template>
      </Layout2>
    );
  }
}

export default SecondIteration;
