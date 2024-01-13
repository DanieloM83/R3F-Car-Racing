import "./assets/global.css";

import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
import React from "react";
import Scene from "./components/Scene";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Canvas>
      <Scene />
    </Canvas>
  </React.StrictMode>
);
