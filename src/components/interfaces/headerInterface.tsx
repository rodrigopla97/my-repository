import HeaderMenuInterface from './headerMenuInterface';
import { SidenavMenuInterface } from './sidenavMenuInterface';

export default function HeaderInterface() {

  return (
    <div className="max-h-[10vh] flex justify-between items-center px-4 fixed w-full border-b-2 border-gray-100 text-gray-100 bg-bluePrimary z-10">
      <SidenavMenuInterface/>
      <div className="flex items-center justify-center w-20 h-20 mr-2">
        <span>&#40;⌐■_■&#41;</span>
      </div>
      <HeaderMenuInterface/>
      <div className="flex items-center justify-center w-20 h-20">
        <button className="flex items-center hover:border hover:border-gray-100 p-2 sm:px-4 rounded">
          <i className="material-icons-outlined">file_download</i>
          <span className="ml-2">CV</span>
        </button>
      </div>
    </div>
  );
}
