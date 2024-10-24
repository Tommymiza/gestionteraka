import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FormationMember } from ".";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
];
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="border p-2 rounded-md border-slate-400 bg-[#ffffff33]">
        <p className="font-bold">{`${payload[0].payload.chapitre.name}`}</p>
        <p className="text-[1rem]">{`Nombre : ${payload[0].value} personnes`}</p>
      </div>
    );
  }

  return null;
};
const CustomBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <g onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <defs>
        <filter id="shadow" x="-10%" y="0%" width="140%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#8791E9B9" />
        </filter>
      </defs>
      <rect
        x={!isNaN(x) ? x : 0}
        y={!isNaN(y) ? y : 0}
        width={width}
        height={height}
        rx={8}
        fill={fill}
        filter={isHovered ? "url(#shadow)" : ""}
        style={{
          transition: "all 0.3s ease", // Smooth transition
          fill: isHovered ? "#6584FF" : fill, // Change fill on hover
        }}
      />
    </g>
  );
};

type ChapitreItem = {
  name: string;
  chapitre: number;
};

const chapitres: ChapitreItem[] = [
  {
    name: "Comment utiliser le centre de formation TERAKA",
    chapitre: 101,
  },
  {
    name: "Comment télécharger une formation PDF TERAKA",
    chapitre: 102,
  },
  {
    name: "Valeurs TERAKA de base",
    chapitre: 201,
  },
  {
    name: "La plantation d’arbres et TERAKA",
    chapitre: 202,
  },
  {
    name: "La plantation d’arbres et les Crédits carbone",
    chapitre: 203,
  },
  {
    name: "La structure du Petit Groupe TERAKA",
    chapitre: 204,
  },
  {
    name: "Comment devenir un Petit Groupe TERAKA",
    chapitre: 205,
  },
  {
    name: "Comprendre les paiements et le contrat GES TERAKA",
    chapitre: 206,
  },
  {
    name: "Faire grandir TERAKA",
    chapitre: 207,
  },
];

const romanChapitre: { [key: string]: string } = {
  "1": "I",
  "2": "II",
};

export default function ChapitreChart({
  members,
}: {
  members: FormationMember[];
}) {
  const [data, setData] = useState<{ length: number; x: string }[]>([]);
  const [checked, setChecked] = useState<boolean>(true);
  useEffect(() => {
    const newData = chapitres.map((chapitre) => ({
      chapitre,
      length: members?.filter((c) =>
        checked
          ? c.progressions.some(
              (p) => p.chapitre === chapitre.chapitre && p.progress === 100
            )
          : !c.progressions.some(
              (p) => p.chapitre === chapitre.chapitre && p.progress === 100
            )
      ).length,
      x:
        romanChapitre[chapitre.chapitre.toString().substring(0, 1)] +
        "-" +
        chapitre.chapitre.toString().substring(1, 4),
    }));
    setData(newData);
  }, [members, checked]);
  return (
    <div className="flex flex-col gap-6 border p-2 w-1/2 max-md:w-full dark:border-zinc-800 border-slate-200 rounded-md">
      <div className="flex justify-between w-full items-center p-2">
        <h1 className="font-bold text-lg">Chapitre de formation</h1>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <FormControl variant="outlined" size="small">
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e, c) => setChecked(c)}
                />
              }
              label="Ayant terminée"
            />
          </FormControl>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey={"x"} tickLine={false} />
          <YAxis allowDecimals={false} tickLine={false} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Bar dataKey="length" shape={<CustomBar />}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="rounded-md"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
