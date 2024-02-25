import type { FC } from "hono/jsx";

declare module "hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props: { title: string; style: string }
    ): Response;
  }
}

export const Layout: FC = ({ children, title, style }) => {
  // console.log(title);
  return (
    <html>
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="https://unpkg.com/missing.css@1.1.1" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/missing.css@1.1.1/prism"
        />

        <link
          rel="stylesheet"
          href="https://unpkg.com/missing-prism.css@1.1.1"
        />
        <script src="https://unpkg.com/htmx.org@1.9.9/dist/htmx.min.js"></script>
        <style>
          {`
          form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 500px;
          }
          ${style}

        `}
        </style>
      </head>
      <body>
        <main class="flow-gap">{children}</main>
      </body>
    </html>
  );
};
