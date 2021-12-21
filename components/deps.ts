// https://esm.sh/react@17.0.2?target=deno
import React from "../deps/react/index.ts";
// https://esm.sh/react-dom@17.0.2?target=deno
import ReactDOM from "../deps/react-dom/index.ts";

export { React, ReactDOM };

// https://esm.sh/react-router-dom@6.2.1?target=deno
export {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
} from "../deps/react-router-dom/index.ts";

export { setup, tw } from "https://esm.sh/twind@0.16.16";

export {
  Disclosure,
  Menu,
  Transition,
} from "https://esm.sh/@headlessui/react@1.4.2?target=deno&pin=v58&deps=react@17.0.2,react-dom@17.0.2";
export {
  BellIcon,
  MenuIcon,
  XIcon,
} from "https://esm.sh/@heroicons/react@1.0.5/outline?target=deno&pin=v58&deps=react@17.0.2,react-dom@17.0.2";
