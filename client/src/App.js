import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Header from "./Header";
import TradesPage from "./pages/TradesPage";
import ReservationPage from "./pages/ReservationPage";
import CompanyProfilePage from "./pages/CompanyProfilePage";


const App = () => {
  return (
    <BrowserRouter>
        <Header/>
      <main>       
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route  path="/trades/:trade" element={<TradesPage/>}/>
          <Route path="/reservaton/:company" element={<ReservationPage/>}/>
          <Route path="/profile" element={<CompanyProfilePage/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
