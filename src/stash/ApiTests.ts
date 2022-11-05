export async function getDatabaseList() {
  const result = await fetch("http://localhost:8000/list-databases");
  const dbs = result.json();
  return dbs;
}

export async function getCollections(db: string) {
  const result = await fetch("http://localhost:8000/list-collections/" + db);
  return result.json();
}

export async function getQueryResults({
  db,
  collection,
  query,
}: {
  db: string;
  collection: string;
  query: object;
}) {
  const result = await fetch(
    "http://localhost:8000/get-query-results/" + db + "/" + collection,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    }
  );
  return result.json();
}

export default {
  getDatabaseList: getDatabaseList,
  getCollections: getCollections,
  getQueryResults: getQueryResults,
  getSampleDocument: () => ({}),
};
