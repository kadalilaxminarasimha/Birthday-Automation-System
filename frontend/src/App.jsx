import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import AddMember from "./pages/AddMember.jsx";
import Members from "./pages/Members.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/members" element={<Members />} />
      </Routes>
    </div>
  );
}
