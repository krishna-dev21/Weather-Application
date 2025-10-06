const yourtab = document.querySelector("[yourtab]");
const searchtab = document.querySelector("[searchtab]")
const searchweathercontainer = document.querySelector(".search-weather-container");
const grantaccesscontainer = document.querySelector(".grant-access-container")
const loadingconatiner = document.querySelector(".loadingconatiner");
const grantaccessbutton = document.querySelector(".grantaccessbutton")
const notfound = document.querySelector(".notfound")
const myweather = document.querySelector(".my-weather")
const searchweather = document.querySelector(".search-weather")
console.log(yourtab)

let currenttab = yourtab;
const API_key = "c7b412623be14dca4286aa0046a13101";
currenttab.classList.add("dono-tab-piche-ka-style")
// grantaccesscontainer.classList.add("active");
getfromsessionstorage()

function switchtab(newtab)
{
    if(newtab != currenttab)
    {
       currenttab.classList.remove("dono-tab-piche-ka-style");
       currenttab = newtab;
       currenttab.classList.add("dono-tab-piche-ka-style");

       if(!searchweathercontainer.classList.contains("active") )
        {
            myweather.classList.remove("active");
            grantaccesscontainer.classList.remove("active");
            myweather.classList.remove("trans")

            // loadingconatiner.classList.remove("active");
            
            searchweathercontainer.classList.add("active")
        }
        else{
            searchweathercontainer.classList.remove("active")

            myweather.classList.remove("active");
            getfromsessionstorage();
    
        }
    }

    // if(!searchweathercontainer.classList.contains("active") )
    // {
    //     grantaccesscontainer.classList.remove("active");
    //     loadingconatiner.classList.remove("active");
    //     myweather.classList.remove("active");
    //     searchweathercontainer.classList.add("active")
    // }
    // else{
    //     searchweathercontainer.classList.remove("active")
    //     getfromsessionstorage();

    // }
}

function getfromsessionstorage()
{   
    const storage = sessionStorage.getItem("user-coordinates")

    if(!storage)
    {
        grantaccesscontainer.classList.add("active");
    }
    else
    {
        const coordinates = JSON.parse(storage);
        fetchmyweather(coordinates);
        // fetchmyweather(JSON.parse(coordinates));
    }
}

yourtab.addEventListener("click", ()=>{
    switchtab(yourtab);
})


searchtab.addEventListener("click", ()=>{
    switchtab(searchtab);
})


grantaccessbutton.addEventListener("click", findmylocation);

function findmylocation()
{   
// console.log("hi")
    
    if(navigator.geolocation)
    {   
// console.log("hi")
        // navigator.geolocation.getCurrentPosition((position)=>{
        //        const coordinates = 
        //        {
        //         lat : position.coords.latitude,
        //         lon : position.coords.longitude,
        //        }
        //        sessionStorage.setItem("user-coordinates", JSON.stringify(coordinates));
        //     //    console.log("hi")
        //        fetchmyweather(coordinates);
        // })

        navigator.geolocation.getCurrentPosition((position) => {
            const coordinates = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            };
            sessionStorage.setItem("user-coordinates", JSON.stringify(coordinates));
            fetchmyweather(coordinates);
        }, null, { enableHighAccuracy: true });
        
    }
}

async function fetchmyweather(coordinates)
{
   const {lat , lon} = coordinates;

   grantaccesscontainer.classList.remove("active");
   loadingconatiner.classList.add("active");

   try
   {
     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
     const data = await response.json();

     loadingconatiner.classList.remove("active");
     myweather.classList.add("active");
     rendermyweather(data)
   }
   catch(e)
   {
    loadingconatiner.classList.remove("acive")
   }

//    loadingconatiner.classList.remove("active")
//    myweather.classList.add("active");
//    rendermyweather(data);
}

function rendermyweather(data)
{
     const cityname = document.querySelector("[cityname]")
     const countryimg = document.querySelector("[countryimg]");
     const condition = document.querySelector("[condition]")
     const climateimg = document.querySelector("[climateimg]");
     const temperature = document.querySelector("[temperature]")
     const windspeed = document.querySelector("[windspeed]")
     const humidity = document.querySelector("[humidity]");
     const cloundspercentage = document.querySelector("[cloundspercentage]")


     cityname.innerText = data?.name;
     countryimg.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
     condition.innerText = data?.weather?.[0]?.description;
     climateimg.src = ` https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`
     temperature.innerText = `${data?.main?.temp} °kelvin`;
     windspeed.innerText = `${data?.wind?.speed} m/s`;
     humidity.innerText = `${data?.main?.humidity} %`
     cloundspercentage.innerText = `${data?.clouds.all} %`
     
}

// search section

const inputdebhaimeko = document.querySelector(".inputdebhaimeko")

const citysearchinput = document.querySelector("[citysearchinput]")
searchweathercontainer.addEventListener("submit", (e)=>{
    e.preventDefault();
    let city = citysearchinput.value;
    myweather.classList.add("trans")
    if(city === "")
    {
        return;
    }
    else
    {
       fethchsearchweather(city);
    }
});


async function fethchsearchweather(city)
{
    loadingconatiner.classList.add("active");
    myweather.classList.remove("active")
//    searchweathercontainer.classList.remove("active");
   grantaccesscontainer.classList.remove("active");
  

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
          );

          const data = await response.json();

          loadingconatiner.classList.remove("active");
          myweather.classList.add("active");
          rendermyweather(data);
        }
        catch(e)
        {
            // grantaccesscontainer.classList.remove("active");
            // myweather.classList.remove("active");
            // loadingconatiner.classList.remove("active")
            // searchweathercontainer.classList.remove("active")
            // notfound.classList.add("active")
        }

    // loadingconatiner.classList.remove("active");
    // searchweather.classList.add("active");
    // rendersearchweather(data2);
}



// function rendersearchweather(data2)
// {
//     // searchweather.classList.add("active");

//      const searchcityname = document.querySelector("[searchcityname]")
//      const searchcountryimg = document.querySelector("[searchcountryimg]");
//      const searchcondition = document.querySelector("[searchcondition]")
//      const searchclimateimg = document.querySelector("[searchclimateimg]");
//      const searchtemperature = document.querySelector("[searchtemperature]")
//      const searchwindspeed = document.querySelector("[searchwindspeed]")
//      const searchhumidity = document.querySelector("[searchhumidity]");
//      const searchcloundspercentage = document.querySelector("[searchcloundspercentage]")


//      searchcityname.innerText = data2?.name;
//      searchcountryimg.src = `https://flagcdn.com/144x108/${data2?.sys?.country.toLowerCase()}.png`;
//      searchcondition.innerText = data2?.weather?.[0]?.description;
//      searchclimateimg.src = ` https://openweathermap.org/img/wn/${data2?.weather?.[0]?.icon}.png`
//      searchtemperature.innerText = `${Math.round((data2?.main?.temp)- 273.15)} °C`;
//      searchwindspeed.innerText = `${data2?.wind?.speed} m/s`;
//      searchhumidity.innerText = `${data2?.main?.humidity} %`
//      searchcloundspercentage.innerText = `${data2?.clouds.all} %`
     
// }