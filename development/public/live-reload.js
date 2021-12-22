const source = new EventSource("http://localhost:8001/live-reload/sse");
source.addEventListener("open", () => {
  console.log("live reload: waiting for change");
});
source.addEventListener("error", () => {
  console.log("live reload: error");
});
source.addEventListener("reload", () => {
  console.log("live reload: reload");
  source.close();
  location.reload();
});
