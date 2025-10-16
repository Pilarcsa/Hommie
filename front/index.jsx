import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="container">
      <button onClick={() => setDarkMode(!darkMode)} style={{ marginBottom: "1rem" }}>
        Cambiar a {darkMode ? "modo claro" : "modo oscuro"}
      </button>

      <div className="card">
        <h1>Bienvenido</h1>
        <h2>Este es un ejemplo simple</h2>
        <p>
          Este diseño usa solo <strong>CSS puro</strong> y React.
          Puedes alternar el modo oscuro con el botón superior.
        </p>
        <input type="text" placeholder="Escribe algo..." />
        <button>Enviar</button>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
