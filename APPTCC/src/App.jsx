import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import InitialPage from "./pages/InitialPage";
import PageQuestion from "./pages/PageQuestion";
import ExplicacoesGabarito from "./pages/Infos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InitialPage />} />
      <Route path="/pageQuestion" element={<PageQuestion />} />
      <Route path="/infos" element={<ExplicacoesGabarito />} />
    </Routes>
  );
}

export default App;
