import React from "react";
import { Route, Routes } from "react-router";
import Sidebar from "./Outils/Sidebar";
import Agent from "./pages/Agent";
import Champion from "./pages/Champion";
import Employe from "./pages/Employe";
import PetitGroupe from "./pages/PetitGroupe";
import PrePetitGroupe from "./pages/PrePetitGroupe";
import Quantificateur from "./pages/Quantificateur";
import VisiteQuantification from "./pages/VisiteQuantification";
import PG from "./pages/pg/PG";

export default function Accueil() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<PrePetitGroupe />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/employe" element={<Employe />} />
        <Route path="/champion" element={<Champion />} />
        <Route path="/quantificateur" element={<Quantificateur />} />
        <Route path="/petit-groupe">
          <Route path="" element={<PetitGroupe />} />
          <Route path=":pg" element={<PG />} />
        </Route>
        <Route
          path={"/visite-quantification"}
          element={<VisiteQuantification />}
        />
      </Routes>
    </>
  );
}
