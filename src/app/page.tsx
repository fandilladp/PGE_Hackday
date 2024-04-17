"use client"


import { Calendar } from "@/components/ui/calendar";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Image from "next/image";
import logo from "./download.png";
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

async function fetchForecastData(locationName: string) {
  const response = await fetch(`https://office.pge.world/pgehack/?tgl=2024-04-16`);
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

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const forecastData = await fetchForecastData(selectedLocation);
        console.log("Fetched data:", forecastData);
        setData(forecastData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        setLoading(false);
      }
    }
    console.log("Selected location:", selectedLocation);
    fetchData();
  }, [selectedLocation]);


  const forecast = getForecastByLocationName(selectedLocation, data);
  
  return (
    <>
      <br />
      <Image
        src={logo}
        alt="Logo"
        width={200}
        height={200}
      />
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
                <option value="Area_Karaha_Badas">Area Karaha Badas</option>
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
        </CardContent>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : forecast ? (
            <DataTable data={forecast} columns={columns} />
          ) : (
            <CardContent>No forecast data available for the selected location.</CardContent>
          )}
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
