/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

import {
  ErrorBoundary,
  Helmet,
  React,
  Route,
  Routes,
  useQueryErrorResetBoundary,
} from "./deps.ts";
import { ErrorFallback } from "./error.tsx";
import { Navigation } from "./navigation.tsx";
import { PostDirectory, PostView } from "./post.tsx";

export const App = () => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <div id="app">
      <Helmet defaultTitle="App" titleTemplate="App - %s">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Navigation />
      <ErrorBoundary
        onReset={reset}
        FallbackComponent={ErrorFallback}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts" element={<PostDirectory />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

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

export const NotFound = () => (
  <>
    <Helmet>
      <title>Not Found</title>
    </Helmet>
    <h2>Not found</h2>
  </>
);
