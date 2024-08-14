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

        <div className="flex flex-row md:flex-col items-center justify-center w-full md:w-1/3 h-full">

          {/* github icon */}
          <a href="https://github.com/rodrigopla97" target="_blank" rel="noopener noreferrer" title="https://github.com/rodrigopla97" className={`flex flex-row items-center md:w-[40%] hover:cursor-pointer hover:font-bold ${isDarkMode ? "hover:text-cvButtonSecondary" : "hover:text-cvButtonPrimary"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64px" height="64px" baseProfile="basic"><circle cx="32" cy="32" r="23" fill="#30363D" /><ellipse cx="32" cy="61" opacity=".3" fill={isDarkMode ? "#fff" : "#111"} rx="19" ry="3" /><path fill="#fff" d="M32,14c2.577,0,4.674-1.957,4.946-4.461C35.352,9.19,33.699,9,32,9	C19.297,9,9,19.297,9,32c0,1.699,0.19,3.352,0.539,4.946C12.044,36.674,14,34.577,14,32C14,22.075,22.075,14,32,14z" opacity=".3" /><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M15.047,23.427c1.878-3.699,4.932-6.705,8.666-8.522" /><path fill="#fff" d="M37.184,43.111c4.556-1.02,7.818-3.645,7.818-9.252c0-2.6-0.787-4.556-1.97-6.011	c-0.273-0.336-0.274-1.056-0.162-1.474c0.281-1.043,0.066-2.404-0.17-3.383c-0.177-0.73-0.94-1.156-1.662-0.949	c-1.707,0.491-3.115,1.466-4.138,2.136c-0.279,0.182-0.602,0.255-0.931,0.203c-1.244-0.197-2.581-0.282-3.964-0.302L32,24.113V24.08	c-1.383,0.02-2.72,0.105-3.964,0.302c-0.329,0.052-0.652-0.021-0.931-0.203c-1.023-0.669-2.431-1.644-4.138-2.136	c-0.721-0.208-1.485,0.219-1.662,0.949c-0.237,0.979-0.451,2.341-0.17,3.383c0.113,0.418,0.112,1.138-0.162,1.474	c-1.183,1.455-1.97,3.41-1.97,6.011c0,5.607,3.261,8.232,7.818,9.252c0.774,0.173,0.843,1.018,0.544,1.753	c-0.236,0.582-0.368,1.009-0.368,1.677v0.315c-0.168,0.046-0.342,0.087-0.53,0.111c-1.142,0.147-1.98,0-2.559-0.343	c-0.58-0.343-1.267-0.909-1.783-1.662c-0.435-0.635-1.375-2.003-3.596-1.949c-0.388-0.01-0.565,0.354-0.516,0.581	c0.044,0.2,0.22,0.516,0.924,0.773c0.706,0.259,1.169,0.788,1.556,1.411c0.431,0.695,0.693,2.143,2.196,3.218	c0.901,0.644,2.078,1.036,2.954,0.996c0.742-0.034,1.355,0.574,1.355,1.317l0.001,1.628c0,0.659-0.603,1.326-1.228,1.21	c1.854,0.624,4.129,0.813,6.229,0.84v-0.047l0.005,0.047c2.1-0.026,4.375-0.216,6.229-0.84c-0.625,0.115-1.228-0.552-1.228-1.21	l0.002-6.396c0-0.668-0.132-1.095-0.368-1.677C36.342,44.13,36.41,43.285,37.184,43.111z" /><path d="M54.461,27.054C51.956,27.326,50,29.423,50,32c0,9.925-8.075,18-18,18	c-2.577,0-4.674,1.957-4.946,4.461C28.648,54.81,30.301,55,32,55c12.703,0,23-10.297,23-23C55,30.301,54.81,28.648,54.461,27.054z" opacity=".15" /></svg>
            <div className={`hidden md:flex items-center`}>
              <span>GitHub</span>
              <i className="material-icons-outlined text-base ml-2">open_in_new</i>
            </div>
          </a>

          {/* linkedin icon */}
          <a href="https://www.linkedin.com/in/rodrigo-placeres/" target="_blank" rel="noopener noreferrer" title="https://www.linkedin.com/in/rodrigo-placeres/" className={`flex flex-row items-center md:w-[40%] hover:cursor-pointer ${isDarkMode ? "hover:text-cvButtonSecondary" : "hover:text-cvButtonPrimary"}`} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64px" height="64px" baseProfile="basic"><path fill="#126BC4" d="M54,20c0-5.523-4.477-10-10-10H32H20c-5.523,0-10,4.477-10,10v24.008c0,5.523,4.477,10,10,10h12h12	c5.523,0,10-4.477,10-10V20z" /><ellipse cx="32" cy="61" opacity=".3" rx="20" ry="3" fill={isDarkMode ? "#fff" : "#111"}/><path fill="#fff" d="M14.01,12H14c-2.24,1.69-3.75,4.29-3.97,7.25C10.01,19.49,10,19.75,10,20v12	c2.761,0,5-2.239,5-5v-7c0-0.108,0.003-0.221,0.017-0.38c0.102-1.375,0.778-2.65,1.862-3.525c0.048-0.033,0.095-0.068,0.142-0.103	C17.881,15.343,18.911,15,20,15h5c2.761,0,5-2.239,5-5H20C17.75,10,15.68,10.74,14.01,12z" opacity=".3" /><path d="M54,44V22c-2.761,0-5,2.238-5,5v17c0,2.757-2.243,5-5,5h-5c-2.761,0-5,2.238-5,5h10 C49.523,54,54,49.523,54,44z" opacity=".15" /><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M13.5,23.5V20c0-0.153,0.005-0.312,0.018-0.459c0.135-1.809,1.003-3.46,2.396-4.594l0.204-0.152" /><path fill="#fff" d="M19,26h4c0.552,0,1,0.448,1,1v18c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1V27	C18,26.448,18.448,26,19,26z" /><path fill="#fff" d="M20.982,24h-0.034C19.158,24,18,22.666,18,20.999C18,19.296,19.194,18,21.017,18	c1.825,0,2.95,1.296,2.983,2.999C24,22.664,22.842,24,20.982,24z" /><path fill="#fff" d="M41,46c-0.552,0-1-0.448-1-1v-9.615c0-2.564-1.429-4.314-3.724-4.314	c-1.751,0-2.699,1.181-3.158,2.322C32.95,33.8,33,34.93,33,35.5V45c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1V27	c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1v2c0.841-1.302,2.325-3.006,5.694-3.006c4.174,0,7.304,2.797,7.304,8.659L46,45	c0,0.552-0.448,1-1,1H41z" /></svg>
            <div className={`hidden md:flex items-center`}>
              <span>LinkedIn</span>
              <i className="material-icons-outlined text-base ml-2">open_in_new</i>
            </div>

          </a>

        </div>
      </div>
      <div className="text-center mt-4 md:mt-0">
        <p className="h-2">Rodrigo Placeres 2024 &#40;⌐■_■&#41;</p>
      </div>
    </div>
  );
}
