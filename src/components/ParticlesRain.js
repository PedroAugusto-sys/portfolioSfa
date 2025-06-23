import React from 'react';
import Particles from 'react-tsparticles';

const ParticlesRain = () => (
  <Particles
    id="rain-tsparticles"
    options={{
      fullScreen: { enable: false },
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: '#fffbe6' },
        opacity: { value: 0.13 },
        size: { value: 2, random: { enable: true, minimumValue: 1 } },
        move: {
          enable: true,
          speed: 12,
          direction: 'bottom',
          straight: true,
          outModes: { default: 'out' },
        },
        shape: { type: 'line' },
        stroke: { width: 1, color: '#fffbe6' },
      },
      detectRetina: true,
      style: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 12, pointerEvents: 'none' },
    }}
  />
);

export default ParticlesRain; 