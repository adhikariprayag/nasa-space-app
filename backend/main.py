from flask import Flask, request, jsonify
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)  # Allow frontend (React) requests

@app.route('/')
def home():
    return jsonify({"message": "Backend is running!"})

@app.route('/simulate', methods=['POST'])
def simulate():
    try:
        data = request.get_json()
        mass = float(data.get('mass', 0))
        velocity = float(data.get('velocity', 0))

        if mass <= 0 or velocity <= 0:
            return jsonify({"error": "Mass and velocity must be positive numbers"}), 400

        # --- Basic physics calculations ---
        # Impact energy (Joules)
        impact_energy = 0.5 * mass * velocity**2

        # Crater diameter estimation (simplified scaling law)
        crater_diameter = (impact_energy ** 0.25) / 100  # meters

        # Damage radius (in km, simplified)
        damage_radius = crater_diameter / 2000  # just a scaled estimate

        # Return rounded & formatted results
        result = {
            "impact_energy": f"{impact_energy:,.2f}",
            "crater_diameter": f"{crater_diameter:,.2f}",
            "damage_radius": f"{damage_radius:,.2f}"
        }

        return jsonify(result)

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Simulation failed"}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5001)
