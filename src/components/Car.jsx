import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";

const Car = () => {
  const result = useLoader(GLTFLoader, "models/car.glb").scene;

  useEffect(() => {
    result.children[0].position.set(-12, 2, -2.9);
  }, [result]);

  return <primitive object={result}></primitive>;
};

export default Car;
