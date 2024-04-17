import React, { useEffect, useState } from "react";
import { useGetCuaca } from "../../library";
import { MainLayout } from "../../layouts";
import Tabel from "./components/Tabel";
import { useForm } from "react-hook-form";
import moment from "moment";

const HomePage = () => {
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const { register, watch } = useForm();
  const { data, isFetching } = useGetCuaca({
    tgl: currentDate,
    location_name: watch("location_name"),
  });
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
  console.log(data);
  return (
    <MainLayout>
      <div className="flex flex-col gap-5 w-full h-full">
        <div className="flex gap-3 bg-white py-10 px-5 rounded-lg items-center justify-center">
          <p className="font-bold text-xl ">
            INFORMASI PRAKIRAAN CUACA KHUSUS PT Pertamina Geothermal Energy Tbk
          </p>
        </div>
        <div className="flex justify-between">
          <select
            className="select select-bordered w-full max-w-xs"
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
          <div className="join ">
            <button className="join-item btn" onClick={handlePrev}>
              «
            </button>
            <button className="join-item btn">{currentDate}</button>
            <button className="join-item btn" onClick={handleNext}>
              »
            </button>
          </div>
        </div>
        {isFetching ? <h1>Loading</h1> : <Tabel data={data} />}
      </div>
    </MainLayout>
  );
};

export default HomePage;
