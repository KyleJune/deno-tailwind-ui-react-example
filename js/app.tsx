import { React, Route, Routes } from "./deps.ts";
import { Navigation } from "./navigation.tsx";

export const App = () => (
  <div>
    <Navigation />
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/users" element={<Users />} />
      <Route path="/" element={<Home />} />
    </Routes>
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
