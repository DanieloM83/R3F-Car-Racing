import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

const Track = () => {
  const result = useLoader(GLTFLoader, "models/track.glb").scene;

  return <primitive object={result}></primitive>;
};

export default Track;
