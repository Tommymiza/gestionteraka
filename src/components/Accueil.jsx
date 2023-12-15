import React from "react";
import Sidebar from "./Outils/Sidebar";
import { Routes, Route } from "react-router";
import News from "./News";
import Agent from "./pages/Agent";
import Champion from "./pages/Champion";
import Employe from "./pages/Employe";
import Quantificateur from "./pages/Quantificateur";
import PetitGroupe from "./PetitGroupe/PetitGroupe";

export default function Accueil() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/employe" element={<Employe />} />
        <Route path="/champion" element={<Champion />} />
        <Route path="/quantificateur" element={<Quantificateur />} />
        <Route path="/petit-groupe" element={<PetitGroupe />} />
      </Routes>
    </>
  );
}
