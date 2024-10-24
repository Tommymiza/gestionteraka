"use client";
import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FormationMember } from ".";

interface DataItem {
  month: string;
  nb_christian: number;
}
const convertData = (data: FormationMember[], year: number): DataItem[] => {
  const months = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sept",
    "Oct",
    "Nov",
    "Déc",
  ];

  const result: DataItem[] = months.map((month, index) => ({
    month: month,
    nb_christian: data.filter(
      (item) =>
        new Date(item.createdAt).getFullYear() === year &&
        new Date(item.createdAt).getMonth() === index
    ).length,
  }));

  return result;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="border p-2 rounded-md border-slate-400 bg-[#ffffff33]">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function StatistiqueFormation({
  members,
}: {
  members: FormationMember[];
}) {
  const [chartData, setChartData] = useState<DataItem[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const data = convertData(members, year);
    generateYearList();
    setChartData(data);
  }, [year, members]);

  const generateYearList = () => {
    "use strict";
    const yearSet = new Set(
      members.map((item) => new Date(item.createdAt).getFullYear())
    );
    const yearList: number[] = [...yearSet];
    setYears(yearList);
  };
  return (
    <div className="flex flex-col gap-6 w-1/2 max-md:w-full border p-2 dark:border-zinc-800 border-slate-200 rounded-md">
      <div className="flex justify-between w-full items-center p-2">
        <h1 className="font-bold text-lg">
          Nombre d&apos;inscriptions au centre de formation
        </h1>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <Select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            size="small"
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          style={{
            top: 0,
            left: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="2 3"
            strokeOpacity={0.2}
            vertical={false}
          />
          <XAxis dataKey="month" tickLine={false} />
          <YAxis allowDecimals={false} tickLine={false} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#334155",
            }}
          />
          <defs>
            <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
              <stop offset="30%" stopColor="#6584FF" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="nb_christian"
            stroke="#8884d8"
            strokeWidth={3}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="p-2">
        <div className="flex flex-row gap-2 font-bold">
          <h1>Totaux :</h1>
          <p>{members.length}&nbsp; personnes</p>
        </div>
      </div>
    </div>
  );
}
