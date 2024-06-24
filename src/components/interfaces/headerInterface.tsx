import HeaderMenuInterface from './headerMenuInterface';
import { SidenavMenuInterface } from './sidenavMenuInterface';
import logo from '../../images/logo-blanco.png';

export default function HeaderInterface() {

  return (
    <div className="max-h-[10vh] flex justify-between items-center px-4 fixed w-full border-b-2 border-grayPrimary text-grayPrimary bg-bluePrimary z-20">
      <SidenavMenuInterface/>
      <div className="flex items-center justify-center w-20 h-20">
        {/* <span>&#40;⌐■_■&#41;</span> */}
        <img src={logo} alt="Logo" className="" />
      </div>
      <HeaderMenuInterface/>
      <div className="flex items-center justify-center w-20 h-20">
        <button className="flex items-center hover:border hover:border-grayPrimary p-2 sm:px-4 rounded">
          <i className="material-icons-outlined">file_download</i>
          <span className="ml-2">CV</span>
        </button>
      </div>
    </div>
  );
}
