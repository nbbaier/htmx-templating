import type { FC } from "hono/jsx";

export const Table: FC = (props) => {
  const headers = props.headers as string[];
  const rows = props.rows as string[][];
  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((header) => {
              return <th>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <tr>
                {row.map((cell) => {
                  return <td>{cell}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

`{ imports: { "@codemirror/": "https://deno.land/x/codemirror_esm@v6.0.1/esm/" }, };`;
