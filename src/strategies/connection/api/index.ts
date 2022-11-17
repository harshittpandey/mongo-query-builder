import {
  Collections,
  DatabaseItems,
  DatabaseItemSecondary,
  InternalDatabaseItems,
  QueryParams,
} from "@/types/database";
export enum ENDPOINTS_ENUM {
  GET_DATATYPE_LIST = "getDatabaseList",
  GET_COLLECTIONS = "getCollections",
  GET_SAMPLE_DOCUMENT = "getSampleDocument",
  GET_QUERY_RESULTS = "getQueryResults",
}

export type ENDPOINTS_TYPE = Record<ENDPOINTS_ENUM, FETCH_RESPONSE_HANDLER> &
  object;

type FETCH_RESPONSE_HANDLER = () => Promise<object>;

class APIConnectionStrategy {
  private endpoints: ENDPOINTS_TYPE = {
    [ENDPOINTS_ENUM.GET_DATATYPE_LIST]: () => Promise.resolve({}),
    [ENDPOINTS_ENUM.GET_COLLECTIONS]: () => Promise.resolve({}),
    [ENDPOINTS_ENUM.GET_SAMPLE_DOCUMENT]: () => Promise.resolve({}),
    [ENDPOINTS_ENUM.GET_QUERY_RESULTS]: () => Promise.resolve({}),
  };
  private databaseList: InternalDatabaseItems = [];

  constructor(endpoints: ENDPOINTS_TYPE) {
    this.resetEndpoints();
    this.updateEndpoints(endpoints);

    this.triggerAllEndpoints(); // should be at the end always
  }

  private resetEndpoints(): void {
    this.endpoints = {
      [ENDPOINTS_ENUM.GET_DATATYPE_LIST]: () => Promise.resolve({}),
      [ENDPOINTS_ENUM.GET_COLLECTIONS]: () => Promise.resolve({}),
      [ENDPOINTS_ENUM.GET_SAMPLE_DOCUMENT]: () => Promise.resolve({}),
      [ENDPOINTS_ENUM.GET_QUERY_RESULTS]: () => Promise.resolve({}),
    };
  }

  private isValidEndpoint(endpoint: string) {
    return Object.keys(ENDPOINTS_ENUM).includes(endpoint);
  }

  private updateEndpoints(
    endpoints: Record<ENDPOINTS_ENUM, FETCH_RESPONSE_HANDLER>
  ): void {
    Object.entries(endpoints).forEach(([epEnum, epHandler]) => {
      this.endpoints[epEnum as ENDPOINTS_ENUM] = epHandler;
      // if (this.isValidEndpoint(epEnum)) {
      // }
    });
  }

  private async triggerAllEndpoints(): Promise<void> {
    const promises: Promise<object>[] = [];
    if (this.endpoints.getDatabaseList) {
      promises.push(this.endpoints.getDatabaseList());
    }
    Promise.all(promises).then(([databaseList]) => {
      this.setDatabaseList((databaseList as DatabaseItems) || []);
    });
  }

  private async triggerEndpoint(
    endpoint: ENDPOINTS_ENUM,
    ...args: any[]
  ): Promise<object> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.endpoints[endpoint]) throw new Error("Invalid Endpoint");
        this.endpoints[endpoint](...(args as [])).then((res) => resolve(res));
      } catch (err) {
        reject(err);
      }
    });
  }

  get getDatabaseNames(): string[] {
    return this.databaseList.map((dbItem) => dbItem.name || "");
  }

  private setDatabaseList(databaseItems: DatabaseItems): void {
    const _databaseItems: InternalDatabaseItems = (databaseItems || []).map(
      (db) => {
        if (typeof db === "string")
          return { id: db, name: db } as DatabaseItemSecondary;
        else return db as DatabaseItemSecondary;
      }
    );
    this.databaseList = _databaseItems;
  }

  async getCollections(database: string) {
    const selectedDB = this.databaseList.find((db) => db.id === database);
    if (selectedDB) {
      const collections: object = await this.triggerEndpoint(
        ENDPOINTS_ENUM.GET_COLLECTIONS,
        selectedDB.id
      );
      return collections as Collections;
    }
    return [];
  }

  async query(q: QueryParams) {
    const selectedDB = this.databaseList.find((db) => db.id === q.db);
    if (selectedDB) {
      const queryResults = await this.triggerEndpoint(
        ENDPOINTS_ENUM.GET_QUERY_RESULTS,
        q
      );
      return queryResults;
    }
    return {};
  }
}

export { APIConnectionStrategy };
