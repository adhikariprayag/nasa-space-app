import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import References from "./References.js";

function Simulator() {
  const [mass, setMass] = useState("");
  const [velocity, setVelocity] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    if (!mass || !velocity) {
      alert("Please enter both mass and velocity!");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        "https://impact-simulator-backend.onrender.com/simulate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mass, velocity }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        alert(data.error || "Simulation failed");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to connect to backend. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-montserrat min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#0b0033] to-[#1a0033] text-white p-8">
      <div className="max-w-lg w-full text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6 text-[#00ffff] drop-shadow-lg">
          🌌 NASA Space Impact Simulator
        </h1>

        <div className="flex flex-col space-y-4">
          <input
            type="number"
            placeholder="Asteroid Mass (kg)"
            value={mass}
            onChange={(e) => setMass(e.target.value)}
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
          />
          <input
            type="number"
            placeholder="Velocity (m/s)"
            value={velocity}
            onChange={(e) => setVelocity(e.target.value)}
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
          />
          <button
            onClick={handleSimulate}
            className="mt-4 bg-[#00ffff] text-black font-bold py-2 px-4 rounded-lg hover:bg-[#00cccc] transition duration-200"
          >
            {loading ? "Simulating..." : "Simulate Impact"}
          </button>
        </div>

        {result && (
          <div className="mt-8 bg-black/40 p-6 rounded-xl border border-[#00ffff]/30 text-left">
            <h2 className="text-xl font-semibold mb-4 text-[#00ffff]">
              Simulation Results
            </h2>
            <p>💥 Impact Energy: {result.impact_energy} Joules</p>
            <p>🌍 Estimated Crater Diameter: {result.crater_diameter} meters</p>
            <p>🔥 Damage Radius: {result.damage_radius} km</p>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-md border-b border-white/10 flex justify-between items-center px-8 py-3">
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src="/EffortLogo.png" alt="Logo" className="w-20 h-20" />
          </Link>
        </div>

      </nav>

      {/* Page Routes */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Simulator />} />
          <Route path="/references" element={<References />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
