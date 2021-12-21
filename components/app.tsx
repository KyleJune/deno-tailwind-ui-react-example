/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

import { Helmet, React, Route, Routes } from "./deps.ts";
import { Navigation } from "./navigation.tsx";

export const App = () => (
  <div id="app">
    <Helmet defaultTitle="App" titleTemplate="App - %s">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/users" element={<Users />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </div>
);

export const Home = () => (
  <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <h2>Home</h2>
  </>
);

export const About = () => (
  <>
    <Helmet>
      <title>About</title>
    </Helmet>
    <h2>About</h2>
  </>
);

export const Users = () => (
  <>
    <Helmet>
      <title>Users</title>
    </Helmet>
    <h2>Users</h2>
  </>
);

export const NotFound = () => (
  <>
    <Helmet>
      <title>Not Found</title>
    </Helmet>
    <h2>Not found</h2>
  </>
);
