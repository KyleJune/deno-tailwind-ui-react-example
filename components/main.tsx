/** @jsx React.createElement */

import { BrowserRouter, React, ReactDOM } from "./deps.ts";
import { App } from "./app.tsx";

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app"),
);
