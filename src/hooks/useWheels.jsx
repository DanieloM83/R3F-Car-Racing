import { useCompoundBody } from "@react-three/cannon";
import { useRef } from "react";

const useWheels = (width, height, length, radius) => {
  const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0],
    axleLocal: [1, 0, 0],
    suspensionStiffness: 60,
    suspensionRestLength: 0.1,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    maxSuspensionTravel: 0.1,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelInfos = [
    {
      // [0] Right front:
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.45, -height * 0.2, length * 0.31],
      isFrontWheel: true,
    },
    {
      // [1] Left front:
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.45, -height * 0.2, length * 0.31],
      isFrontWheel: true,
    },
    {
      // [2] Right back:
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.45, -height * 0.2, -length * 0.3],
      isFrontWheel: false,
    },
    {
      // [3] Left back:
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.45, -height * 0.2, -length * 0.3],
      isFrontWheel: false,
    },
  ];

  const propsFunc = () => ({
    collisionFilterGroup: 0,
    mass: 1,
    shapes: [
      {
        args: [wheelInfo.radius, wheelInfo.radius, 0.2, 16],
        rotation: [0, 0, -Math.PI / 2],
        type: "Cylinder",
      },
    ],
    type: "Kinematic",
  });

  useCompoundBody(propsFunc, wheels[0]);
  useCompoundBody(propsFunc, wheels[1]);
  useCompoundBody(propsFunc, wheels[2]);
  useCompoundBody(propsFunc, wheels[3]);

  return [wheels, wheelInfos];
};

export default useWheels;
