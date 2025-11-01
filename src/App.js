import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./PublicFolder/Navbar";
import Signup from "./Pages/Authentication/Signup";
import Login from "./Pages/Authentication/Login"; // Create this file
import Homescreen from "./Pages/Homescreen";
import Contact from "./PublicFolder/Contact";
import Adminlog from "./Component/AdminDashboards/Adminlog";
import Team from "./Pages/Team";
import About from "./Pages/About";
import Service from "./Pages/Service";

function App() {

 
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Homescreen />} /> 
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Adminlog />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;