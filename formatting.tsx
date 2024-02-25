import { Hono } from "hono";
import { Layout } from "./Layout";
import { jsxRenderer } from "hono/jsx-renderer";

export const app = new Hono();

app.get(
  "*",
  jsxRenderer(
    // @ts-ignore
    ({ children, title, style }) => {
      return <Layout children={children} title={title} style={style} />;
    },
    { docType: true }
  )
);
app.get("/", async (c) => {
  console.log(JSON.stringify({ foo: "bar", baz: ["boom"] }, null, 2));
  return c.render(
    <table>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
      </tr>
      <tr>
        <td>Row 1, Column 1</td>
        <td>
          <pre language="json">
            <code class="language-json">
              {JSON.stringify({ foo: "bar", baz: ["boom"] }, null, 2)}
            </code>
          </pre>
        </td>
      </tr>
      <tr>
        <td>Row 2, Column 1</td>
        <td>Row 2, Column 2</td>
      </tr>
      <tr>
        <td>Row 3, Column 1</td>
        <td>Row 3, Column 2</td>
      </tr>
    </table>,
    { title: "SQLite Studio", style: "body {color: red;}" }
  );
});

Bun.serve({ fetch: app.fetch });
console.log("Server started at http://localhost:3000");
