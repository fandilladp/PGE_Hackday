import { useEffect, useState } from 'react';
import './App.css';
import ButtonArea from './component/ButtonArea.jsx';
import Keterangan from './component/Keterangan.jsx';
import Logo from './component/Logo.jsx';
import Title from './component/Title.jsx';
import api from './service/cuaca.js'

function App() {
  const [data, setData] = useState([]);
  const [dataCuaca, setDataCuaca] = useState([]);
  const [dataKoordinat, setDataKoordinat] = useState('');
  const [area, setArea] = useState("Area_Karaha_Bodas");
  const [countDate, setCountDate] = useState(0);
  const [alertNotif, setAlertNotif] = useState("Tidak Ada");

  useEffect(() => {
    const fetchData = async () => {
      let responseData = await api.getData(getFormatedDate());

      if (responseData) {
        setData(responseData);
      } else {
        setData([]);
        setDataCuaca([]);
      }
    }

    fetchData();
  }, [area, countDate]);

  useEffect(() => {
    data.forEach((e) => {
      if (e.location_name === area) {
        setDataCuaca(e.forecast);
        setDataKoordinat(e.lat + ", " + e.lon);
        setAlertNotif(e.alert_daily ? e.alert_daily : "Tidak Ada");
      }
    });
  }, [data, area]);

  const getFormatedDate = () => {
    let date = new Date();
    date.setDate(date.getDate() + countDate);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const setMyDate = (type) => {
    if (type === 'add') {
      setCountDate(countDate + 1);
    } else {
      setCountDate(countDate - 1);
    }
  }

  const keteranganPublikasi = () => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const currentDate = new Date();
    const dayName = days[currentDate.getDay()];
    const day = currentDate.getDate();
    const monthName = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
  }

  return (
    <div className="App">
      <div style={{ width: '400px', margin: '0' }}>
        <Logo />
        <Title />
        <Keterangan />
      </div>
      <div className='container-right'>
        <div className='container-button-area'>
          <ButtonArea setArea={setArea} text={"Area_Kamojang"} />
          <ButtonArea setArea={setArea} text={"Area_Karaha_Bodas"} />
          <ButtonArea setArea={setArea} text={"Area_Lahendong"} />
          <ButtonArea setArea={setArea} text={"Area_Lumut_Balai"} />
          <ButtonArea setArea={setArea} text={"Area_Sibayak"} />
          <ButtonArea setArea={setArea} text={"Area_Ulubelu"} />
          <ButtonArea setArea={setArea} text={"Proyek_Hululais"} />
        </div>

        <span style={{ fontSize: '10px' }}>(Silahkan klik pada tab untuk menampilkan Prakiraan Cuaca Per Wilayah Kerja)</span>

        <div className='container-info-lokasi'>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <div className='info-lokasi-item' style={{ width: '80px' }}>Lokasi</div>
            <div className='info-lokasi-item'>
              <span id='nama-lokasi'>{area.replace(/_/g, " ")}</span>
              <span id='koordinat-lokasi' style={{ fontSize: '10px', fontWeight: 'normal', marginTop: '5px' }}>{dataKoordinat}</span>
            </div>
          </div>
          <div className='info-lokasi-item'>Prakiraan Cuaca 7 Hari Kedepan</div>
        </div>

        <div className='action-date'>
          <button onClick={() => setMyDate('min')}>Prev</button>
          <span>{getFormatedDate()}</span>
          <button onClick={() => setMyDate('add')}>Next</button>
        </div>

        <table className='table-data'>
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Cuaca</th>
              <th>Suhu (C)</th>
              <th>RH (%)</th>
              <th>Arah Angin</th>
              <th>Kecepatan Angin (Km/Jam)</th>
              <th>Visibility</th>
              <th>Intensitas Curah Hujan (mm)</th>
              <th>Durasi Hujan (Jam)</th>
            </tr>
          </thead>
          <tbody>
            {dataCuaca.map((e, index) => {
              return (
                <tr key={index}>
                  <td>{e.time_local}</td>
                  <td>{e.weather}</td>
                  <td>{e.temp_min} - {e.temp_max}</td>
                  <td>{e.rh_min} - {e.rh_max}</td>
                  <td>{e.windir24h}</td>
                  <td>{e.windspd24h}</td>
                  <td>{e.vis24}</td>
                  <td>{e.prec24h}</td>
                  <td>{e.dur24h}</td>
                </tr>
              )
            })}
          </tbody>

        </table>
        {dataCuaca.length === 0 && <div style={{
          width: '100%', textAlign: 'center', fontSize: '12px', padding: '10px'
        }}>Data Kosong</div>}

        <span style={{ width: '100%', display: 'flex', justifyContent: 'end', margin: '10px 0px 5px', fontSize: '10px' }}>Tanggal Publikasi: {keteranganPublikasi()}</span>

        <div className='alert-cuaca'>
          <img src="./assets/warning-icon.png" alt="Warning Icon" width={30} />
          <span style={{ margin: "5px 0" }}>{alertNotif}</span>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="./assets/image_orang.jpg" alt="Gambar Orang" height={200} />
        </div>
      </div>
    </div >
  );
}

export default App;
