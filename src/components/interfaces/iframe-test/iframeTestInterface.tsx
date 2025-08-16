


import React from 'react';
import laptopMockup from '../../../images/laptop-mockup.png'; // Asegurate que esta ruta exista y sea correcta

export default function LaptopFrame() {
  return (
    <div className="relative w-[800px] h-auto mx-auto mt-8">
      {/* Contenedor escalado */}
      <div
        className="absolute top-[70px] left-[104px] origin-top-left z-10"
        style={{
          transform: 'scale(0.75)',
          width: '100%',
          height: '100%',
        }}
      >
        <iframe
          src="https://moorea.io/"
          title="Iframe en laptop"
          className="w-full h-full border-none rounded-md"
        />
      </div>
      <img
        src={laptopMockup}
        alt="Laptop mockup"
        className="w-full h-auto pointer-events-none z-20 relative"
      />
    </div>
  );
}