import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Market from "./pages/Market";
import Create from "./pages/Create";
import Contact from "./pages/Contact";

function App() {
  return (
    <EthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/create" element={<Create />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </EthProvider>
  );
}

export default App;
