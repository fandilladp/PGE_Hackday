import React from "react";
import { Link } from "react-router-dom";
import PeraminaLogo from "../assets/logo_pgeWHite.png";
import BmkgLogo from "../assets/Logo-BMKG.webp";

const MainLayout = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-[#5bbde7]">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <div className="flex flex-col p-4">{children}</div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full text-base-content flex flex-col gap-32 bg-white border-r">
          <div className="flex gap-3 py-10">
            <img
              src={PeraminaLogo}
              alt="Pertamina"
              className="object-contain w-52"
            />
            <img src={BmkgLogo} alt="BMKG" className="object-contain w-16" />
          </div>
          {/* <Link
            className={
              "border-l-2 border-black text-base uppercase text-black font-bold bg-white transition-all duration-500 hover:text-white py-3 px-4 hover:rounded-lg hover:bg-blue-500 hover:border-none"
            }
          >
            Dashboard
          </Link> */}
        </ul>
      </div>
    </div>
  );
};

export default MainLayout;
