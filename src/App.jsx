import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Flights from "./pages/flights";
import AddFlights from "./pages/addFlights";
import Navbar from "./components/Navbar";
import "./App.css";
import SignUp from "./pages/signup";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Flights />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/add-flight" element={<AddFlights />} />
            <Route path="/update-flight/:id" element={<AddFlights />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;