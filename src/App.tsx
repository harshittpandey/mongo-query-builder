// use Vite
import Vue, { VNode } from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import {
  CONNECTION_TYPE,
  CONNECTION,
  CONNECTION_HANDLER_TYPE,
} from "@/types/connection";
import {
  APIConnectionStrategy,
  ENDPOINTS_ENUM,
  ENDPOINTS_TYPE,
} from "@/strategies/connection/api";
import QueryBuilder from "./views/QueryBuilderNew/QueryBuilder";

import "./index.css";

@Component({ name: "MongoQueryBuilder" })
class App extends Vue {
  static readonly TOGGLE_ACTIVE_EVENT = "toggleActive";
  static readonly DEFAULT_VISIBILITY: boolean = true;
  @Prop({
    type: Boolean,
    default: App.DEFAULT_VISIBILITY,
  })
  private active!: boolean;
  private editorVisibile = App.DEFAULT_VISIBILITY;

  @Watch("active", { immediate: true })
  handleEditorVisibility(visible: boolean) {
    this.editorVisibile = visible;
  }

  private hideBuilder() {
    this.editorVisibile = false;
  }
  @Provide() hideBuilderHandler = this.hideBuilder;

  @Prop({
    type: String,
    validator: (connection: CONNECTION_TYPE) => {
      return Object.keys(CONNECTION).includes(connection);
    },
  })
  private connection!: CONNECTION_TYPE;

  @Prop({
    type: Object,
    validator: (endpoints: ENDPOINTS_TYPE) => {
      return Object.values(ENDPOINTS_ENUM).every(
        (ep) => typeof endpoints[ep] === "function"
      );
    },
  })
  private connectionEndpoints!: ENDPOINTS_TYPE;

  private connectionHandler: CONNECTION_HANDLER_TYPE =
    {} as CONNECTION_HANDLER_TYPE;

  get isBuilderVisible() {
    return (
      this.editorVisibile && Object.keys(this.connectionHandler).length > 0
    );
  }

  mounted() {
    if (this.connection === CONNECTION.API) {
      this.connectionHandler = new APIConnectionStrategy(
        this.connectionEndpoints || {}
      );
    }
  }

  render(): VNode {
    const modalView = (
      <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex w-full h-full">
            <div class="relative transform bg-white overflow-hidden shadow-xl transition-all w-full h-full">
              <QueryBuilder
                connectionHandler={this.connectionHandler}
                onToggleVisility={this.hideBuilder}
              />
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <div id="parent-app-mongodb-query-builder">
        {this.isBuilderVisible ? modalView : ""}
      </div>
    );
  }
}

export default App;
export { App };
