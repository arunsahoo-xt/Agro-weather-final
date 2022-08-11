import Polygon from './component/Polygon';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowMap from './component/ShowMap';
import Weather from './component/Weather';
import Login from './component/loginss/Login';
import Register from './component/loginss/Register';
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './component/Navbar';
import Contact from './component/loginss/Contact';
import RegisterScreen from './component/loginss/RegisterScreen';
import FiveDaysForecast from './component/GraphicalData/FiveDaysForecast';
import Logins from './component/loginss/Logins';
import About from './component/loginss/About';
import Farmnotes from './component/Farmnotes';
import Information from './component/Information';
import NotFound from './component/NotFound';

function App() {
  return (
    <div className="app">
      <div className="stylebg">
     <Routes>
      <Route  exact path="/register" element={<RegisterScreen/>}/>
      <Route exact  path="/login" element={<Login/>}/>
         <Route  exact path="/" element={<Weather/>}/>
          <Route  exact path="/graph" element={<FiveDaysForecast/>}/>
          <Route  exact path="/map" element={<ShowMap/>}/>
          <Route exact  path="/create" element={<Contact/>}/>
          <Route  exact path="/notes" element={<Farmnotes/>}/>
          <Route  exact path="/info" element={<Information/>}/>
          <Route  exact path="/deleting" element={<About/>}/>
          <Route  exact path="/notfound" element={<NotFound/>}/>
         </Routes>
      </div>
    </div>
  );
}

export default App;
