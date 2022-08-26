import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Header from "./Header";


const App = () => {
  return (
    <BrowserRouter>
      <main>       
        <Header/>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
