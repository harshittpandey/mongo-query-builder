export interface DatabaseItemSecondary {
  id: string;
  name?: string;
}

export type DatabaseItemPrimitive = string;
// TODO: sort out this
export type DatabaseItems = DatabaseItemPrimitive[] | DatabaseItemSecondary[]; // API expecting these types

export type InternalDatabaseItems = DatabaseItemSecondary[]; // internally maintained types

export interface Collection {
  id: string;
  name?: string;
}

export type Collections = Collection[];

export interface QueryParams {
  db: string;
  collection: string;
  query: object;
}
