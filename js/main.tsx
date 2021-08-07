import { BrowserRouter, React, ReactDOM } from "./deps.ts";
import { App } from "./app.tsx";

const BrowserApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<BrowserApp />, document.querySelector("#main"));
});
