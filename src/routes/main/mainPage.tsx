import React from 'react';
import CarrerasList from '../../components/interfaces/main/carrerListInterface';

const Main: React.FC = () => {
  return (
    
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl text-blue-500 mb-8">Esto es Main</h1>
      <CarrerasList />
    </div>
  );
};

export default Main;

