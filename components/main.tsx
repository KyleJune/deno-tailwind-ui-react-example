import { BrowserRouter, React, ReactDOM } from "./deps.ts";
import { App } from "./app.tsx";

const BrowserApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.hydrate(<BrowserApp />, document.documentElement);
