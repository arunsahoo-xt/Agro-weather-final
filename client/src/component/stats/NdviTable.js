import MapGL, { Layer, Source } from '@urbica/react-map-gl';
import React from 'react';
import { Figure } from 'react-bootstrap';
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from 'recharts';
import StatsImage from '../StatsImage';
//import { MDBDataTable } from 'mdbreact';
import "./ndvi.css";
const NdviTable = ({ idd, sendStats, imageLink, view }) => {

  const [viewport, setViewport] = React.useState({
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });
  const [viewtile, setViewtile] = React.useState('http://api.agromonitoring.com/tile/1.0/{z}/{x}/{y}/04061e20e80/62337cb1192b99104b61bbd6?appid=1f0c9dbc13546bee076b99c95c97aa4c');
  React.useEffect(() => {
    setViewport(view);
    setViewtile(imageLink);

  }, [view, imageLink])


  console.log(sendStats);
  console.log(imageLink);

  return (
    < div>
      <div className="container mt-3 bg-transparent">
        <div className="row justify-content-between">
          <div className="col-md-4 darkbg ">

            {/* {
        ndviInfo.map((sendStats)=>{    
            let date=new Date(sendStats.dt*1000);
            var time=`${date.getHours()}:${date.getMinutes()}`
            var time1=`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
            return(
                
        //   <div key={ele.id}><button onClick={()=> passid(`${ele.id}`)}>{ele.id}</button></div>);
        <div className="scrollable">
        Time:{time} <br></br>   
        Date: {time1} */}


            <table className="table " >
              <thead>
                <tr className='bg-primary text-white '>
                  <th scope='col'>{idd}</th>
                  <th scope='col'>STATS</th>
                </tr>
              </thead>
              <tbody className='text-white align-items-center '>
                <tr >
                  <th scope='row'>Max</th>
                  <td>{Math.round(sendStats.max * 1000) / 1000}</td>

                </tr>
                <tr >
                  <th scope='row'>Min</th>
                  <td>{Math.round(sendStats.min * 1000) / 1000}</td>

                </tr>
                <tr >
                  <th scope='row'>Mean</th>
                  <td>{Math.round(sendStats.mean * 1000) / 1000}</td>

                </tr>
                <tr >
                  <th scope='row'>Median</th>
                  <td>{Math.round(sendStats.median * 1000) / 1000}</td>

                </tr>
                <tr >
                  <th scope='row'>P25</th>
                  <td>{Math.round(sendStats.p25 * 1000) / 1000}</td>

                </tr>
                <tr >
                  <th scope='row'>P75</th>
                  <td>{Math.round(sendStats.p75 * 1000) / 1000}</td>

                </tr>
                <tr >
                  <th scope='row'>STD</th>
                  <td>{Math.round(sendStats.std * 1000) / 1000}</td>

                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6 darkbg ">

            <div className='card darkbg p-2 h-100'>
              <div className='card-body  p-5 bg-dark hidescroll table tile' style={{ backgroundImage: `url(${viewtile})` }}> </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NdviTable;
