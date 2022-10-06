// use pinia
import { DatabaseItems } from "@/types/database";
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
  private databaseList: DatabaseItems = [];

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
      if (this.isValidEndpoint(epEnum)) {
        this.endpoints[epEnum as ENDPOINTS_ENUM] = epHandler;
      }
    });
  }

  private async triggerAllEndpoints(): Promise<void> {
    const promises: Promise<object>[] = [];
    Object.values(this.endpoints).forEach((endpoint) => {
      promises.push(endpoint());
    });
    Promise.all(promises).then(
      ([databaseList, collectionsList, sampleDocument, queryResults]) => {
        this.setDatabaseList((databaseList as DatabaseItems) || []);
      }
    );
  }

  private triggerEndpoint(endpoint: ENDPOINTS_ENUM): object {
    return {};
  }

  private setDatabaseList(databaseList: DatabaseItems): void {
    this.databaseList = databaseList.map((db) => ({
      id: db.id,
      name: db.name,
    }));
  }
}

export { APIConnectionStrategy };
