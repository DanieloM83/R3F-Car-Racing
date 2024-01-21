import { useEffect } from "react";
import { useState } from "react";
import { Vector3 } from "three";

const useControls = (vehicleApi, chassisApi) => {
  // KeyW, KeyA, KeyS, KeyD, LeftShift, Space, KeyR
  let [controls, setControls] = useState({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      setControls((controls) => ({ ...controls, [event.code]: true }));
    };
    const handleKeyUp = (event) => {
      setControls((controls) => ({ ...controls, [event.code]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!vehicleApi || !chassisApi) return;

    const engineForce = controls.ShiftLeft ? 275 : 150;
    const frontSteering = 0.5;
    const backSteering = 0.1;

    if (controls.KeyW) {
      vehicleApi.applyEngineForce(-engineForce, 2);
      vehicleApi.applyEngineForce(-engineForce, 3);
    } else if (controls.KeyS) {
      vehicleApi.applyEngineForce(engineForce, 2);
      vehicleApi.applyEngineForce(engineForce, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.Space) {
      vehicleApi.setBrake(5, 0);
      vehicleApi.setBrake(5, 1);
      vehicleApi.setBrake(5, 2);
      vehicleApi.setBrake(5, 3);
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setBrake(0, i);
      }
    }

    if (controls.KeyA) {
      vehicleApi.setSteeringValue(frontSteering, 0);
      vehicleApi.setSteeringValue(frontSteering, 1);
      vehicleApi.setSteeringValue(-backSteering, 2);
      vehicleApi.setSteeringValue(-backSteering, 3);
    } else if (controls.KeyD) {
      vehicleApi.setSteeringValue(-frontSteering, 0);
      vehicleApi.setSteeringValue(-frontSteering, 1);
      vehicleApi.setSteeringValue(backSteering, 2);
      vehicleApi.setSteeringValue(backSteering, 3);
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    if (controls.KeyR) {
      chassisApi.position.set(-10, 1, -3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, Math.PI / 2, 0);
    }

    if (controls.ArrowRight) chassisApi.applyLocalImpulse([-0.6, -6, 0], [-0.6, 0, 0]);
    if (controls.ArrowDown) chassisApi.applyLocalImpulse([0, -6, -1.4], [0, 0, -1.4]);
    if (controls.ArrowLeft) chassisApi.applyLocalImpulse([0.6, -6, 0], [0.6, 0, 0]);
    if (controls.ArrowUp) chassisApi.applyLocalImpulse([0, -6, 1.4], [0, 0, 1.4]);
  });
};

export default useControls;
