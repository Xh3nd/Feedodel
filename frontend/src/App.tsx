import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Blog from "./pages/Blog/Blog";
import Contacts from "./pages/Contacts/Contacts";
import Feeds from "./pages/Feeds/Feeds";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/feeds" element={<Feeds />} />
    </Routes>
  );
}
