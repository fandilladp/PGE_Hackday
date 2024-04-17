import React, { useEffect, useState } from "react";
import { useGetAllLokasi, useGetCuaca } from "../../library";
import { MainLayout } from "../../layouts";
import Tabel from "./components/Tabel";
import { useForm } from "react-hook-form";
import moment from "moment";
import { Link } from "react-router-dom";
import { formatDate, getDailyAlert } from "../../utils/helper";
import TabelSkeleton from "./components/TabelSkeleton";
import { FaSearchLocation } from "react-icons/fa";
import { ModalWithCloseButton } from "../../components";
import Header from "./components/Header";
import DailyAlert from "./components/DailyAlert";

const HomePage = () => {
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [lokasi, setLokasi] = useState([]);
  const { register, watch, setValue } = useForm();
  const { data, isFetching } = useGetCuaca({
    tgl: currentDate,
    location_name: watch("location_name"),
  });
  const { data: dataLokasi } = useGetAllLokasi();
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

  useEffect(() => {
    setLokasi(dataLokasi?.map((item) => item.location_name));
    setValue("location_name", dataLokasi?.[0]?.location_name);
  }, [dataLokasi]);
  return (
    <MainLayout>
      <div className="flex flex-col gap-5 w-full h-full">
        {/* Header */}
        <Header />

        {/* Pagination */}
        <div className="flex justify-between gap-5 flex-col md:flex-row ">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex gap-3 items-center">
              <select
                className="select select-bordered w-full md:max-w-xs"
                {...register("location_name")}
              >
                {lokasi?.map((item, index) => (
                  <option key={index} value={item}>
                    {item?.replace(/_/g, " ")}
                  </option>
                ))}
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

        {/* Daily alert */}
        <div className="bg-white rounded-lg px-4 py-5 w-full flex flex-col text-sm  sm:text-base">
          <DailyAlert
            data={data}
            daily_alert={daily_alert}
            currentDate={currentDate}
          />
        </div>

        {/* Table */}
        {isFetching ? <TabelSkeleton /> : <Tabel data={data} />}

        {/* PUBLISHED DATA */}
        <div className="w-full bg-white p-4 rounded-lg text-sm  sm:text-base">
          <table className="w-full py-2 px-4 rounded-lg max-w-lg">
            <tbody>
              <tr>
                <td className="font-semibold text-black ">Tanggal Publikasi</td>
                <td>: {formatDate(currentDate)}</td>
              </tr>
              <tr>
                <td className="font-semibold text-black">Sumber Data</td>
                <td>: Badan Meteorologi, Klimatologi & Geofisika</td>
              </tr>
            </tbody>
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
