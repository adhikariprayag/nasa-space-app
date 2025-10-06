import React from "react";
import { Link } from "react-router-dom";

export default function References() {
  return (
    <div className="font-montserrat min-h-screen bg-gradient-to-b from-black via-[#0b0033] to-[#1a0033] text-white p-10">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">
        <h1 className="text-3xl font-bold text-[#00ffff] mb-6">🔗 References</h1>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-200">
          <li>
            <a
              href="https://ssd.jpl.nasa.gov/tools/sbdb_query.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00ffff] hover:underline"
            >
              NASA Small-Body Database Query Tool
            </a>
          </li>
          <li>
            <a
              href="https://neo.jpl.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00ffff] hover:underline"
            >
              NASA Near-Earth Object Program
            </a>
          </li>
          <li>
            <a
              href="https://impact.ese.ic.ac.uk/ImpactEarth/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00ffff] hover:underline"
            >
              Purdue University - Impact Earth Calculator
            </a>
          </li>
        </ul>

        <div className="mt-8">
          <Link
            to="/"
            className="text-[#00ffff] hover:text-white font-semibold underline"
          >
            ← Back to Simulator
          </Link>
        </div>
      </div>
    </div>
  );
}
