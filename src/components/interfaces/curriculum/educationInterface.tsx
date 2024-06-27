import React from 'react';

export default function LoadingInterface() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      <div className="animate-spin ease-linear rounded-full border-8 border-t-8 border-grayPrimary border-t-bluePrimary h-32 w-32 mb-4"></div>
    </div>
  );
}
