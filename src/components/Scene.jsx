import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

const Scene = () => {
  return (
    <Suspense fallback={null}>
      <Environment files="textures/envmap.hdr" background={"both"} />
      <PerspectiveCamera makeDefault position={[3, 3, 3]} fov={40} />
      <OrbitControls target={[0, 0, 0]} />
    </Suspense>
  );
};

export default Scene;
