import React from 'react'
import AllStats from './AllStats';
// import Ndvicall from './stats/Ndvicall';
import NdviTable from './stats/NdviTable';
import Polygon from './Polygon copy';
import ShowMap from './ShowMap';
// import Temp from './Temp';


const Weatherdata = ({ wedata, apikey }) => {
  const [ndviInfo, setNdviInfo] = React.useState([]);
  const [infoSend, setInfo] = React.useState({});
  const [loadingData, setLoadingData] =React.useState(false);
  console.log("weather data page");

  
  const passid = async (polyId) => {
    passid1(`${polyId}`);
    let ndviurl = `https://api.agromonitoring.com/agro/1.0/ndvi/history?polyid=${polyId}&start=1530336000&end=1534976000&appid=${apikey}`
    const ndviResponse = await fetch(ndviurl);
    const ndviData = await ndviResponse.json();
    setNdviInfo(ndviData);

  }

  const passid1 = async (polyId) => {
    try {
      let ndviurl1 = `https://api.agromonitoring.com/agro/1.0/image/search?start=1500336000&end=1508976000&polyid=${polyId}&appid=${apikey}`
      const ndviResponse1 = await fetch(ndviurl1);
      const allData = await ndviResponse1.json();
      console.log(allData);
       setInfo(allData[0].stats);
       setLoadingData(true);
    }
    catch (error) {
      console.log(error);
    }
  }
  const passCoordinates = (lat, lon) => {
    const idk = [lat, lon];
    console.log(idk);
    setNdviInfo(idk);
    console.log(ndviInfo);


  }
  const allFunctionCall = (ele1, ele2, ele3) => {
    
    passid1(ele1);
    passCoordinates(ele2, ele3);
  }
  

  const newallFunctionCall = (ele1) => {
    console.log("getting called bro");
    passid1(ele1);
  }

  return (
    <div>
      {
 wedata.map((ele) => {
      console.log(ele);
      return (
        <div key={ele.id}><button onClick={() => newallFunctionCall(`${ele.id}`)}>{ele.name}</button></div>);
    
    })

  }


{/* <Polygon allInfo={wedata} /> */}
{/* <ShowMap/> */}
      {/* {
        wedata.map((ele) => {
          // console.log(ele.geo_json.geometry);
          return (
            <div key={ele.id}><button onClick={() => allFunctionCall(`${ele.id}`, `${ele.center[0]}`, `${ele.center[1]}`)}>{ele.name}</button></div>);
        })
      } */}
      {/* <NdviTable ndviInfo={ndviInfo}/> */}
      
      {loadingData && <AllStats allInfo={infoSend} />}
      
      {/* <Temp apikeyy={apikeyy} lat={ndviInfo}/> */}

    </div>
  )
}

export default Weatherdata
