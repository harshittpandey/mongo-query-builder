import { Component, Prop } from "vue-property-decorator";
import { Accordion } from "@/components/lib-ui";
import Vue, { VNode } from "vue";

type COLLECTIONS_API = (db: string) => Promise<string[]>;

@Component({ name: "LeftPanel" })
class LeftPanel extends Vue {
  static readonly EVENT_SELECT_DB_AND_COLLECTION = "selectDbAndCollection";
  @Prop({
    type: Array,
    default: () => [],
  })
  private readonly databases!: string[];

  @Prop({
    type: String,
    default: "",
  })
  private readonly selectedDatabase!: string;

  @Prop({
    type: Function,
  })
  private readonly populateCollections!: COLLECTIONS_API;

  private handleAccordionItem([db, collection]: [string, string]) {
    this.$emit(LeftPanel.EVENT_SELECT_DB_AND_COLLECTION, [db, collection]);
  }

  render(): VNode {
    return (
      <div>
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
      </div>
    );
  }
}

export { LeftPanel };
