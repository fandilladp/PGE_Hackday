"use client"

import { ColumnDef } from "@tanstack/react-table"


// export type Forecast = {
//     location_name: string;
//     location_id: string;
//     lat: number;
//     lon: number;
//     kecamatan: string;
//     kabupaten: string;
//     provinsi: string;
//     forecast: ForecastData[];
// }

export type ForecastData = {
    time_utc: string;
    time_local: string;
    temp_min: number;
    temp_max: number;
    rh_min: number;
    rh_max: number;
    windspd24h: number;
    windir24h: string;
    prec24h: number;
    weather: string;
    dur24h: number;
    vis24: string;
    weather_code: number;
    alert_daily: string | null;
    alert_all: string;
  }

  export const columns: ColumnDef<ForecastData>[] = [
    {
      accessorKey: "time_local",
      header: "Local Time",
    },
    {
      accessorKey: "temp_min",
      header: "Min Temp (°C)",
    },
    {
      accessorKey: "temp_max",
      header: "Max Temp (°C)",
    },
    {
      accessorKey: "rh_min",
      header: "Min RH (%)",
    },
    {
      accessorKey: "rh_max",
      header: "Max RH (%)",
    },
    {
      accessorKey: "windspd24h",
      header: "Wind Speed (km/h)",
    },
    {
      accessorKey: "windir24h",
      header: "Wind Direction",
    },
    {
      accessorKey: "prec24h",
      header: "Precipitation (mm)",
    },
    {
      accessorKey: "weather",
      header: "Weather",
    },
    {
      accessorKey: "dur24h",
      header: "Duration (hrs)",
    },
    {
      accessorKey: "vis24",
      header: "Visibility",
    },
    {
      accessorKey: "weather_code",
      header: "Weather Code",
    },
  ];
