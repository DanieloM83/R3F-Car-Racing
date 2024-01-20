import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { useRef, memo } from "react";
import { useCylinder } from "@react-three/cannon";

const BarrelContent = () => {
  const group1 = [];

  let y = 1;
  for (let x = 15; x <= 18; x++) {
    for (let z = -6; z >= -9; z--) {
      group1.push([x, y, z]);
      y += 0.1;
    }
  }

  return (
    <>
      {group1.map((pos, index) => (
        <Barrel key={index} position={pos} />
      ))}
    </>
  );
};

const Barrel = ({ position, rotation }) => {
  const result = useLoader(GLTFLoader, "models/barrel.glb").scene.clone();

  const radius = 0.35;
  const height = 0.7;

  const [barrelRef] = useCylinder(
    () => ({
      allowSleep: false,
      args: [radius, radius, height, 16],
      mass: 10,
      rotation,
      position,
    }),
    useRef(null)
  );

  return (
    <group ref={barrelRef}>
      <primitive object={result} />
    </group>
  );
};

export default memo(BarrelContent);
