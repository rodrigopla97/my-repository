import { useTheme } from '../../context/themeContext';

export default function LoadingInterface() {

  const { isDarkMode, bgColor } = useTheme();

  return (
    <div className={`flex items-center justify-center h-screen ${bgColor}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 200 200" 
        className="w-20 h-20"
      >
        <circle fill={isDarkMode ? "#BABABA" : "#000000"} stroke={isDarkMode ? "#BABABA" : "#000000"} strokeWidth="15" r="15" cx="40" cy="100">
          <animate 
            attributeName="opacity" 
            calcMode="spline" 
            dur="2s" 
            values="1;0;1;" 
            keySplines=".5 0 .5 1;.5 0 .5 1" 
            repeatCount="indefinite" 
            begin="-.4s"
          ></animate>
        </circle>
        <circle fill={isDarkMode ? "#BABABA" : "#000000"} stroke={isDarkMode ? "#BABABA" : "#000000"} strokeWidth="15" r="15" cx="100" cy="100">
          <animate 
            attributeName="opacity" 
            calcMode="spline" 
            dur="2s" 
            values="1;0;1;" 
            keySplines=".5 0 .5 1;.5 0 .5 1" 
            repeatCount="indefinite" 
            begin="-.2s"
          ></animate>
        </circle>
        <circle fill={isDarkMode ? "#BABABA" : "#000000"} stroke={isDarkMode ? "#BABABA" : "#000000"} strokeWidth="15" r="15" cx="160" cy="100">
          <animate 
            attributeName="opacity" 
            calcMode="spline" 
            dur="2s" 
            values="1;0;1;" 
            keySplines=".5 0 .5 1;.5 0 .5 1" 
            repeatCount="indefinite" 
            begin="0s"
          ></animate>
        </circle>
      </svg>
    </div>
  );
}
