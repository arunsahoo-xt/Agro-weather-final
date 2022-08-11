import React from 'react'
import MapGL, { Source, Layer,GeolocateControl } from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Link
} from "react-router-dom";
//  import "./style.css";
import "./sidebar.css";
// import "../App.css";
import ShowMap from './ShowMap';
import Weather from './Weather';
import AllStats from './AllStats';
import Loading from './loginss/Loading';
import StatsImage from './StatsImage';
import Ndvicall from './stats/Ndvicall';
import Navbar from './Navbar';
import { Button } from 'react-bootstrap';
import AllWeatherDataLinks from './GraphicalData/AllWeatherDataLinks';
import AllPolygonData from './AllPolygonData';
import WebMercatorViewport from "viewport-mercator-project";
import CurrentWeather from './GraphicalData/CurrentWeather';
import { ButtonToolbar, Modal, Placeholder } from 'rsuite';



const Polygon = ({ allInfo }) => {
  const [viewport, setViewport] = React.useState({
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [viewPoly, setViewPoly] = React.useState({});
  const [ndviInfo, setNdviInfo] = React.useState([]);
  const [polyInfo, setPolyInfo] = React.useState({});
  const [statsInfo, setStatsInfo] = React.useState({});
  const [imageInfo, setImageInfo] = React.useState({});
  const [polyId, setPolyId] = React.useState("");
  const [loadingData, setLoadingData] = React.useState(false);
  const [ndviloadingData, setNdviLoadingData] = React.useState(false);
  const [isvisible, setvisibility] = React.useState({
    "polypage": true,
    "statspage": false,
    "forecastpage": false
  })
  const apikey ="1f0c9dbc13546bee076b99c95c97aa4c";
  console.log(apikey)

  React.useEffect(() => {
    console.log(polyInfo);
    console.log(statsInfo);
    console.log(imageInfo);
    viewPort(polyInfo);

  }, [loadingData, imageInfo, statsInfo]);

  const viewPort = (ele) => {
    if (loadingData == true) {

      const cordarray = polyInfo.geo_json.geometry.coordinates[0];
      const cord = cordarray.map((ele) => {
        var coordinates = {
          lng: ele[0],
          lat: ele[1]
        }
        return (
          coordinates
        )
      })
      console.log(cord);
      const lat = cord.map(location => parseFloat(location.lat));
      const lng = cord.map(location => parseFloat(location.lng));

      // Note that WebMercatorViewport requires this format [lng, lat]
      const minCoords = [Math.min.apply(null, lng), Math.min.apply(null, lat)];
      const maxCoords = [Math.max.apply(null, lng), Math.max.apply(null, lat)];
      const formattedGeoData = [minCoords, maxCoords];

      const vPort = new WebMercatorViewport({
        width: 500,
        height: 400
      }).fitBounds(formattedGeoData, {
        padding: 100
      });
      const { latitude, longitude, zoom } = vPort;

      var setlonlat = {
        latitude: latitude,
        longitude: longitude,
        zoom: zoom,
      }
      setViewport(setlonlat);

      var polygonCoordinates = [];
      polygonCoordinates = polyInfo.geo_json.geometry.coordinates;

      var body1 = { type: "Feature", geometry: { type: "Polygon", coordinates: polygonCoordinates } }
      setViewPoly(body1);
    }
  }
  //EXPERIMENTAL AREA***********************************
  const newallFunctionCall = (ele) => {
    console.log("getting called bro-->>>" + ele);
    ndviStats(ele);
    getPolygonInfo(ele)
    setPolyId(ele);
  }

  const ndviStats = async (polyId) => {
    try {
      setNdviLoadingData(false);
      var currentDate = Math.floor(new Date().getTime() / 1000.0);
      var minus20days = currentDate - 2678400 - 2678400;
      //2678400
      console.log(currentDate);
      let ndviurl1 = `https://api.agromonitoring.com/agro/1.0/image/search?start=${minus20days}&end=${currentDate}&polyid=${polyId}&appid=${apikey}`

      const ndviResponse1 = await fetch(ndviurl1);
      const allData = await ndviResponse1.json();
      console.log(allData);
      // console.log(ndviResponse1);
      setImageInfo(allData[0].image);
      setStatsInfo(allData[0].stats);
      setNdviLoadingData(true);
      //  console.log(statsInfo)
      console.log(imageInfo);
    }
    catch (error) {
      //put an errrror message box later
      console.log(error);
    }
  }
  const getPolygonInfo = async (ele) => {
    setLoadingData(false);
    console.log("i am inside polygonInfo");
    console.log(ele);
    try {
      const url = `http://api.agromonitoring.com/agro/1.0/polygons/${ele}?appid=${apikey}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.geo_json.geometry.coordinates);
      const cordarray = data.geo_json.geometry.coordinates[0];
      const cord = cordarray.map((ele) => {
        var coordinates = {
          lng: ele[0],
          lat: ele[1]
        }
        return (
          coordinates
        )
      })
      console.log(cord);
      const lat = cord.map(location => parseFloat(location.lat));
      const lng = cord.map(location => parseFloat(location.lng));

      // Note that WebMercatorViewport requires this format [lng, lat]
      const minCoords = [Math.min.apply(null, lng), Math.min.apply(null, lat)];
      const maxCoords = [Math.max.apply(null, lng), Math.max.apply(null, lat)];
      const formattedGeoData = [minCoords, maxCoords];

      const vPort = new WebMercatorViewport({
        width: 500,
        height: 400
      }).fitBounds(formattedGeoData, {
        padding: 20
      });
      //  console.log(vPort);


      setPolyInfo(data);

      console.log('finished');
      setLoadingData(true);
    }
    catch (error) {
      console.log(error);
    }
    //    console.log(polyInfo)
    
  };

  const changevisibility = (ele) => {
    if (ele == "statspage") {
      setvisibility({ "statspage": true, "polypage": false, "forecastpage": false })
    }
    else if (ele == "polypage") {
      setvisibility({ "polypage": true, "statspage": false, "forecastpage": false })
    }
    else if (ele == "forecastpage") {
      setvisibility({ "forecastpage": true, "polypage": false, "statspage": false })
    }
  }

  const openNav = () => {
    console.log("yesss")
    document.getElementById("mySidepanel").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("navigationlist").style.opacity = "1";
    
  }

  /* Set the width of the sidebar to 0 (hide it) */
  const closeNav = () => {
    document.getElementById("mySidepanel").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    // document.getElementById("navigationlist").style.opacity = "0";
   
  
  }

  //**************************************************************** */


  return (
    <div>
      <Navbar/>
    <div id='main' >


      <div id="mySidepanel" class="sidepanel rounded-right">
        <a href="#" class="closebtn" onClick={() => closeNav()}>&times;</a>
        <ul class="sidebar-navigation" id="navigationlist">
          <li class="header">Navigation</li>
          <li>
            <a onClick={() => {changevisibility("polypage");closeNav();}}>
            <small><i class="fa fa-tachometer" aria-hidden="true"></i></small>Dashboard
            </a>
          </li>
          <li>
            <a  onClick={() => {changevisibility("forecastpage");closeNav();}}>
             <small> <i class="fa-solid fa-satellite" aria-hidden="true"></i></small>  Weather Data
            </a>
          </li>
          <li>
            <a  onClick={() => {changevisibility("statspage");closeNav();}}> 
             <small> <i class="fa-solid fa-temperature-half" aria-hidden="true"></i></small>  Satellite Data
            </a>
          </li>
          <li class="header">Another Menu</li>
         
          <li><Link className="nav-item nav-link " to="/create"><small><i class="fa-solid fa-draw-polygon"></i></small> Create Polygon </Link></li>
          <li><Link className="nav-item nav-link" to="/notes"><small><i class="fa-solid fa-note-sticky"></i> </small> Farm Notes</Link></li>
          <li><Link className="nav-item nav-link" to="/info"><small><i class="fa-solid fa-circle-info"></i> </small> Information</Link></li>
          
          <li> 
        <a className="nav-item nav-link" onClick={()=>{setOpen(true);closeNav();}}><i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out</a>
      
      <Modal open={open} onClose={()=>{setOpen(false);}}>
        <Modal.Header>
          <Modal.Title className='font-monospace'> <i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body className='font-monospace'>
          <h5>Are you sure you want to Log out</h5>
        </Modal.Body>
        <Modal.Footer>
        <Link className="btn btn-primary m-1" appearance="primary" to="/login"
         onClick={() => { localStorage.removeItem("userInfo");}}>Ok</Link> 
          <Button onClick={()=>{setOpen(false)}} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
            </li> </ul>


        {/* <div className="custom-menu"> */}

        {/* <button id="openbtn" class="btn btn-primary" onClick={()=>openNav()}><i class="fa fa-bars"></i></button> */}
        {/* </div> */}
      </div>
      






      <div className="container-fluid  bg-transparent">
      <button id="openbtn" class="openbtn rounded" onClick={() => openNav()}><i class="fa fa-bars"></i></button>
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className='card darkbg rounded '>
              <div className='card-body '>
                <MapGL
                  style={{ width: "auto", height: "40vh" }}
                  mapStyle="mapbox://styles/vodka1239/ckwrxbt7m2o0w14mkego6tq66"
                  accessToken={
                    "pk.eyJ1Ijoidm9ka2ExMjM5IiwiYSI6ImNrdzJmN2R1NTFlcTMzMG50eDl6dWJjcmEifQ.NGfXBblYkTumrHt-8kYh-A"
                  }
                  onViewportChange={setViewport}
                  {...viewport}
                  viewportChangeMethod='flyTo'
                >
                   {/* <FullscreenControl position='top-right' /> */}
                   <GeolocateControl position='top-right' />
                    
                  {/* <NavigationControl showZoom={true}  /> */}
                  <Source 
                  id="maine" type="geojson" data={viewPoly} />
                   <Layer
                    id="maine"
                    type="fill"
                    source="maine"
                    paint={{
                      "fill-color": "blue",
                      "fill-opacity": 0.5,
                    }}
                  />
                  {/* *************************** FOR FUTURE REFERENCE **********************************/}
                  {/* <Source 
                  id='raster'
                  type='raster'
                  tileSize={126}
                  tiles={[`${imageInfo.ndvi}`]}
                /> 
                 <Layer id='raster' type='raster' source='raster' /> */}
                {/* ************************************************************************************* */}
                 
                 
                </MapGL>
              </div></div>
          </div>
          <div className="col-sm-4 " style={{ height: "44vh" }}>
            <div className='card h-100 overflow-auto darkbg rounded hidescroll'>
              <div className='card-body'>
                {
                  allInfo.map((ele) => {
                    return (
                      <div key={ele.id}><button className="btn btn-info fcsbtn m-1 " style={{ width: "100%" }} onClick={() => newallFunctionCall(`${ele.id}`)}>{ele.name}</button></div>
                    );
                  })
                }
              </div></div>
          </div>
        </div>
      </div>

      {isvisible.statspage && !ndviloadingData && <div className='container-fluid darkbg' style={{height:300}}> 
      <Placeholder.Paragraph className="rs-theme-high-contrast" style={{ marginTop: 30 }} rows={10}  active /> </div>} 
      {isvisible.statspage && ndviloadingData && <AllStats allstatsInfo={statsInfo} allImageInfo={imageInfo} polyid={polyId} view={viewport} />}
      {/* <Ndvicall polyId={polyId}/> */}
      {isvisible.forecastpage && <CurrentWeather polyid={polyId} />}
      {isvisible.forecastpage && <AllWeatherDataLinks polyid={polyId} />}
      {isvisible.polypage && <AllPolygonData polyData={allInfo} />}
      {/* <StatsImage/> */}
    </div></div>
  )
}

export default Polygon
