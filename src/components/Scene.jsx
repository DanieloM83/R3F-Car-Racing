import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Debug } from "@react-three/cannon";
import { Suspense } from "react";
import Barrel from "./Barrel";
import Car from "./Car";
import Ground from "./Ground";
import Track from "./Track";

const debug = false;

const Scene = () => {
  const sceneContent = (
    <Suspense fallback={null}>
      <Environment files="textures/envmap.hdr" background={"both"} />
      <PerspectiveCamera makeDefault position={[-21, 34, 55]} fov={40} />
      <OrbitControls target={[0, 0, 0]} />

      <Ground />
      <Track />
      <Car />
      <Barrel />
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
