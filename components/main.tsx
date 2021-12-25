/** @jsx React.createElement */

import { BrowserRouter, HelmetProvider, React, ReactDOM } from "./deps.ts";
import { App } from "./app.tsx";

const BrowserApp = () => (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

ReactDOM.hydrate(<BrowserApp />, document.getElementById("app"));
