import { useBox } from "@react-three/cannon";

const ColliderBox = ({ position, scale = [0.25, 4, 0.25], rotation }) => {
  useBox(() => ({
    args: scale,
    position,
    rotation,
    type: "Static",
  }));

  return <></>;
};

export default ColliderBox;
