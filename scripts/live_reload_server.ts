import {
  Application,
  Router,
  ServerSentEvent,
  ServerSentEventTarget,
} from "../deps.ts";

let sseTargets = new Set<ServerSentEventTarget>();
function reload(): void {
  const targets = sseTargets;
  if (targets.size > 0) {
    console.log("live reload: reload triggered");
    sseTargets = new Set();
    for (const target of targets) {
      target.dispatchEvent(new ServerSentEvent("reload", null));
    }
  }
}

(async () => {
  const watcher = Deno.watchFs("public");
  for await (const event of watcher) {
    console.log("live reload:", event);
    reload();
  }
})();

const app = new Application();
const router = new Router()
  .use(async ({ request }, next) => {
    console.log("live reload:", request.method, request.url.href);
    await next();
  })
  .post("/live-reload/trigger", () => {
    reload();
  })
  .get("/live-reload/sse", (context) => {
    const target = context.sendEvents({
      headers: new Headers({
        "Access-Control-Allow-Origin": "http://localhost:8000",
      }),
      keepAlive: true,
    });
    target.addEventListener("close", () => {
      sseTargets.delete(target);
    });
    sseTargets.add(target);
    target.dispatchMessage("waiting");
  });

app.use(router.routes(), router.allowedMethods());

app.addEventListener("error", ({ error }) => {
  console.error("Uncaught error", error);
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname}:${port}`,
  );
});

await app.listen({ hostname: "localhost", port: 8001 });
