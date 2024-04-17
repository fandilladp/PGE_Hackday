import React, { useState } from "react";
import { useGetCuaca } from "../../library";
import { MainLayout } from "../../layouts";
import Tabel from "./components/Tabel";
import { useForm } from "react-hook-form";
import moment from "moment";
import { CiLocationArrow1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import { formatDate, getDailyAlert } from "../../utils/helper";
import TabelSkeleton from "./components/TabelSkeleton";
import AlertIcon from "../../assets/warning-icon.png";
import { CiCalendarDate } from "react-icons/ci";
import { TiWeatherDownpour } from "react-icons/ti";
import { FaSearchLocation } from "react-icons/fa";
import { ModalWithCloseButton } from "../../components";

const HomePage = () => {
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const { register, watch } = useForm();
  const { data, isFetching } = useGetCuaca({
    tgl: currentDate,
    location_name: watch("location_name"),
  });
  const daily_alert = getDailyAlert(data);

  const handleNext = () => {
    if (moment().format("YYYY-MM-DD") === currentDate) {
      return;
    }
    const newDate = moment(currentDate).add(1, "days").format("YYYY-MM-DD");
    setCurrentDate(newDate);
  };
  const handlePrev = () => {
    const newDate = moment(currentDate)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    setCurrentDate(newDate);
  };
  return (
    <MainLayout>
      <div className="flex flex-col gap-5 w-full h-full">
        {/* Header */}
        <div className="flex gap-3 bg-white border-2 border-black uppercase py-10 px-5 rounded-lg items-center justify-center">
          <p className="font-bold text-xl text-center">
            INFORMASI PRAKIRAAN CUACA KHUSUS PT Pertamina Geothermal Energy Tbk
          </p>
        </div>

        {/* Pagination */}
        <div className="flex justify-between gap-5 flex-col md:flex-row ">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex gap-3 items-center">
              <select
                className="select select-bordered w-full md:max-w-xs"
                {...register("location_name")}
              >
                <option value={"Area_Kamojang"}>Area Kamojang</option>
                <option value={"Area_Karaha_Bodas"}>Area Karaha Bodas</option>
                <option value={"Area_Lahendong"}>Area Lahendong</option>
                <option value={"Area_Lumut_Balai"}>Area Lumut Balai</option>
                <option value={"Area_Sibayak"}>Area Sibayak</option>
                <option value={"Area_Ulubelu"}>Area Ulubelu</option>
                <option value={"Proyek_Hululais"}>Proyek Hululais</option>
              </select>
              <Link
                className="btn"
                target="_blank"
                to={`https://www.google.com/maps?q=${data?.lat},${data?.lon}`}
              >
                <FaSearchLocation size={25} color="black" />
              </Link>
            </div>
            <button
              className="btn  uppercase"
              onClick={() => {
                setCurrentDate(moment().format("YYYY-MM-DD"));
                document.getElementById("prakiraan").showModal();
              }}
            >
              Prakiraan cuaca 7 hari kedepan
            </button>
          </div>
          <div className="join mx-auto md:mx-0">
            <button className="join-item btn " onClick={handlePrev}>
              «
            </button>
            <button className="join-item btn ">{currentDate}</button>
            <button className="join-item btn " onClick={handleNext}>
              »
            </button>
          </div>
        </div>

        {/* <div className="bg-white py-2 rounded-lg flex items-center justify-center"></div> */}
        <div className="bg-white rounded-lg px-4 py-5 w-full flex flex-col text-sm sm:text-base">
          <div className="w-full">
            <div className="flex flex-col gap-2">
              <div className="font-semibold text-black flex gap-1 items-center ">
                Peringatan Cuaca Dini :
                {daily_alert ? (
                  <img
                    src={AlertIcon}
                    alt="caution"
                    className="w-6 h-6 animate-pulse"
                  />
                ) : (
                  <span className="font-normal">Tidak ada</span>
                )}
              </div>
              {daily_alert && (
                <>
                  <div className="flex gap-2 w-full">
                    <CiCalendarDate className="text-2xl" />
                    <small className="text-red-600 font-bold">
                      {formatDate(currentDate)}
                    </small>
                  </div>
                  <div className="flex gap-2 w-full">
                    <TiWeatherDownpour className="text-2xl" />
                    <small className="text-red-600 font-bold">
                      {getDailyAlert(data)}
                    </small>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        {isFetching ? <TabelSkeleton /> : <Tabel data={data} />}

        {/* PUBLISHED DATA */}
        <div className="w-full bg-white p-4 rounded-lg text-sm sm:text-base">
          <table className="w-full py-2 px-4 rounded-lg max-w-lg">
            <tr>
              <td className="font-semibold text-black ">Tanggal Publikasi</td>
              <td>: {formatDate(currentDate)}</td>
            </tr>
            <tr>
              <td className="font-semibold text-black">Sumber Data</td>
              <td>: Badan Meteorologi, Klimatologi & Geofisika</td>
            </tr>
          </table>
        </div>
      </div>
      <ModalWithCloseButton
        id={"prakiraan"}
        title={"BERHASIL"}
        content={"BERHASIL MENAMPILKAN PRAKIRAAN 7 HARI KEDEPAN!!"}
      />
    </MainLayout>
  );
};

export default HomePage;
