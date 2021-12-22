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
import { Helmet, React, setup } from "./deps.ts";

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

export interface ServerProps {
  location: string;
}

export const Server = (props: ServerProps) => {
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();
  return (
    <html {...htmlAttrs}>
      <head>
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        <style id="__twind" />
        {helmet.style.toComponent()}
        {isDevelopment() ? <script src="/live-reload.js" /> : null}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
      </head>
      <body {...bodyAttrs}>
        <StaticRouter location={props.location}>
          <App />
        </StaticRouter>
        <script type="module" src="https://cdn.esm.sh/twind@0.16.16/shim" />
        <script type="module" src="/main.js" />
      </body>
    </html>
  );
};

/** Renders the application on the server. */
export function ssr(location: string) {
  const sheet = getSheet();
  const html = `<!DOCTYPE html>${
    renderToString(<Server location={location} />)
  }`;
  return html.replace('<style id="__twind"></style>', getStyleTag(sheet));
}
