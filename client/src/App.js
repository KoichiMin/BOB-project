import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Header from "./Header";
import TradesPage from "./pages/TradesPage";


const App = () => {
  return (
    <BrowserRouter>
      <main>       
        <Header/>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/trades" element={<TradesPage/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
