import React from 'react'
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area,
    BarChart,
    Bar
} from 'recharts';
import { MaskedInput, Placeholder } from 'rsuite';
import Weather from '../Weather';
import CurrentWeather from './CurrentWeather';
const AllWeatherDataLinks = ({polyid}) => {
    const [forecastData, setForecastData] = React.useState([]);
    const [customforecastData, setCustomForecastData] = React.useState([])
    const [custom5forecastData, setCustom5ForecastData] = React.useState([])
    // const [polyId,setPolyId]=React.useState("");
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        // setPolyId(polyid);
        getWeatherData();
    }, [polyid]);
    const apikey = "1f0c9dbc13546bee076b99c95c97aa4c";
    const polyId=polyid;




    const getWeatherData = async () => {
      setLoading(true);
        try {
            const url = `https://api.agromonitoring.com/agro/1.0/weather/forecast?polyid=${polyId}&units=metric&appid=${apikey}`
            const response = await fetch(url);
            if(!response){throw new Error('Response not ok');}
            const data = await response.json();
            // console.log(data);
            // setForecastData(data);

var wedata= data.map((ele) => {
  var tm=new Date(ele.dt * 1000).getHours();
  var dt=new Date(ele.dt * 1000).toISOString().substr(0,10);
  var dtt=new Date(ele.dt * 1000).toString().substr(0,18);
var obj={
  "FilterTime":tm,
  "Time":dtt,
  "Date":dtt,
  "MaxTemp":ele.main.temp_max,
  "MinTemp":ele.main.temp_min,
  "Temp":ele.main.temp,
  "Humidity":ele.main.humidity,
  "Pressure":ele.main.pressure+"hPa",
  "WindSpeed":ele.wind.speed,
  "WDescp":ele.weather[0].description,
  "clouds":ele.clouds.all, 
}
    return (
         obj
        );
    });
    // console.log(wedata);
  var wedata2 =wedata.filter(ele=>ele.FilterTime==11);
  
  
  
    setCustomForecastData(wedata);
    setCustom5ForecastData(wedata2);
    setLoading(false);
  }
    catch (error) {
      console.log(error);
  }
  };

    return (
      <div>
<div className='container' style={{height:"auto"}}>

          {loading &&<div className='container-fluid darkbg justify-content-center' style={{height:240}}> 
       <Placeholder.Graph active className='rs-theme-dark mt-3'/> </div>}
          {!loading &&
          <div className='card overflow-auto darkbg color-white d-flex flex-column text-center m-sm-5 rounded-lg' style={{height:"auto"}}>
          <div className="card-body">
           
         <h1 className="lead">Stats Chart</h1>
        
         <AreaChart className='justify-content-center'
          width={1000}
          height={300}
         data={customforecastData}
         margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        >
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="8884d88"  stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorRv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#FF0000" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis  xAxisId="0" dataKey="Time" tickLine={false} axisLine={false} minTickGap={10}  orientation="top" tickFormatter={number=>`${number}:00`}/>
  {/* <XAxis  xAxisId="0" dataKey="WDescp"  tickLine={false} axisLine={false} minTickGap={10}  orientation="top" /> */}
  <YAxis dataKey="Temp" tickLine={false} axisLine={false} tickCount={5} />
  <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false}/>
  <Tooltip content={<CustomTooltip/>} />
  <Legend/>
  
  <Area type="monotone" dataKey="Temp" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
  {/* <Area type="monotone" dataKey="Humidity" /> */}
  {/* stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" */}
  
  {/* <Area type="monotone" dataKey="wind.speed" stroke="#FF0000" fillOpacity={1} fill="url(#colorRv)" /> */}
  {/* <Area type="monotone" dataKey=""  /> */}
  
</AreaChart>
</div></div> 
}
{!loading &&
  <div className='card overflow-auto darkbg color-white d-flex text-center m-sm-5 rounded-lg' style={{height:"auto"}}>
          <div className="card-body">



   <h2 className='lead'>Daily Weather Forecast</h2>   
<BarChart width={800} height={300} data={custom5forecastData}>
  <defs>
  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="25%" stopColor="#00498D" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#00498D" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="coloPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="25%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <CartesianGrid opacity={0.2} vertical={false} />
  <XAxis dataKey="Date"/>
  <YAxis />
  <Tooltip content={<CustomTooltip/>} />
  <Legend />
  <Bar type="monotone" dataKey="Temp" stroke="#00498D" fill="url(#colorUv)" />
  <Bar type="monotone" dataKey="MinTemp" stroke="#8884d8" fill="url(#colorPv)" />
</BarChart>
</div></div>
       
      }
        </div>
        </div>
    )
}

function CustomTooltip({active,payload,label}){
if(active){
  return (
    <div style={{color:"white"}}>
      <h6>{label}:00 Hrs</h6>
      <p>State:{payload[0].payload.WDescp}</p>
      <p>Temp:{payload[0].payload.Temp}&deg;C</p>
      <p>Humidity:{payload[0].payload.Humidity}%</p>
      <p>Wind Speed:{payload[0].payload.WindSpeed}m/s</p>
      <p>Clouds:{payload[0].payload.clouds}%</p>
    </div>
  )
}
else return null
}
export default AllWeatherDataLinks
