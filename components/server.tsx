/** @jsx React.createElement */

import {
  Context,
  getStyleTag,
  renderToString,
  serialize,
  StaticRouter,
  typography,
  VirtualSheet,
  virtualSheet,
} from "../deps.ts";
import { isDevelopment } from "../config.ts";
import { App } from "./app.tsx";
import {
  dehydrate,
  DehydratedState,
  FilledContext,
  HelmetData,
  HelmetProvider,
  Hydrate,
  QueryClient,
  QueryClientProvider,
  React,
  twind,
} from "./deps.ts";
import { TwindContext } from "./twind.ts";
import { getQueryClient } from "../utils/oak.ts";

const twindPlugins = { ...typography() };

export interface HTMLOptions {
  helmet: HelmetData;
  sheet: VirtualSheet;
  dehydratedState: DehydratedState;
  renderedApp: string;
}

export const html = (options: HTMLOptions) => {
  const { helmet, sheet, renderedApp, dehydratedState } = options;
  const headTags = [
    helmet.base.toString(),
    helmet.title.toString(),
    helmet.priority.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    getStyleTag(sheet),
    helmet.style.toString(),
    isDevelopment() ? `<script src="/live-reload.js"></script>` : "",
    helmet.script.toString(),
    helmet.noscript.toString(),
  ].filter((tag: string) => Boolean(tag));
  const reactQueryState = serialize(dehydratedState, { isJSON: true });
  return `\
<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    ${headTags.join("\n    ")}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    ${renderedApp}
    <script type="module" src="https://cdn.esm.sh/twind@0.16.16/shim"></script>
    <script>
      window.__REACT_QUERY_STATE__ = ${reactQueryState};
    </script>
    <script type="module" src="/main.js"></script>
  </body>
</html>
`;
};

export interface ServerAppProps {
  helmetContext: Record<never, never>;
  twindContext: twind.Instance;
  location: string;
  queryClient: QueryClient;
  dehydratedState: DehydratedState;
}

const ServerApp = (props: ServerAppProps) => (
  <HelmetProvider context={props.helmetContext}>
    <TwindContext.Provider value={props.twindContext}>
      <StaticRouter location={props.location}>
        <QueryClientProvider client={props.queryClient}>
          <Hydrate state={props.dehydratedState}>
            <App />
          </Hydrate>
        </QueryClientProvider>
      </StaticRouter>
    </TwindContext.Provider>
  </HelmetProvider>
);

/** Renders the application on the server. */
export function ssr(context: Context) {
  const { request, response } = context;
  const { pathname, search } = request.url;
  const location = `${pathname}${search}`;
  const helmetContext = {};
  const sheet = virtualSheet();
  const twindContext = twind.create({
    sheet,
    plugins: twindPlugins,
  });
  const queryClient = getQueryClient(context);
  const dehydratedState = dehydrate(queryClient);
  const renderedApp = renderToString(
    <ServerApp
      helmetContext={helmetContext}
      twindContext={twindContext}
      location={location}
      queryClient={queryClient}
      dehydratedState={dehydratedState}
    />,
  );
  const { helmet } = helmetContext as FilledContext;
  return html({ helmet, sheet, renderedApp, dehydratedState });
}
