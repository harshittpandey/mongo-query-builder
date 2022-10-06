import { APIConnectionStrategy } from "@/strategies/connection/api";

export enum CONNECTION {
  API = "API",
  DIRECT = "DIRECT",
}

export type CONNECTION_TYPE = keyof typeof CONNECTION;

export type CONNECTION_HANDLER_TYPE = APIConnectionStrategy;
