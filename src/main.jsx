import "./assets/global.css";

import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
import React from "react";
import Scene from "./components/Scene";
import { Physics } from "@react-three/cannon";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Canvas>
      <Physics broadphase="SAP" gravity={[0, -2.1, 0]}>
        <Scene />
      </Physics>
    </Canvas>
  </React.StrictMode>
);
