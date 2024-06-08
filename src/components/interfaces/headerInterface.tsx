
import logo from '../../images/logo-rod.png';
import HeaderMenuInterface from './headerMenuInterface';
import { SidenavMenuInterface } from './sidenavMenuInterface';

export default function HeaderInterface() {

  return (
    <div className="max-h-[10vh] flex justify-between items-center px-4 fixed w-full border-b-2 border-bluePrimary text-bluePrimary bg-gray-100 z-10">
      <SidenavMenuInterface/>
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-20 mr-2" />
      </div>
      <HeaderMenuInterface/>
      <div>
        <button className='w-20'>Descargar</button>
      </div>
    </div>
  );
}