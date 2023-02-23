import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Header from "./Header";
import TradesPage from "./pages/TradesPage";
import ReservationPage from "./pages/ReservationPage";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import { useAuth0 } from "@auth0/auth0-react";

import TradeDescriptionPage from "./pages/TradeDescriptionPage";
import Profile from "./pages/Profile";
import UserProfilePage from "./pages/UserProfilePage";

const App = () => {
  const  {isAuthenticated} = useAuth0()
  console.log(process.env)
  return (
    <BrowserRouter>
        <Header/>
      <main>       
        <Routes>    
          <Route exact path="/" element={<HomePage/>}/>
          <Route  path="/trades/:trade" element={<TradesPage/>}/>
          <Route path="/reservaton/:company" element={<ReservationPage/>}/>
          { isAuthenticated && <Route path="/profile" element={<Profile/>}/>}
          <Route path="/CompanyProfile" element={<CompanyProfilePage/>}/>
          <Route path="/UserProfile" element={<UserProfilePage/>}/>
          <Route path="/trade/description" element={<TradeDescriptionPage/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
