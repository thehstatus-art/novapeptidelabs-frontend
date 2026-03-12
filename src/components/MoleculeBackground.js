import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function MoleculeBackground() {

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "transparent" },

        particles: {
          number: { value: 40 },
          size: { value: 3 },

          color: { value: "#6ec1ff" },

          links: {
            enable: true,
            distance: 120,
            color: "#6ec1ff",
            opacity: 0.3
          },

          move: {
            enable: true,
            speed: 0.4
          }
        }
      }}
    />
  );
}