import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import useWheels from "./useWheels";
import useControls from "./useControls";

const Car = () => {
  // children: [CarBody, WheelRF, WheelLF, WheelLB, WheelRB]
  const result = useLoader(GLTFLoader, "models/car.glb").scene;

  const position = [-10, 3, -3];
  const rotation = [0, Math.PI / 2, 0];
  const width = 1.2;
  const height = 0.7;
  const length = 2.8;
  const wheelRadius = 0.2;

  const chassisBodyArgs = [width, height, length];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      rotation,
      position,
    }),
    useRef(null)
  );

  const [wheels, wheelInfos] = useWheels(width, height, length, wheelRadius);

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null)
  );

  useControls(vehicleApi, chassisApi);

  return (
    <group ref={vehicle} name="vehicle">
      <group ref={chassisBody} name="chassisBody">
        <primitive object={result} rotation-y={-Math.PI / 2} position={[0, -0.15, 0]} />
      </group>
    </group>
  );
};

export default Car;
