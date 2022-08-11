import React from 'react'

import NdviTable from './stats/NdviTable';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { CustomProvider, DateRangePicker } from 'rsuite';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const AllStats = ({ allstatsInfo, allImageInfo, polyid,view }) => {
  const {afterToday} = DateRangePicker;
  const [statsInfo, setStatsInfo] = React.useState([]);
  const [imageInfo, setImageInfo] = React.useState([]);
  const [imageInfo2, setImageInfo2] = React.useState('');
  const [statsInfo2, setStatsInfo2] = React.useState({});
  const [loadingData, setLoadingData] = React.useState(false);
  const [ndvihistory, setNdvihistory] = React.useState([ 
    {
  "Date":NaN,
  "Max":NaN,
  "Min":NaN,
  "Mean":NaN
}]);

  const [idInfo, setIdInfo] = React.useState("Satellite");
  var newStatsInfo;
  var newImageInfo;
  const apidata = allstatsInfo;
  // console.log(allImageInfo);
  const imageData = allImageInfo;
  const polyId = polyid;
  const apikey = "1f0c9dbc13546bee076b99c95c97aa4c";
  const fetchLinks = () => {

    const { ndvi, evi, evi2, nri, dswi, ndwi } = apidata;
    console.log(apidata);
    newStatsInfo = [
      { link: ndvi, id: "NDVI" }, { link: evi, id: "EVI" }, { link: evi2, id: "EVI2" }, { link: nri, id: "NRI" }, { link: dswi, id: "DSWI" }, { link: ndwi, id: "NDWI" }
    ];
    setStatsInfo(newStatsInfo);
    console.log(statsInfo)
    setLoadingData(true);
  }


  const fetchImageLinks = () => {
    const { ndvi, evi, evi2, nri, dswi, ndwi } = imageData;
    console.log(imageData);
    newImageInfo = [
      { link: ndvi, id: "NDVI" }, { link: evi, id: "EVI" }, { link: evi2, id: "EVI2" }, { link: nri, id: "NRI" }, { link: dswi, id: "DSWI" }, { link: ndwi, id: "NDWI" }
    ];
    setImageInfo(newImageInfo);
    console.log(imageInfo)
    setLoadingData(true);
  }

  React.useEffect(() => {
    fetchLinks();
    fetchImageLinks();
    
  }, []);
  React.useEffect(() => {
  console.log(ndvihistory);    
  }, [ndvihistory]);

  // const apirender=()=>{

  //         console.log(newStatsInfo);
  //         // setStatsInfo(newStatsInfo);
  //         console.log(statsInfo2);
  // }

  const passid2 = async (elelink, eleid) => {
    try {
      console.log(elelink);

      const ndviResponse2 = await fetch(elelink);
      const allData2 = await ndviResponse2.json();
      console.log(allData2);
      setStatsInfo2(allData2);
      setIdInfo(eleid);


    }
    catch (error) {
      console.log(error);
    }
  }

  const passid1 = async (elelink) => {
    try {
      console.log(elelink);

      const imageResponse = await fetch(elelink);
      console.log(imageResponse);
      const imageLinkData = await imageResponse.blob();
      const imageObjectURL = URL.createObjectURL(imageLinkData);
      // const imageLinkData = await imageResponse.json();
      // const imageObjectURL = URL.createObjectURL(imageLinkData);
      console.log(imageObjectURL);
      setImageInfo2(imageObjectURL);
      // setIdInfo(eleid);


    }
    catch (error) {
      console.log(error);
    }
  }

  const fetchData = (ele) => {

    statsInfo.map((ele2) => {
      if (ele2.id == ele) {
        console.log(ele2);
        passid2(ele2.link, ele2.id);
      }
    })

    imageInfo.map((ele1) => {

      if (ele1.id == ele) {
        passid1(ele1.link);

      }
    })
  }

  const changeDate = async (value) => {
    var date1 = Math.floor(value[0].getTime() / 1000.0);
    var date2 = Math.floor(value[1].getTime() / 1000.0);
    console.log(date1 + "-->>" + date2);

    try {
      let ndviurl = `https://api.agromonitoring.com/agro/1.0/ndvi/history?polyid=${polyId}&start=${date1}&end=${date2}&appid=${apikey}`
      const res = await fetch(ndviurl);
      const data = await res.json();
      console.log(data);


      var wedata= data.map((ele) => {
        var tm=new Date(ele.dt * 1000).getHours();
        var dt=new Date(ele.dt * 1000).toISOString().substr(0,10);
        var dtt=new Date(ele.dt * 1000).toString().substr(0,15);
      var obj={
        "Date":dtt,
        "Max":ele.data.max.toFixed(2),
        "Min":ele.data.min.toFixed(2),
        "Mean":ele.data.mean.toFixed(2),
      }
          return (
               obj
              );
          }).reverse();
          console.log(wedata);
         setNdvihistory(wedata);
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
       <div className='container-fluid my-3 ' style={{height:"auto"}}>
       <div class="row ">
       <div class="col-md my-1 ">
       <div class="card text-white text-center darkbg">
       <div class="card-body  ">

      <DropdownButton id="dropdown-item-button" title="Choose Stats">
        <Dropdown.Item as="button" onClick={() => fetchData("NDVI")}>NDVI</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => fetchData("EVI")}>EVI</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => fetchData("EVI2")}>EVI2</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => fetchData("NRI")}>NRI</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => fetchData("DSWI")}>DSWI</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => fetchData("NDWI")}>NDWI</Dropdown.Item>
       
      </DropdownButton>
      {loadingData && <NdviTable sendStats={statsInfo2} idd={idInfo} imageLink={imageInfo2} view={view} />}

      </div></div></div></div>
      <div>
      <CustomProvider theme="dark">
      <DateRangePicker showOneCalendar disabledDate={afterToday()} block placeholder="Select Date Range To Get Data And Please Wait Till It Fetches" ranges={[]} onOk={(value) => changeDate(value)} />
      </CustomProvider>
      </div>
      <div>
     
      <div className='card overflow-auto darkbg' style={{height:"auto"}}>
        <div className="card-body">
        <h2 className='lead'>NDVI History</h2>   
      <LineChart width={1300} height={400} data={ndvihistory}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
           <CartesianGrid opacity={0.2} vertical={false} />
       
        <XAxis dataKey="Date" />
        <YAxis type="number" domain={[-1,1]}/>
        <Tooltip content={<CustomTooltip/>} />
        <Legend iconType={'square'} />
        
        <Line type="monotone" dataKey="Max" stroke="#ff4200" />
        <Line type="monotone" dataKey="Mean" stroke="#02ee5a" />
        <Line type="monotone" dataKey="Min" stroke="#5b18f0" />
      </LineChart>
      
      </div>   
        </div>
      </div>
    </div>
  )
}
function CustomTooltip({active,payload,label}){
  if(active){
    return (
      <div className='box p-2' style={{color:"white"}}>
        <h6>{label}</h6>
        <p>Max:{payload[0].payload.Max}&deg;C</p>
        <p>Mean:{payload[0].payload.Mean}&deg;C</p>
        <p>Min:{payload[0].payload.Min}&deg;C</p>
       
      </div>
    )
  }
  else return null
  }
export default AllStats
