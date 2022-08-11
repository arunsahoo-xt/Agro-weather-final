import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar
} from 'recharts';
import { DateRangePicker, Nav, Placeholder } from 'rsuite';
import "rsuite/dist/rsuite.css";
import PlaceholderGraph from 'rsuite/esm/Placeholder/PlaceholderGraph';
import AllWeatherDataLinks from './AllWeatherDataLinks';
const FiveDaysForecast = () => {
    const [forecastData, setForecastData] = React.useState([]);
    const [active, setActive] = React.useState('home');
    React.useEffect(() => {
        getWeatherData();
    }, []);
    const apikey = "7436a3b54d0b0bb376d8185b1fbe2aa9";
    const getWeatherData = async () => {
        try {
            const url1 = `https://api.agromonitoring.com/agro/1.0/weather/history?lat=37.75&lon=-122.37&start=1620136623&end=1621864623&appid=${apikey}`
            const url=`https://api.agromonitoring.com/agro/1.0/weather/forecast?lat=35&lon=139&appid=${apikey}`
            const soilurl = 'http://api.agromonitoring.com/agro/1.0/soil?'

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setForecastData(data);


        }
        catch (error) {
            console.log(error);
        }




//         var dateTime = new Date(1620136623);
// dateTime.toISOString();

    };
    const styles = {
        marginBottom: 50,
      };
      
      const CustomNav = ({ active, onSelect, ...props }) => {
        return (
          <Nav {...props} activeKey={active} onSelect={onSelect} style={styles}>
            <Nav.Item eventKey="home">
              Home
            </Nav.Item>
            <Nav.Item  eventKey="news">News</Nav.Item>
            <Nav.Item eventKey="solutions">Solutions</Nav.Item>
            <Nav.Item eventKey="products">Products</Nav.Item>
            <Nav.Item eventKey="about">About</Nav.Item>
          </Nav>
        );
      };

    return (
        <div>
              <div>
           
            {/* <CustomNav appearance="tabs" active={active} onSelect={setActive} /> */}
            
           
          </div>
           <AllWeatherDataLinks/>
           
         
        </div>
    )
}

export default FiveDaysForecast
