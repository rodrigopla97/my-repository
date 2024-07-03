import bye from '../../images/bye.png';
import { useTheme } from '../../context/themeContext';

export default function FooterInterface() {
  const { textColor, isDarkMode } = useTheme();

  return (
    <div className={`flex flex-col items-center justify-between w-screen h-screen ${textColor} font-semibold overflow-y-auto py-20 px-[5vh] md:px-8`}>
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-full md:w-1/3 h-full">
          <p className="text-center">Adios</p>
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/3 h-full">
          {/* <p className="text-center">Adios</p> */}
          <img src={bye} alt="bye" className="w-auto animate-tilt text-center" />
          {/* <img src={sign} alt="sign" className="w-auto" /> */}
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/3 h-full"></div>
      </div>
      <div className="text-center mt-4 md:mt-0">
        <div className='flex flex-row space-x-2 justify-evenly mb-2'>
          <div>
            <svg fill={isDarkMode ? "#BABABA" : "#000000"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
              <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z" />
            </svg>
          </div>
          <div>
            <svg fill={isDarkMode ? "#BABABA" : "#000000"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
              <path d="M 5 3 C 3.895 3 3 3.895 3 5 L 3 19 C 3 20.105 3.895 21 5 21 L 19 21 C 20.105 21 21 20.105 21 19 L 21 5 C 21 3.895 20.105 3 19 3 L 5 3 z M 5 5 L 19 5 L 19 19 L 5 19 L 5 5 z M 7.7792969 6.3164062 C 6.9222969 6.3164062 6.4082031 6.8315781 6.4082031 7.5175781 C 6.4082031 8.2035781 6.9223594 8.7167969 7.6933594 8.7167969 C 8.5503594 8.7167969 9.0644531 8.2035781 9.0644531 7.5175781 C 9.0644531 6.8315781 8.5502969 6.3164062 7.7792969 6.3164062 z M 6.4765625 10 L 6.4765625 17 L 9 17 L 9 10 L 6.4765625 10 z M 11.082031 10 L 11.082031 17 L 13.605469 17 L 13.605469 13.173828 C 13.605469 12.034828 14.418109 11.871094 14.662109 11.871094 C 14.906109 11.871094 15.558594 12.115828 15.558594 13.173828 L 15.558594 17 L 18 17 L 18 13.173828 C 18 10.976828 17.023734 10 15.802734 10 C 14.581734 10 13.930469 10.406562 13.605469 10.976562 L 13.605469 10 L 11.082031 10 z" />
            </svg>
          </div>
        </div>
        <p className="h-2">Rodrigo Placeres 2024 &#40;⌐■_■&#41;</p>
      </div>
    </div>
  );
}
