import { React, Route, Routes } from "./deps.ts";
import { Navigation } from "./navigation.tsx";

export const App = () => (
  <>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>App</title>
      <style id="__twind_base" />
      <style id="__twind" />
    </head>
    <body>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <script type="module" src="https://cdn.esm.sh/twind@0.16.16/shim" />
      <script type="module" src="/main.js" />
    </body>
  </>
);

export const Home = () => <h2>Home</h2>;

export const About = () => <h2>About</h2>;

export const Users = () => <h2>Users</h2>;

export const NotFound = () => <h2>Not found</h2>;
