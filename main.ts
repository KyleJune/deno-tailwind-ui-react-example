import { extname, serve } from "./deps.ts";
import { ssr } from "./ssr.tsx";

console.log("Listening on http://localhost:8000");
await serve(async (req) => {
  const { pathname } = new URL(req.url);
  console.log(pathname);
  return pathname === "/main.js"
    ? new Response(
      await Deno.readTextFile("./public/main.js"),
      { headers: { "content-type": "application/javascript" } },
    )
    : !extname(pathname)
    ? new Response(
      ssr(pathname),
      { headers: { "content-type": "text/html" } },
    )
    : new Response(null, { status: 404 });
});
