import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import PeraminaLogo from "../assets/logo_pgeWHite.png";
import BmkgLogo from "../assets/Logo-BMKG.webp";
import { CiCircleInfo } from "react-icons/ci";
import { Modal } from "../components";
const MainLayout = ({ children }) => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-black">
          <div className="w-full h-16 bg-white flex items-center justify-between lg:hidden pl-4">
            <div className="flex gap-3 ">
              <img
                src={PeraminaLogo}
                alt="Pertamina"
                className="object-contain w-32"
              />
              <img src={BmkgLogo} alt="BMKG" className="object-contain w-10" />
            </div>
            <label
              htmlFor="my-drawer-2"
              className="btn h-full rounded-none btn-ghost drawer-button lg:hidden"
            >
              <GiHamburgerMenu size={35} />
            </label>
          </div>
          <div className="flex flex-col p-4">{children}</div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-72 min-h-full text-base-content flex flex-col gap-10 bg-white border-r">
            <div className="flex gap-3 py-10">
              <img
                src={PeraminaLogo}
                alt="Pertamina"
                className="object-contain w-44"
              />
              <img src={BmkgLogo} alt="BMKG" className="object-contain w-16" />
            </div>
            <div
              onClick={() => document.getElementById("keterangan").showModal()}
              className="tooltip  tooltip-top cursor-pointer flex items-center btn justify-center"
            >
              <h1 className="text-center font-bold uppercase">Keterangan</h1>
              <CiCircleInfo size={20} />
            </div>

            <div className="overflow-x-auto">
              <table className="table text-center">
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
                    <td>Timur Laut</td>
                  </tr>
                  <tr>
                    <td>T</td>
                    <td>Timur</td>
                  </tr>
                  <tr>
                    <td>TG</td>
                    <td>Tenggara</td>
                  </tr>
                  <tr>
                    <td>S</td>
                    <td>Selatan</td>
                  </tr>
                  <tr>
                    <td>BD</td>
                    <td>Barat Daya</td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>Barat</td>
                  </tr>
                  <tr>
                    <td>BL</td>
                    <td>Barat Laut</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ul>
        </div>
      </div>
      <Modal
        id={"keterangan"}
        content={
          <ul className="flex flex-col gap-2 list-decimal px-5">
            <li>Arah angin menunjukkan darimana angin bertiup</li>
            <li>
              Durasi hujan harian dihitung sejak 07.00 hingga 07.00 WIB (24 jam)
            </li>
          </ul>
        }
        title={"Keterangan"}
      />
    </>
  );
};

export default MainLayout;
