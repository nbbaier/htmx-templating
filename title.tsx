import { createClient } from "@libsql/client";
import { Hono } from "hono";
import { Layout } from "./Layout";
import { jsxRenderer } from "hono/jsx-renderer";
import { Table } from "./Table";
declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props: { title: string }): Response;
  }
}

const app = new Hono();

app.get(
  "/page/*",
  jsxRenderer(({ children, title }) => {
    return (
      <html>
        <head>
          <title>{title}</title>
        </head>
        <body>
          <header>Menu</header>
          <div>{children}</div>
        </body>
      </html>
    );
  })
);

app.get("/page/favorites", (c) => {
  return c.render(
    <div>
      <ul>
        <li>Eating sushi</li>
        <li>Watching baseball games</li>
      </ul>
    </div>,
    {
      title: "My favorites",
    }
  );
});

Bun.serve({ fetch: app.fetch });
console.log("Server started at http://localhost:3000");
