/** @jsx React.createElement */

import {
  getStyleTag,
  renderToString,
  StaticRouter,
  typography,
  virtualSheet,
} from "../deps.ts";
import { isDevelopment } from "../utils/environment.ts";
import { App } from "./app.tsx";
import {
  FilledContext,
  HelmetData,
  HelmetProvider,
  React,
  twind,
} from "./deps.ts";
import { TwindContext } from "./twind.tsx";

const twindPlugins = { ...typography() };

export interface HTMLProps {
  helmet: HelmetData;
}

export const HTML = (props: HTMLProps) => {
  const { helmet } = props;
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();
  return (
    <html {...htmlAttrs}>
      <head>
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.priority.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        <style id="__twind" />
        {helmet.style.toComponent()}
        {isDevelopment() ? <script src="/live-reload.js" /> : null}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
      </head>
      <body {...bodyAttrs}>
        <div id="app" />
        <script type="module" src="https://cdn.esm.sh/twind@0.16.16/shim" />
        <script type="module" src="/main.js" />
      </body>
    </html>
  );
};

export interface ServerAppProps {
  helmetContext: Record<never, never>;
  twindContext: twind.Instance;
  location: string;
}

const ServerApp = (props: ServerAppProps) => (
  <HelmetProvider context={props.helmetContext}>
    <TwindContext.Provider value={props.twindContext}>
      <StaticRouter location={props.location}>
        <App />
      </StaticRouter>
    </TwindContext.Provider>
  </HelmetProvider>
);

/** Renders the application on the server. */
export function ssr(location: string) {
  const helmetContext = {};
  const sheet = virtualSheet();
  const twindContext = twind.create({
    sheet,
    plugins: twindPlugins,
  });
  const renderedApp = renderToString(
    <ServerApp
      helmetContext={helmetContext}
      twindContext={twindContext}
      location={location}
    />,
  );
  const { helmet } = helmetContext as FilledContext;
  const renderedHTML = `<!DOCTYPE html>${
    renderToString(<HTML helmet={helmet} />)
  }`;
  return renderedHTML
    .replace('<style id="__twind"></style>', getStyleTag(sheet))
    .replace('<div id="app"></div>', renderedApp);
}
