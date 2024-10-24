"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ChapitreChart from "./chapitre";
import StatistiqueFormation from "./formation";
export type FormationMember = {
  id: number;
  nom: string;
  prenom: string;
  progressions: ProgressionItem[];
  createdAt: string;
};

type ProgressionItem = {
  id: number;
  chapitre: number;
  progress: number;
};

export default function FormationDashboard() {
  const [members, setMembers] = useState<FormationMember[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://api.teraka.org/members-progression");
      setMembers(res.data);
    };
    fetchData();
  }, []);
  return (
    <div className="my-4 flex flex-row gap-2">
      <StatistiqueFormation members={members} />
      <ChapitreChart members={members} />
    </div>
  );
}
