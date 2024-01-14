import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import Barrel from "./Barrel";
import Car from "./Car";
import Ground from "./Ground";
import Track from "./Track";

const Scene = () => {
  return (
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
};

export default Scene;
