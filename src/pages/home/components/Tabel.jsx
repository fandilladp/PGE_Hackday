import React from "react";
import { TiWeatherShower } from "react-icons/ti";
import HujanSedang from "../../../assets/hujan_sedang.svg";
import { TiWeatherDownpour } from "react-icons/ti";
import { TiWeatherPartlySunny } from "react-icons/ti";

const Tabel = ({ data }) => {
  function cuacaType(weatherData) {
    switch (weatherData) {
      case "Hujan Ringan":
        return <TiWeatherShower className="text-xl" />;
      case "Hujan Sedang":
        return <img src={HujanSedang} alt="Hujan Sedang" className="w-5 h-5" />;
      case "Hujan Lebat":
        return <TiWeatherDownpour className="text-xl" />;
      case "Cerah Berawan":
        return <TiWeatherPartlySunny className="text-xl" />;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="font-bold text-black">Tanggal</th>
              <th className="font-bold text-black">Cuaca</th>
              <th className="font-bold text-black">Suhu (°C)</th>
              <th className="font-bold text-black">Rh</th>
              <th className="font-bold text-black">Arah Angin</th>
              <th className="font-bold text-black">Kecepatan Angin (Km/Jam)</th>
              <th className="font-bold text-black">Visibility</th>
              <th className="font-bold text-black">
                Intensitas Curah Hujan (mm)
              </th>
              <th className="font-bold text-black">Durasi Hujan (Jam)</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.forecast?.map((item, index) => {
              return (
                <tr key={index} className="text-sm sm:text-base">
                  <td>{item.time_local}</td>
                  <td className="flex gap-1 flex-col lg:flex-row">
                    {item.weather} {cuacaType(item.weather)}
                  </td>
                  <td>
                    {item.temp_min} - {item.temp_max}
                  </td>
                  <td>
                    {item.rh_min} - {item.rh_max}
                  </td>
                  <td>{item.windir24h}</td>
                  <td>{item.windspd24h}</td>
                  <td>{item.vis24}</td>
                  <td>{item.prec24h}</td>
                  <td>{item.dur24h}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tabel;
