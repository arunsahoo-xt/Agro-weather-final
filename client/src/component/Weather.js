import React from 'react'
import Weatherdata from './Weatherdata copy';
import Temp from './Temp';
import { useNavigate } from 'react-router-dom';
import Polygon from './Polygon copy';
import AllWeatherDataLinks from './GraphicalData/AllWeatherDataLinks';
import { toast, ToastContainer } from 'react-toastify';

const Weather = () => {
    const navigate = useNavigate();
    const [info, setInfo] = React.useState({});
    const [pdata, setPdata] = React.useState([]);
    // const [data, setData] = React.useState([]);
    const [loadingData, setLoadingData] =React.useState(false);
    var polyData=[];
    React.useEffect(() => {
        let userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
            
            navigate("/login")
            toastmessage( "Login First !!");
        }
        else{
        userInfo=JSON.parse(userInfo);
        polyData=userInfo.polyid;
        
        if(typeof polyData !== 'undefined' && polyData.length > 0){ 
            console.log(polyData);
            setPdata(polyData);   
        }
        else{
            
            navigate("/create");
            toast.info('Create Polygon First', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            // toastmessage("Create a Polygon First !");
        }}
        // getWeatherData();
    }, []);
    // React.useEffect(() => {
    //     console.log(pdata);
    //     let newState = pdata.map((e) => e); // map your state here
    //     // setData(newState); // and then update the state
    //     console.log(newState);
    //  },[]);

    const apikey = "7436a3b54d0b0bb376d8185b1fbe2aa9";
    const getWeatherData = async () => {
        console.log("i am inside weather");
        //  setPdata(polyData);
        try {
        //    let results=Promise.all(pdata.map(async(ele)=>{
        //         console.log(ele);
            // const url=`http://api.agromonitoring.com/agro/1.0/polygons/${ele.id}?appid=${apikey}`;
        //     // const url1 = `http://api.agromonitoring.com/agro/1.0/polygons?appid=${apikey}`
        //     // // const polyurl = 'http://api.agromonitoring.com/agro/1.0/polygons/'
        //     // // const soilurl = 'http://api.agromonitoring.com/agro/1.0/soil?'

        //     const response = await fetch(url);
        //     const data = await response.json();
        //     console.log(data.center);
        //     const center=data.center;
        //     setInfo({...info,center});
        // }))
        for (let ele of pdata) {
            const url=`http://api.agromonitoring.com/agro/1.0/polygons/${ele.id}?appid=${apikey}`;
            const response = await fetch(url);
             const data = await response.json();
             console.log(data);
             setInfo({...info,data});
        }
        console.log('finished');
       setLoadingData(true);
        }
        catch (error) {
            console.log(error);
        }
    };
 
    const toastmessage = (message) => {
        console.log(message);
        toast.info(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
      }


    return (
        <div>
            {/* <p>This is my first react code </p> */}
            <Polygon allInfo={pdata} />
           
           {/* <Weatherdata wedata={pdata} apikey={apikey}/> */} 
            {/* <Temp apikeyy={apikey}/> */}
            <ToastContainer theme='colored' />
        </div>
    )
}

export default Weather

