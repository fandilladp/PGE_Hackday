"use client"
import { Calendar } from "@/components/ui/calendar"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Image from "next/image";
import logo from "./download.png"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

async function fetchForecastData() {

  const response = await fetch("https://office.pge.world/pgehack/?tgl=2024-04-16");
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

  useEffect(() => {
    async function fetchData() {
      try {
        const forecastData = await fetchForecastData();
        setData(forecastData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const forecast = getForecastByLocationName("Area_Kamojang", data);
  const [date, setDate] = React.useState<Date | undefined>(new Date())
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
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
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
                <TableCaption>Keterangan</TableCaption>
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
                    <TableCell className="font-medium">U</TableCell>
                    <TableCell className="text-right">Utara</TableCell>
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
