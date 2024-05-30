import React from 'react';

const carreras = [
  "Ingeniería en Sistemas de Información",
  "Ingeniería Electrónica",
  "Ingeniería Mecánica",
  "Ingeniería Civil",
  "Ingeniería Química",
  "Ingeniería Industrial"
];

const CarrerasList: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Carreras de UTN</h2>
      <select className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        {carreras.map((carrera, index) => (
          <option key={index} value={carrera}>
            {carrera}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CarrerasList;
