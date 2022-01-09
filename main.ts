import { Application } from "./deps.ts";
import { isDevelopment } from "./config.ts";
import { mainRouter } from "./routes/main.ts";
import { AppState } from "./utils/oak.ts";

const app = new Application<AppState>();

app.use(mainRouter.routes(), mainRouter.allowedMethods());

app.addEventListener("error", ({ error }) => {
  console.error("Uncaught error", error);
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  const origin = `${secure ? "https://" : "http://"}${hostname}`;
  console.log(`Listening on: ${origin}:${port}`);
  if (isDevelopment()) {
    fetch(`${origin}:8001/live-reload/trigger`, { method: "post" })
      .catch((error) => {
        console.log("could not trigger live reload");
        console.error(error);
      });
  }
});

await app.listen({ hostname: "localhost", port: 8000 });
