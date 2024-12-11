import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-particles";

const ParticlesBackground = () => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                particles: {
                    color: {
                        value: "#BA68C8",
                    },
                    links: {
                        color: "#9C27B0",
                        distance: 150,
                        enable: true,
                        opacity: 0.3,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 1.5,
                    },
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            area: 800,
                        },
                    },
                    opacity: {
                        value: 0.5,
                    },
                    size: {
                        value: { min: 1, max: 3 },
                    },
                },
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
            }}
        />
    );
};

export default ParticlesBackground; 