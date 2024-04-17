import React from "react";
import { Link } from "react-router-dom";
import PeraminaLogo from "../assets/logo_pgeWHite.png";
import BmkgLogo from "../assets/Logo-BMKG.webp";
import { CiCircleInfo } from "react-icons/ci";
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
        <ul className="menu p-4 w-80 min-h-full text-base-content flex flex-col gap-10 bg-white border-r">
          <div className="flex gap-3 py-10">
            <img
              src={PeraminaLogo}
              alt="Pertamina"
              className="object-contain w-52"
            />
            <img src={BmkgLogo} alt="BMKG" className="object-contain w-16" />
          </div>
          <div
            className="tooltip  tooltip-top cursor-pointer flex items-center justify-center"
            data-tip="X	Arah angin menunjukkan darimana angin bertiup.
X	Durasi hujan harian dihitung sejak 07.00 hingga 07.00 WIB (24 jam)."
          >
            <h1 className="text-center font-bold uppercase mb-2">Keterangan</h1>
            <CiCircleInfo className="mb-2" />
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Arah Angin</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>U</td>
                  <td>Utara</td>
                </tr>
                <tr>
                  <td>TL</td>
                  <td>Utara</td>
                </tr>
                <tr>
                  <td>T</td>
                  <td>Utara</td>
                </tr>
                <tr>
                  <td>TG</td>
                  <td>Utara</td>
                </tr>
                <tr>
                  <td>S</td>
                  <td>Utara</td>
                </tr>
                <tr>
                  <td>BD</td>
                  <td>Utara</td>
                </tr>
                <tr>
                  <td>B</td>
                  <td>Utara</td>
                </tr>
                <tr>
                  <td>BL</td>
                  <td>Utara</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default MainLayout;
