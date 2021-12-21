import { React, setup } from "./components/deps.ts";
import {
  getStyleTagProperties,
  renderToString,
  StaticRouter,
  typography,
  VirtualSheet,
  virtualSheet,
} from "./deps.ts";
import { App } from "./components/app.tsx";

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
export function getSheet(): VirtualSheet {
  const sheet = SHEET_SINGLETON ??
    (SHEET_SINGLETON = setupSheet());
  sheet.reset();
  return sheet;
}

const html = (content: string, sheet: VirtualSheet) => (`\
<!DOCTYPE html>
<html>${
  content.replace(
    '<style id="__twind_base"></style>',
    `<style id="__twind_base">${
      getStyleTagProperties(sheet).textContent
    }</style>`,
  )
}</html>
`);

export function ssr(location: string) {
  const sheet = getSheet();
  const content = renderToString(
    <StaticRouter location={location}>
      <App />
    </StaticRouter>,
  );
  return html(content, sheet);
}
