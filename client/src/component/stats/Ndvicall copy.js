import React from 'react'

const Ndvicall = ({polyId}) => {
  
    React.useEffect(() => {
        getNdviData();
        
    }, []);
    const apikey = "7436a3b54d0b0bb376d8185b1fbe2aa9";
    var polyId=polyId;
    console.log("yoo");
    console.log(polyId);
    const getNdviData = async () => {
        try{
    let ndviurl = `https://api.agromonitoring.com/agro/1.0/ndvi/history?polyid=${polyId}&start=1530336000&end=1534976000&appid=${apikey}`
    const res = await fetch(ndviurl);
            const data = await res.json();
            console.log(data);
    }
    catch(err){
        console.log(err);
            }}
    return (
        <div>
            <h1>Getting calleed</h1>
        </div>
    )
}

export default Ndvicall
