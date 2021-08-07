import { React, Route, Switch } from "./deps.ts";
import { Navigation } from "./navigation.tsx";

export const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/users">
        <Users />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </div>
);

export const Home = () => (
  <h2>Home</h2>
);

export const About = () => (
  <h2>About</h2>
);

export const Users = () => (
  <h2>Users</h2>
);
