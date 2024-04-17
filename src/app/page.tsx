"use client"
import { AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Image from "next/image";
import logo from "./download.png";
import bmkg from "./bmkg.png";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SelectSingleEventHandler } from "react-day-picker"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


async function fetchForecastData(locationName: string, selectedDate: Date) {
  const tahun = selectedDate.getFullYear();
  const bulan = selectedDate.getMonth() + 1;
  const tanggal = selectedDate.getDate();
  const response = await fetch(`https://office.pge.world/pgehack/?tgl=${tahun}-${bulan}-${tanggal}`);
  const data = await response.json();
  return data;
}


function getForecastByLocationName(locationName: string, data: any[]) {
  const location = data.find((loc) => loc.location_name === locationName);
  return location ? location.forecast : null;
}

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLocation, setSelectedLocation] = useState<string>("Area_Sibayak");
  const [date, setDate] = React.useState<Date>();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);


  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const forecastData = await fetchForecastData(selectedLocation, date || new Date());
        console.log("Fetched data:", forecastData);
        setData(forecastData);
        setLoading(false);
        checkAlert(forecastData);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        setLoading(false);
      }
    }
    console.log("Selected location:", selectedLocation);
    fetchData();
  }, [selectedLocation, date]);


  const forecast = getForecastByLocationName(selectedLocation, data);

  const checkAlert = (forecastData: any[]) => {
    const forecast = getForecastByLocationName(selectedLocation, forecastData);
    if (forecast) {
      const alerts: string[] = [];
      forecast.forEach((item: any) => {
        if (item.alert_daily) {
          alerts.push(`${item.time_local}: ${item.alert_daily}`);
        }
      });
      if (alerts.length > 0) {
        const alertMessage = alerts.join("\n");
        setAlertMessage(alertMessage);
      } else {
        setAlertMessage("Tidak Ada Peringatan");
      }
    }
  };
  
  const handleDateChange: SelectSingleEventHandler = (newDate: Date | undefined) => {
    const today = new Date();
    if (newDate && newDate > today) {
      alert("Cannot select a date beyond today");
    } else if (newDate) {
      setDate(newDate);
    }
  };

  const dataTableRef = useRef(null);  // Reference for the DataTable container div

  const handleExportPDF = async () => { 
    const canvas = await html2canvas(dataTableRef.current);
    const imgData = canvas.toDataURL('image/png'); 
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295;  
    const imgHeight = canvas.height * imgWidth / canvas.width;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const margin = 10; // Margin around text elements

    // Add selected location and date
    const today = format(new Date(), "yyyy-MM-dd");
    pdf.setFontSize(12);
    pdf.text(`Area Lokasi: ${selectedLocation}`, margin, margin); 
    pdf.text(`Tanggal Publikasi: ${today}`, margin, margin * 2);
    // alert
    if (alertMessage) {
      pdf.text(alertMessage, margin, margin * 3);
    }

    // Adjust image position to make space for the text
    const imageStartY = margin * 5; 

    pdf.addImage(imgData, 'PNG', 0, imageStartY, imgWidth, imgHeight);
    pdf.save(`forecast_${selectedLocation}_${today}.pdf`);
};



  return (
    <>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ marginRight: '20px', marginTop:'40px' }}>
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={150}
            />
          </div>
          <div>
            <Image
              src={bmkg}
              alt="BMKG Logo"
              width={150}
              height={150}
            />
          </div>
        </div>

      <br />
      <Card>
        <CardHeader>
          <CardTitle>INFORMASI PRAKIRAAN CUACA KHUSUS</CardTitle>
          <CardDescription>PT Pertamina Geothermal Energy Tbk</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Card >
              <CardHeader>
                <CardTitle>
                  Pilih Lokasi
                </CardTitle>
              </CardHeader>
              <CardContent>
              <select title="Choose a location" value={selectedLocation} onChange={handleLocationChange} className="w-[180px]">
                <option value="Area_Kamojang">Area Kamojang</option>
                <option value="Area_Karaha_Bodas">Area Karaha Bodas</option>
                <option value="Area_Lahendong">Area Lahendong</option>
                <option value="Area_Lumut_Balai">Area Lumut Balai</option>
                <option value="Area_Sibayak">Area Sibayak</option>
                <option value="Area_Ulubelu">Area Ulubelu</option>
                <option value="Proyek_Hululais">Proyek Hululais</option>
              </select>
              </CardContent>
              <CardFooter>
                <CardDescription>Prakiraan Cuaca 7 Hari Kedepan</CardDescription>
              </CardFooter>
            </Card>
          </div>
          <br />
          <Card>
            <CardHeader>
              <CardTitle>
                Pilih Tanggal
              </CardTitle>
              <CardDescription>
                Akan menunjukan alert pada tanggal yang dipilih dan data di tabel akan di update sesuai tanggal yang dipilih
              </CardDescription>
            </CardHeader>
            <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
            </CardContent>
            <CardContent>
              {alertMessage && (
                <h1>
                  {alertMessage}
                </h1>
              )}
            </CardContent>
          </Card>
        </CardContent>
        <div style={{ marginLeft: '30px' }}>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Tanggal Publikasi : {format(new Date(), "dd/MM/yyyy")} 
        </h2>
        <br />
        </div>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : forecast ? (
            <div ref={dataTableRef}>
            <DataTable data={forecast} columns={columns} />
            </div>
          ) : (
            <CardContent>No forecast data available for the selected location.</CardContent>
          )}
          <br />
          <Button onClick={handleExportPDF}>Export to PDF</Button>
        </CardContent>
        <CardContent>
          <Card>
            <CardHeader>
              <CardTitle>Keterangan</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Arah angin menunjukkan dimana angin bertiup</TableCaption>
                <TableCaption>Durasi hujan harian dihitung sejak 07:00 WIB hingga 07:00 WIB</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Kode</TableHead>
                    <TableHead className="text-right">Arah Angin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">U</TableCell>
                    <TableCell className="text-right">Utara</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TL</TableCell>
                    <TableCell className="text-right">Timur Laut</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">T</TableCell>
                    <TableCell className="text-right">Timur</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TG</TableCell>
                    <TableCell className="text-right">Tenggara</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">S</TableCell>
                    <TableCell className="text-right">Selatan</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">BD</TableCell>
                    <TableCell className="text-right">Barat Daya</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">B</TableCell>
                    <TableCell className="text-right">Barat</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">BL</TableCell>
                    <TableCell className="text-right">Barat Laut</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
}

