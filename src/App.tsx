import React from 'react';
import CarrerasList from './components/interfaces/main/carrerListInterface';

const App: React.FC = () => {
  return (
    <>
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl text-blue-500 mb-8">Edit src/App.js and save to reload</h1>
      <CarrerasList />
    </div>
    </>
  );
};

export default App;

