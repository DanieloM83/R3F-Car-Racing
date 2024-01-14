import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";

const Barrel = () => {
  const result = useLoader(GLTFLoader, "models/barrel.glb").scene;

  useEffect(() => {
    result.position.set(15, 1, -7);
  }, [result]);

  return <primitive object={result}></primitive>;
};

export default Barrel;
