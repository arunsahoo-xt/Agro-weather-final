import React from 'react'
import MapGL,{ Source, Layer, NavigationControl } from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Link
} from "react-router-dom";
 import "./style.css";
import ShowMap from './ShowMap';
import Weather from './Weather';
import { BoxZoomHandler } from 'mapbox-gl';

const Polygon = ({ allInfo }) => {
  const [viewport, setViewport] = React.useState({
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });
  const [viewPoly, setViewPoly] = React.useState({});
 
  // const data = {
  //   type: "Feature",
  //   geometry: {
  //     type: "Polygon",
  //     coordinates:
  //       [
  //         [
  //           [84.891832, 22.260034],
  //           [84.891789, 22.261186],
  //           [84.893852, 22.262622],
  //           [84.892374, 22.263025],
  //           [84.889844, 22.262947],
  //           [84.889237, 22.262406],
  //           [84.88878, 22.261254],
  //           [84.889386, 22.259296],
  //           [84.893086, 22.258873],
  //           [84.893246, 22.259542],
  //           [84.893395, 22.259838],
  //           [84.893161, 22.26027],
  //           [84.892523, 22.260762],
  //           [84.892225, 22.260782],
  //           [84.891832, 22.260034],
  //         ],
  //       ],
  //   },
  // };

  const allFunctionCall = (ele1,ele2,ele3) => {
    console.log(ele3);
    var setlonlat={
      latitude: ele2,
      longitude: ele1,
      zoom: 13, 
    }
    setViewport(setlonlat);

    var polygonCoordinates=[];
    var dataMap2 = allInfo.map((cordele) =>{
      if(cordele.id === ele3 ){
      return(
      polygonCoordinates=cordele.geo_json.geometry.coordinates
      );
    }  
  })
  var body1 = { type: "Feature", geometry: { type: "Polygon", coordinates: polygonCoordinates } }
  setViewPoly(body1);
  }


  
  return (
    <div className="yoyo">
    
   
   <div className="mapbox">
      <MapGL
        style={{ width: "100%", height: "400px" }}
        mapStyle="mapbox://styles/vodka1239/ckwrxbt7m2o0w14mkego6tq66"
        accessToken={
          "pk.eyJ1Ijoidm9ka2ExMjM5IiwiYSI6ImNrdzJmN2R1NTFlcTMzMG50eDl6dWJjcmEifQ.NGfXBblYkTumrHt-8kYh-A"
        }
        onViewportChange={setViewport}
        {...viewport}  
      
      >
        
        <Source id="maine" type="geojson" data={viewPoly}/>
        
        <Layer
          id="maine"
          type="fill"
          source="maine"
          paint={{
            "fill-color": "blue",
            "fill-opacity": 0.5,
          }}
        />
        
      {/* <NavigationControl showZoom={true} />
      <BoxZoomHandler isEnable={true}/> */}
      </MapGL>
      
      </div>
      
      
       

  <div className="polyname">
      {
        allInfo.map((ele) => {
          return (
            <div key={ele.id}><button  className="btn btn-info" style={{width:"100%"}} onClick={() => allFunctionCall(`${ele.center[0]}`,`${ele.center[1]}`,`${ele.id}`)}>{ele.name}</button></div>
          );
        })
      }
      </div>
      
     
       <Link className="text-success" to="/map">
       Create Polygon
      </Link>
      
    </div>
  )
}

export default Polygon
