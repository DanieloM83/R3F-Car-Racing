import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { MeshReflectorMaterial } from "@react-three/drei";
import { TextureLoader } from "three";

const Ground = () => {
  const alphaMap = useLoader(TextureLoader, "textures/ground_alpha.png");
  const aoMap = useLoader(TextureLoader, "textures/ground_ao.png");

  const gridMap = useLoader(TextureLoader, "textures/grid.png");

  const gridRef = useRef(null);
  const groundRef = useRef(null);

  useEffect(() => {
    if (!gridMap) return;

    gridMap.anisotropy = 16;
  }, [gridMap]);

  return (
    <>
      <mesh position={[0, -0.005, 0]} rotation-x={-Math.PI / 2} ref={gridRef}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial opacity={0.325} alphaMap={gridMap} transparent={true} color={"white"} />
      </mesh>
      <mesh position={[0, -0.01, 0]} rotation-x={-Math.PI / 2} ref={groundRef}>
        <circleGeometry args={[40, 40]} />
        <MeshReflectorMaterial
          alphaMap={alphaMap}
          aoMap={aoMap}
          transparent={true}
          color={[0.5, 0.5, 0.5]}
          envMapIntensity={0.35}
          metalness={0.05}
          roughness={0.4}
          dithering={true}
          blur={[1024, 512]} // Blur ground reflections (width, heigt), 0 skips blur
          mixBlur={3} // How much blur mixes with surface roughness (default = 1)
          mixStrength={30} // Strength of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [bl
          debug={0}
          reflectorOffset={0.02} // Offsets the virtual camera that projects the reflection. Useful when the reflective
        ></MeshReflectorMaterial>
      </mesh>
    </>
  );
};

export default Ground;
