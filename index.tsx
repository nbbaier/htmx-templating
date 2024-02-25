import { createClient } from "@libsql/client";
import { Hono } from "hono";
import { Layout } from "./Layout";
import { jsxRenderer } from "hono/jsx-renderer";
import { Table } from "./Table";

export const app = new Hono();

const config = {
  url: "file:local.db",
};
const db = createClient(config);

app.get(
  "*",
  jsxRenderer(
    ({ children, title }) => {
      return <Layout children={children} title={title} />;
    },
    { docType: true }
  )
);

app.get("/", async (c) => {
  let data = await db.execute(`
  SELECT
       name
   FROM
       sqlite_schema
   WHERE
       type ='table' AND
       name NOT LIKE 'sqlite_%';`);
  let tables = data.rows;
  return c.render(
    <div className="flow-gap">
      <h1>SQLite Studio</h1>
      <h2>Tables</h2>
      <ul>
        {tables.map((t) => (
          <li>
            <a href={`/table/${t.name}`}>{t.name}</a>
          </li>
        ))}
      </ul>
    </div>,
    { title: "SQLite Studio" }
  );
});

app.get("/table/:table", (c) => {
  const table = c.req.param("table");
  return c.render(
    <div class="flow-gap">
      <h1>{table}</h1>
      <form hx-target="#table" hx-post="/query">
        <textarea name="query" rows={4} cols={50}>
          {`SELECT * FROM ${table}`}
        </textarea>
        <button type="submit">Run</button>
      </form>
      <div id="table"></div>
    </div>,
    { title: table }
  );
});

app.post("/query", async (c) => {
  const query = (await c.req.parseBody()).query as string;
  console.log(query);
  const rs = await db.execute(query);
  const headers = rs.columns;
  const rows = rs.rows.map((column) => {
    let rowData = [];
    for (const header of headers) {
      rowData.push(column[header]);
    }
    return rowData;
  });
  return c.render(<Table headers={headers} rows={rows}></Table>, {
    title: "Query Results",
  });
});

Bun.serve({ fetch: app.fetch });
console.log("Server started at http://localhost:3000");
