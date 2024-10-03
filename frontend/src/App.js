import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransportHome from "./component/Transport/transportHome";
import Addtranport from "./component/Transport/addtranport";
//juthmini
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/transportHome" element={<TransportHome />} />
          <Route path="/addtranport" element={<Addtranport />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
