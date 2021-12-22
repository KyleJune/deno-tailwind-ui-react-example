const bundle = Deno.run({
  cmd: ["make", "bundle"],
  env: {
    "DENO_ARGS": "--watch",
  },
  stderr: "null",
  stdin: "null",
  stdout: "null",
});
const liveReload = Deno.run({
  cmd: [
    "deno",
    "run",
    "-A",
    "--watch",
    "--config=deno.json",
    "./scripts/live_reload_server.ts",
  ],
  stderr: "null",
  stdin: "null",
  stdout: "null",
});
const run = Deno.run({
  cmd: ["make", "run"],
  env: {
    "DENO_ARGS": "--watch",
  },
});
await Promise.all([bundle.status(), liveReload.status(), run.status()]);
