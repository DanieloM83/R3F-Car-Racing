import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Debug } from "@react-three/cannon";
import { Suspense, useEffect, useState, useRef } from "react";
import Car from "./Car";
import Ground from "./Ground";
import Track from "./Track";
import BarrelContent from "./Barrel";

const debug = false;

const Scene = () => {
  const [cameraView, setView] = useState(0);
  const [cameraPosition, setCameraPosition] = useState([-21, 34, 55]);

  useEffect(() => {
    function keydownHandler(event) {
      if (event.code == "KeyC") {
        if (cameraView == 3) {
          setView(0);
          return setCameraPosition([-21, 34, 55 + Math.random() * 0.01]);
        }
        setView(cameraView + 1);
      }
    }

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [cameraView]);

  const sceneContent = (
    <Suspense fallback={null}>
      <Environment files="textures/envmap.hdr" background={"both"} />
      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {!cameraView && <OrbitControls target={[0, 0, 0]} />}

      <Car cameraView={cameraView} />

      <Ground />
      <Track />
      <BarrelContent />
    </Suspense>
  );

  const sceneDebug = (
    <>
      <axesHelper args={[40, 40]} position={[0, 0.2, 0]} />
      <gridHelper args={[80, 80]} position={[0, 0.1, 0]} />
      <Debug>{sceneContent}</Debug>
    </>
  );

  return debug ? sceneDebug : sceneContent;
};

export default Scene;
