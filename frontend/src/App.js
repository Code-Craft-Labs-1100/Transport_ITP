import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransportHome from './component/Transport/transportHome';
import Addtranport from "./component/Transport/addtranport";
//juthmini
import "./App.css";
import TransportPage from "./component/Transport/page/TransportPage";

function App() {
  return (
    
    <BrowserRouter>
      <div>
       
        <Routes>
          
          <Route path="/transportHome" element={<TransportHome />} />
          <Route path="/addtranport" element={<Addtranport />} />
          <Route path="/machine" element={<TransportPage/>} />
          
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
