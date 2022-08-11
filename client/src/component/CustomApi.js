// const PolyId=[
//     {
//         id: "618bd686c3fbba000724476", 
//         geo_json: "pp", 
//         name: "Iowa Demo Field",
//          center: 990, 
//          area: 202.9805,
        
//     },
//     {
//         id: "618bd686c3fbba0007244761", 
//         geo_json: "pp", 
//         name: "Iowa Demo Field",
//          center: 990, 
//          area: 202.9805,
        
//     },
//     {
//         id: "618bd686c3fbba000724461", 
//         geo_json: "pp", 
//         name: "Iowa Demo Field",
//          center: 990, 
//          area: 202.9805,
        
//     },
//     {
//         id: "618bd686c3fbba007244761", 
//         geo_json: "pp", 
//         name: "Iowa Demo Field",
//          center: 990, 
//          area: 202.9805,
        
//     },
// ];
import React from 'react'

const CustomApi = () => {
    React.useEffect(() => {
        getPolyData();
      }, []);
    const getPolyData = async () => {
        try{
    const url = 'http://api.agromonitoring.com/agro/1.0/polygons?appid=7436a3b54d0b0bb376d8185b1fbe2aa9'
    const response1 = await fetch(url);
    const data1 = await response1.json();
   //const data1=data2[0].center;
   
    console.log(data1);
    

}

    catch(error){
console.log(error);
    }}
    return (
        <div>
            {/* <button className="btn1" type="button" onClick={getPolyData}>Polyyyyy</button> */}
            
        </div>
    )
        
}

 export default CustomApi

 