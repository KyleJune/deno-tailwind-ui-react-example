/** @jsx React.createElement */

import {
  BrowserRouter,
  DehydratedState,
  HelmetProvider,
  Hydrate,
  QueryClientProvider,
  React,
  ReactDOM,
} from "./deps.ts";
import { createQueryClient } from "./query.ts";
import { App } from "./app.tsx";

interface AppWindow extends Window {
  __REACT_QUERY_STATE__?: DehydratedState;
}
const dehydratedState = (window as AppWindow).__REACT_QUERY_STATE__;
const queryClient = createQueryClient();

const BrowserApp = () => (
  <HelmetProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <App />
        </Hydrate>
      </QueryClientProvider>
    </BrowserRouter>
  </HelmetProvider>
);

ReactDOM.hydrate(<BrowserApp />, document.getElementById("app"));
