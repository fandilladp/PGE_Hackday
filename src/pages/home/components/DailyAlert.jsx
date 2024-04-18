import React from "react";
import AlertIcon from "../../../assets/warning-icon.png";
import { CiCalendarDate } from "react-icons/ci";
import { TiWeatherDownpour } from "react-icons/ti";
import { formatDate, getDailyAlert } from "../../../utils/helper";

const DailyAlert = ({ daily_alert, data, currentDate }) => {
  return (
    <div className="w-full ">
      <div className="flex flex-col gap-2">
        <div className="font-semibold text-black flex gap-1 items-center uppercase">
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
              <span className="text-red-600 font-bold">
                {formatDate(currentDate)}
              </span>
            </div>
            <div className="flex gap-2 w-full">
              <TiWeatherDownpour className="text-2xl" />
              <span className="text-red-600 font-bold">
                {getDailyAlert(data)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DailyAlert;
