import React from "react";

const Tabel = ({ data }) => {
  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Cuaca</th>
              <th>Suhu (°C)</th>
              <th>Rh</th>
              <th>Arah Angin</th>
              <th>Kecepatan Angin (Km/Jam)</th>
              <th>Visibility</th>
              <th>Intensitas Curah Hujan (mm)</th>
              <th>Durasi Hujan (Jam)</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.forecast?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.time_local}</td>
                  <td>{item.weather}</td>
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
