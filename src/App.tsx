// use Vite
import Vue, { VNode } from "vue";
import { Component, Prop } from "vue-property-decorator";
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
import { QueryBuilder } from "@/layouts/query-builder";

import "./index.css";

@Component({ name: "MongoQueryBuilder" })
class App extends Vue {
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

  get isConnectionHandlerActive() {
    return Object.keys(this.connectionHandler).length > 0;
  }

  mounted() {
    if (this.connection === CONNECTION.API) {
      this.connectionHandler = new APIConnectionStrategy(
        this.connectionEndpoints || {}
      );
    }
  }

  render(): VNode {
    return (
      <div id="app">
        {this.isConnectionHandlerActive && (
          <QueryBuilder connectionHandler={this.connectionHandler} />
        )}
      </div>
    );
  }
}

export default App;
export { App };
