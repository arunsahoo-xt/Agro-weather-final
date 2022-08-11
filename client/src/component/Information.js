import React from 'react'
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import Navbar from './Navbar';

const Information = () => {

  return (
    <>
    <Navbar/>
    {/* <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={img1} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src={img2} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src={img3} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div> */}

    <div className='container darkbg text-white lildepth'>
      
      <div className='info-head lead my-2'>What is Remote Farming? </div>
      It is defined as monitoring and managing of farm remotely through the application of Internet, with less/ without direct human intervention.
      It is a phenomenon that has numerous applications including photography, surveying, geology, forestry and many more.
      But it is in the field of agriculture that remote sensing has found significant use. There are very many applications of remote sensing in the agricultural sector.<br/>
      Below is a summary of these applications<hr />
      </div>
      <div className='container darkbg text-white lildepth'>
      1.    Crop production forecasting: Remote sensing is used to forecast the expected crop production and yield over a given area and determine how much of the crop will be harvested under specific conditions. Researchers can be able to predict the quantity of crop that will be produced in a given farmland over a given period of time.
<hr/>
      2.    Assessment of crop damage and crop progress: In the event of crop damage or crop progress, remote sensing technology can be used to penetrate the farmland and determine exactly how much of a given crop has been damaged and the progress of the remaining crop in the farm.
      <hr/>
     
     
     
      3.   Identification of planting and harvesting dates: Because of the predictive nature of the remote sensing technology, farmers can now use remote sensing to observe a variety of factors including the weather patterns and the soil types to predict the planting and harvesting seasons of each crop.
      <hr/>
     
      
      4.    Soil moisture estimation: Soil moisture can be difficult to measure without the help of remote sensing technology. Remote sensing gives the soil moisture data and helps in determining the quantity of moisture in the soil and hence the type of crop that can be grown in the soil.
      <hr/>
      5.    Irrigation monitoring and management: Remote sensing gives information on the moisture quantity of soils. This information is used to determine whether a particular soil is moisture deficient or not and helps in planning the irrigation needs of the soil.
      <hr/>
      6.    Soil mapping: Soil mapping is one of the most common yet most important uses of remote sensing. Through soil mapping, farmers are able to tell what soils are ideal for which crops and what soil require irrigation and which ones do not. This information helps in precision agriculture.
      <hr/></div>
      <div className='container darkbg text-white lildepth'><br/>
      7.    Monitoring of droughts: Remote sensing technology is used to monitor the weather patterns including the drought patterns over a given area. The information can be used to predict the rainfall patterns of an area and also tell the time difference between the current rainfall and the next rainfall which helps to keep track of the drought.
      <hr/>
     
      8.    Determination of water content of field crops: Apart from determining the soil moisture content, remote sensing also plays an important role in the estimation of the water content in the field crops.
      <hr/>
      9.    Crop yield forecasting: Remote sensing technology can give accurate estimates of the expected crop yield in a planting season using various crop information such as the crop quality, the moisture level in the soil and in the crop and the crop cover of the land. When all of this data is combined it gives almost accurate estimates of the crop yield.
      <hr/>
      
      10.    Collection of past and current weather data: Remote sensing technology is ideal for collection and storing of past and current weather data which can be used for future decision making and prediction.
      <hr/>
     
     
      11.    Precision farming: Remote sensing has played a very vital role in precision agriculture. Precision agriculture has resulted in the cultivation of healthy crops that guarantees farmers optimum harvests over a given period of time.
      <hr/>
      12.    Climate change monitoring: Remote sensing technology is important in monitoring of climate change and keeping track of the climatic conditions which play an important role in the determination of what crops can be grown where.
      <hr/>
     
      13.    Air moisture estimation: Remote sensing technology is used in the estimation of air moisture which determines the humidity of the area. The level of humidity determines the type of crops to be grown within the area.
      <hr/></div>
      <div className='container darkbg text-white lildepth'>
      <div className="info-head lead my-4">What is NDVI (Normalized Difference Vegetation Index)?</div>
      In short ,Normalized Difference Vegetation Index (NDVI) quantifies vegetation by measuring the difference between near-infrared (which vegetation strongly reflects) and red light (which vegetation absorbs).
      <br />
      NDVI always ranges from -1 to +1. But there isn’t a distinct boundary for each type of land cover.

      For example, when you have negative values, it’s highly likely that it’s water. On the other hand, if you have an NDVI value close to +1, there’s a high possibility that it’s dense green leaves. But when NDVI is close to zero, there aren’t green leaves and it could even be an urbanized area.

      NDVI is the most common index that analysts use in remote sensing.
      <br />
      We see several sectors using NDVI. For example, in agriculture, farmers use NDVI for precision farming and to measure biomass.
      When water limits vegetation growth, it has a lower relative NDVI and density of vegetation.<br/><br/></div>
      <div className='container darkbg text-white lildepth'>
      <div className="info-head lead my-4">Advantages of remote Sensing in Agriculture</div>
      Monitoring of vegetation cover: Remote sensing plays a vital role in the area of crop classification, crop acreage estimation, and yield assessment. Many research experiments were done using aerial photographs and digital image processing techniques. However, the field of remote sensing helps in reducing the amount of field data to be collected and improves the higher precision of estimates.
<hr/>
      Crop production forecasting: Remote sensing allows researchers and farmers to forecast the expected crop production over a given area and determine how much crop can be harvested under specific conditions. Researchers can also predict the quantity of crops in given farmland over a given period, depending on many factors including crop variety, water, and nutrient status of the field, influence by weeds, pest and disease infestation, weather parameters.
      <hr/>
      Assessment of crop condition, damage, and crop progress: Remote sensing can play an important role in agriculture by providing timely spectral information to assess the biophysical indicators of plant health. In the event of crop damage or crop progress, remote sensing technology is used to penetrate the farmland and determine precisely how much of a given crop has been damaged and the progress of the remaining crop on the farm.
      <hr/>
      Crop identification: Remote sensing has played an essential role in crop identification, especially when the crop under observation shows some mysterious characteristics. The collected crop data will is taken to labs where various aspects of the crop, including the crop culture, are studied.
      <hr/>
      Crop acreage estimation: Remote sensing has also played a vital role in estimating the farmland on which a crop has been planted. This is usually a cumbersome procedure if carried out manually because of the vast sizes of the lands being estimated.
      <hr/>
      Crop yield modelling and estimation: Remote sensing also allows farmers and experts to predict the expected crop yield from given farmland by estimating the crop’s quality and the extent of the farmland. This is then used to determine the overall expected yield of the crop.
      <hr/>
      </div>
      <div className='container darkbg text-white lildepth'><br/>
      Identification of pests and disease infestation: Remote sensing has become an essential tool for monitoring and quantifying crop stress due to biotic and abiotic factors. It plays a significant role in identifying pests in farmland and gives data on the right pests control mechanism to get rid of the pests and diseases on the farm.
      <hr/>
      Weed identification and management: Precision weed management technique helps in carrying out better weed management practices. Remote sensing, coupled with precision agriculture, is a promising technology in nowadays. Though, ground surveying methods for mapping site-specific information about weeds are very time–consuming and labor-intensive. However, image-based remote sensing has potential applications in weed detection for site-specific weed management.
      <hr/>
      Soil moisture estimation: Soil moisture can be difficult to measure without remote sensing. Using remote sensing, farmers can acquire the soil moisture data, helping them determine the quantity of moisture in the soil and the type of crop grown in the soil.
      <hr/>
      Soil mapping: Soil mapping is one of the most common yet most essential uses of remote sensing. Through soil mapping, farmers can tell which soils are ideal for which crops and which soil require irrigation, and which ones do not. This information helps in precision agriculture.
      <hr/>
      Monitoring of droughts: Remote sensing technology can monitor the weather pattern of a given area. It monitors drought patterns too. The data can be used to predict the rainfall patterns of an area and tell the time difference between the current rainfall and the next rainfall. This helps keep track of the drought.
      <hr/>
      Water resources mapping: Remote sensing is key in mapping water resources over farmland that can be used for agriculture. Through remote sensing, the farmers can tell where water resources are available for use on a given land and if they are adequate.
<br/><br/>
</div><br/>
   
    </>
  )
}

export default Information