import React, { useState } from 'react'
import ReactMapboxGl from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import Weather from './Weather';
import { useNavigate } from 'react-router-dom';
import Loading from '../component/loginss/Loading';
import ErrorMessage from './loginss/ErrorMessage';
import { Modal, Notification, toaster } from 'rsuite';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './Navbar';

// import "./style1.css";
const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoidm9ka2ExMjM5IiwiYSI6ImNrdzJmN2R1NTFlcTMzMG50eDl6dWJjcmEifQ.NGfXBblYkTumrHt-8kYh-A',
});

const ShowMap = () => {
  const [open, setOpen] = React.useState(false);
  const [mapLayers, setMapLayers] = React.useState([]);
  const [mapCord, setMapCord] = React.useState([]);
  const [polygonData, setPolygonData] = React.useState({});
  const [gotData, setGotData] = React.useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // React.useEffect(() => {
  //   if (gotData == true) {
  //     localStorage.setItem("userInfo", JSON.stringify(polygonData));
  //     console.log(polygonData);
  //   }


  // }, [gotData])


  let navigate = useNavigate();
  const onDrawCreate = ({ features }) => {
    console.log(features[0]);
    console.log(features[0].geometry.coordinates);
    const test = features[0].geometry.coordinates;
    var dataMap = test.map((ele) =>
      (ele)
    )
    setMapCord(dataMap);
  };

  const onDrawUpdate = ({ features }) => {
    console.log(features);
  };


  var stringifyDataMap = mapCord;
  // console.log(JSON.stringify(stringifyDataMap));


  const create_poly = async (name1) => {
    // setGotData(false);
    const id = toast.loading("Please wait...", { closeOnClick: true, draggable: true ,autoClose: 5000,});
    const polyName = `"name":"${name1}"`
    var body1 = `{${polyName},"geo_json":{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":${JSON.stringify(stringifyDataMap)}}}}`
    console.log(body1);
    console.log(polyName);
    try {
      const response = await fetch('http://api.agromonitoring.com/agro/1.0/polygons?appid=1f0c9dbc13546bee076b99c95c97aa4c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body1
      })

      const data = await response.json();
      console.log(data);
      if (response.status == 422 && data.message.substr(0, 1) == "A") { toastmessage("error", id, data.message) }
      else if (response.status == 422 && data.message == "Your polygon needs a name") { toastmessage("error", id, data.message) }

      else if (response.status == 422) {

        toastmessage("error", id, "Your Polygon intersects itself , duplicated or empty");
        // toast.update(id, {
        //   render: (data.message).substr(0, 30), type: "error", isLoading: false,
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined
        // });
        // toast.error((data.message).substr(0,30));
      }


      else {
        var polyid = {
          "name": data.name,
          "id": data.id,
          "area": data.area.toFixed(2),
          "created_on": new Date(data.created_at * 1000).toString().substr(4, 12)
        };
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // const idd=tempid._id;
        console.log(userInfo);
        console.log(polyid);
        const { _id } = userInfo;
        console.log(_id);
        // try {
          // setLoading(true);
          const response1 = await fetch(`/api/users/${_id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id, polyid })
          })
          const data1 = await response1.json();
          setLoading(false);
          if (response1.status == 400 || response1.status == 500) {
            toastmessage("error", id, "Error Occurred");

          }
          else {
            localStorage.setItem("userInfo", JSON.stringify(data1));
            toastmessage("success", id, "Polygon Created");
            // <Modal open={open} onClose={() => { setOpen(false); }}>
            //   <Modal.Header>
            //     <Modal.Title className='font-monospace'> <i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out</Modal.Title>
            //   </Modal.Header>
            //   <Modal.Body className='font-monospace'>
            //     <h5>Are you sure you want to Log out</h5>
            //   </Modal.Body>
            //   <Modal.Footer>
            //     {/* <Link className="btn btn-primary m-1" appearance="primary" to="/login"
            //       onClick={() => { localStorage.removeItem("userInfo"); }}>Ok</Link> */}
            //     {/* <Button onClick={() => { setOpen(false) }} appearance="subtle">
            //       Cancel
            //     </Button> */}
            //   </Modal.Footer>
            // </Modal>
          }
        // }
        // catch (err) {
        //   toastmessage("error", id, "Error Occurred");
        //   console.log(err)
        // }
        
        // localStorage.setItem("userInfo",JSON.stringify(polygonData));
      }
    }
    catch (err) {
      toastmessage("error", id, "Error Occurred");
      console.log(err)
    }
  }

  const toastmessage = (variant, id, message) => {
    toast.update(id, {
      render: message, type: variant, isLoading: false,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }
  return (
    <div>
<Navbar/>
      {/* {error&& <ErrorMessage variant="error">{error}</ErrorMessage>} */}

      {loading && <Loading />}

      <div className='container mt-5 vh-100 bg-transparent' >
        <div className='row d-flex justify-content-center'>
          <div className='col-sm-8 pb-3'>
            <div className='card shadow  bluebg rounded'>
              <div className='card-body '>
                <Map
                  style="mapbox://styles/vodka1239/ckwrxbt7m2o0w14mkego6tq66"
                  containerStyle={{
                    height: '70vh',
                    width: 'auto',

                  }}
                >
                  <DrawControl position={'top-right'} displayControlsDefault={false} controls={{
                    trash: true,
                    polygon: true
                  }} onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} />


                </Map>
              </div></div></div>
          <div className='col-sm-4  ' style={{ height: "75vh" }}>
            <div className='card h-100 p-3 shadow p-3 mb-5  bluebg rounded hidescroll overflow-auto text-white'>
              <h5 className="lead text-left"><small class="text-muted">New</small><br />Polygon</h5><hr />
              <div className='card-body'>
                <label className='lead'>Polygon name:</label><input type="text" className="form-control" name="name1" id="name1"></input>
                <hr className='my-2' />
                <p>Minimum area is 1 ha</p>

                <p>Maximum area is 3000 hа</p>

                <p>No self-intersections</p><hr className='my-2' />
                <ol class="list-group list-group-numbered">
                  <li class="list-group-item">Click on the polygon tool to activate draw mode.</li>
                  <li class="list-group-item">Place the pointer on the map and click the location of the first point to start drawing.</li>
                  <li class="list-group-item">Continue clicking at each corner of the shape until you have created the polygon.</li>
                  <li class="list-group-item">Click the first point to stop drawing.</li>
                  <li class="list-group-item">Double-click any point to edit.</li>
                </ol>
                <div className='row'>
                  <button className=" col font-monospace btn bluebtn mr-1 mt-2" onClick={() => {
                    navigate("/");
                  }}>
                    Cancel
                  </button>
                  <button className='col btn btn-pink-moon font-monospace ml-1 mt-2'
                    onClick={() => create_poly(document.getElementById('name1').value)}>Create</button>
                </div>
              </div></div>
          </div>

        </div></div>

      <div>

      </div>
      {/* <div><Weather /></div> */}
      <ToastContainer theme='colored' />
    </div>
  )
}

export default ShowMap
