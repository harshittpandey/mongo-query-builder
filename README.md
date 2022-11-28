[![npm version](https://badge.fury.io/js/@harshittpandey%2Fmongodb-query-builder.svg)](https://badge.fury.io/js/@harshittpandey%2Fmongodb-query-builder)
# mongodb-query-builder

## Getting started

Install mongodb-query-builder
```
npm install --save @harshittpandey/mongodb-query-builder
```
Import mongodb-query-builder in your App
```
import MongoQueryBuilder from "@harshittpandey/mongodb-query-builder"
components: {
   MongoQueryBuilder
}
```
### Props
```javascript
active: { // toggles the mongodb-query-builder (in fullscreen mode)
  type: Boolean
  default: true
}

connection: { // selects a connection strategy
  type: String,
  allowed_values: "API" or "DIRECT"
}
/*
"API" - expects connectionEndpoints.
"DIRECT" - WIP
*/

connectionEndpoints: {
  type: Object,
  allowed_values: ["getDatabaseList", "getCollections", "getSampleDocument", "getQueryResults"]
}
/*
getDatabaseList - async method that returns list of databases
getCollections(databaseName) - async method that returns list of collections for databaseName
getSampleDocument(databaseName, collectionName) - WIP
getQueryResults(databaseName, collectionName, query) - returns results for query(mongo-query)
*/

```
![mongodb-query-builder](https://github.com/harshittpandey/mongo-query-builder/blob/master/image.png)
