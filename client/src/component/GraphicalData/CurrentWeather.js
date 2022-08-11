import React from 'react'

const CurrentWeather = ({polyid}) => {
    const apikey = "1f0c9dbc13546bee076b99c95c97aa4c";
    const polyId=polyid;
    const [weatherData,setWeatherData]=React.useState({
      "Time":NaN,
      "MaxTemp":NaN,
      "MinTemp":NaN,
      "Temp":NaN,
      "Humidity":NaN,
      "Pressure":NaN,
      "WindSpeed":NaN,
      "WDescp":NaN,
      "clouds":NaN, 
      "emoji":NaN
    });
    const [soilData,setSoilData]=React.useState({});
    const [isLoading,setLoading]=React.useState(true);
    React.useEffect(() => {
     getWeatherdata();
     getSoilData();
    }, [polyId])
    

    const getWeatherdata=async()=>{
        setLoading(true);
        try{
        const url=`https://api.agromonitoring.com/agro/1.0/weather?polyid=${polyId}&units=metric&appid=${apikey}`
        const res=await fetch(url);
        const data=await res.json();
        console.log(data);
        
          var wedata={
            "Time":new Date(data.dt * 1000).toString().substr(0,21),
            "MaxTemp":data.main.temp_max,
            "MinTemp":data.main.temp_min,
            "Temp":data.main.temp,
            "Humidity":data.main.humidity,
            "Pressure":data.main.pressure+"hPa",
            "WindSpeed":data.wind.speed,
            "WDescp":data.weather[0].description,
            "clouds":data.clouds.all, 
            "emoji":data.weather[0].main
          }
        setWeatherData(wedata);
        
        setLoading(false);
        }
        catch(err){
          console.log(err);
        }
    }


    const getSoilData=async()=>{
        setLoading(true);
        const url=`http://api.agromonitoring.com/agro/1.0/soil?polyid=${polyId}&appid=${apikey}`
        const res=await fetch(url);
        const data=await res.json();
        console.log(data);
        setSoilData(data);
        
        setLoading(false);
    }
    let emoji=null;
    if(typeof weatherData.emoji!='undefined'){
        if(weatherData.emoji=="Clouds"){emoji="fa-cloud"}
        else  if(weatherData.emoji=="Clear"){emoji="fa-sun"}
        else if(weatherData.emoji=="Thunderstorm"){emoji="fa-bolt"}
        else if(weatherData.emoji=="Drizzle"){emoji="fa-cloud-rain"}
        else if(weatherData.emoji=="Rain"){emoji="fa-cloud-showers-heavy"}
        else if(weatherData.emoji=="Snow"){emoji="fa-snow-flake"}
        else {emoji="fa-smog"}
    }
    else{
        // return(<div>....Loading</div>)
    }
   
    
  return (
    <div>
        {/* {!isLoading && <div>
            <div><h3>Time:{weatherData.Time}</h3></div>
    <div><h1>Temperature:{weatherData.Temp}&deg;C</h1></div>
    <div><h1>Min Temperature:{weatherData.MinTemp}&deg;C</h1></div>
    <div><h1>Max Temperature:{weatherData.MaxTemp}&deg;C</h1></div>
    </div> 
    }{!isLoading &&
    <div>
        <h3>Time:{new Date(soilData.dt * 1000).toString().substr(0,21)}</h3>
<h3>Surface temperature, Celsius:{(soilData.t0-273.15).toFixed(2)}</h3>
<h3>Temperature on the 10 centimeters depth, Celsius:{(soilData.t10-273.15).toFixed(2)}</h3>
<h3>Soil moisture, m3/m3:{soilData.moisture}</h3>
    </div>
        } */}
        <div className='container my-5'>
        <div class="row justify-content-center">
  <div class="col-md-6 my-1 ">
    <div class="card text-white text-center darkbg">
      <div class="card-body  ">
          <div className='bg-dark bg-opacity-50 p-3'>
        <h5 class="card-title">Current Weather</h5>
        <p class="card-text lead ">{weatherData.Time}</p><hr/>
        <i className={`fas ${emoji} fa-4x`}></i>
        <h1 className='fw-bolder mb-5'>{weatherData.Temp}&deg;C</h1>
        <p className='lead fw-bolder mb-0'>{weatherData.WDescp}</p>
        <p class="lead">{weatherData.MinTemp}&deg;C | {weatherData.MaxTemp}&deg;C</p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="col-md-6 my-1">
    <div class="card text-white text-center darkbg">
      <div class="card-body">
      <div className='bg-dark bg-opacity-50 p-3'>
        <h5 class="card-title">Soil Data</h5>
        <p class="card-text lead">{new Date(soilData.dt * 1000).toString().substr(0,21)}</p><hr/>
        <p class="font-monospace">Surface temperature</p>
        <h1 className='fw-bolder mb-2'>{(soilData.t0-273.15).toFixed(2)}&deg;C</h1>
        <p class="font-monospace">Temperature on the<br/>10 centimeters depth</p>
        <h2 className='fw-light mb-3'>{(soilData.t10-273.15).toFixed(2)}&deg;C</h2>
        <h4 class="fw-lighter">Soil moisture {soilData.moisture} m3/m3</h4>
      </div></div>
    </div>
  </div>
</div></div>
    </div>

  )
}

export default CurrentWeather