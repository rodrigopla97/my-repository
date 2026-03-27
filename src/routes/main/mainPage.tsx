import React from 'react';
import HomeInterface from '../../components/interfaces/main/homeInterface';
import ComingSoonInterface from '../../components/interfaces/main/comingSoonInterface';
import GitHubInterface from '../../components/interfaces/github/githubInterface';

// const texts = [
//   'Rodrigo Placeres',
//   'Desarrollador Front-End'
// ];

export default function MainPage() {


  return (
    // <div className={`flex flex-col justify-center h-screen w-screen ${textColor}`}>
    //   <BackgroundImageInterface />
    //   <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-center md:justify-between my-[15vh] md:mb-[5vh] h-full">
    //     <div className={`${textColor} max-md:text-lg md:text-2xl lg:text-5xl space-y-4 font-bold md:w-1/2 pl-[5vh] content-center md:pb-[10vh] z-10 items-center my-auto md:my-0`}>
    //       <h1 className="text-left font-orbitron">Hola! Soy</h1>
    //       <div className="typewriter">
    //         <h2 className={`font-orbitron ${isDeleting ? 'deleting' : 'typing'}`}>
    //           <span>{currentText || '\u00A0'}</span>
    //         </h2>
    //       </div>
    //     </div>

    //     <div className="w-full md:w-1/2 flex justify-center items-center mt-5 md:mt-0 z-10" style={{ backgroundImage: `url(${bgAvatarDesk})`, backgroundSize: '80%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
    //       <img src={desk} alt="Logo" className={`max-[820px]:h-[50vh] mt-0 md:h-[70vh] w-auto animate-float ${isDarkMode ? "drop-shadow-red" : "drop-shadow-white"}`} />
    //     </div>
    //   </div>
    // </div>
    <React.Fragment>
      <HomeInterface />
      <ComingSoonInterface />
    </React.Fragment>
  );
}
