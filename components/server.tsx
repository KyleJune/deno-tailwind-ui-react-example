/** @jsx React.createElement */

import {
  getStyleTag,
  renderToString,
  StaticRouter,
  typography,
  VirtualSheet,
  virtualSheet,
} from "../deps.ts";
import { isDevelopment } from "../utils/environment.ts";
import { App } from "./app.tsx";
import {
  FilledContext,
  HelmetData,
  HelmetProvider,
  React,
  setup,
} from "./deps.ts";

function setupSheet(): VirtualSheet {
  const sheet = virtualSheet();
  setup({
    sheet,
    theme: {},
    plugins: { ...typography() },
  });
  return sheet;
}

let SHEET_SINGLETON: VirtualSheet | null = null;
function getSheet(): VirtualSheet {
  const sheet = SHEET_SINGLETON ??
    (SHEET_SINGLETON = setupSheet());
  sheet.reset();
  return sheet;
}

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
  location: string;
}

const ServerApp = (props: ServerAppProps) => (
  <HelmetProvider context={props.helmetContext}>
    <StaticRouter location={props.location}>
      <App />
    </StaticRouter>
  </HelmetProvider>
);

/** Renders the application on the server. */
export function ssr(location: string) {
  const helmetContext = {};
  const sheet = getSheet();
  const renderedApp = renderToString(
    <ServerApp helmetContext={helmetContext} location={location} />,
  );
  const { helmet } = helmetContext as FilledContext;
  const renderedHTML = `<!DOCTYPE html>${
    renderToString(<HTML helmet={helmet} />)
  }`;
  return renderedHTML
    .replace('<style id="__twind"></style>', getStyleTag(sheet))
    .replace('<div id="app"></div>', renderedApp);
}
