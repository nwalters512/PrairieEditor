import * as express from "express";
import * as next from "next";
import { join } from "path";

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const getMonacoFilePath = (fileName: string) =>
  dev
    ? join(__dirname, "../.next/server", `/${fileName}`)
    : join(__dirname, "../server", `/${fileName}`);

app.prepare().then(() => {
  const server = express();
  const monacoFiles = [
    "editor.worker.js",
    "typescript.worker.js",
    "json.worker.js"
  ];
  monacoFiles.forEach(fileName => {
    server.use(`/${fileName}`, express.static(getMonacoFilePath(fileName)));
  });

  server.get("*", (req: express.Request, res: express.Response) => {
    return handle(req, res);
  });

  server.listen(port, (err: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
