let search = document.querySelector("#searchId");
let Weather = document.querySelector(".row");
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentDay;
let cartona="";
let afterday;
let finalDay;

// ====================== Function ======================
    
// get api
async function api(countryName)
{
    let x = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5d00b4d2a3604150927120437240201&q=${countryName}&days=3`)
    let y =await x.json();
    displayWeather(y);
}

// display data
function displayWeather(a)
{
    currentDay = new Date();
    // display current weather 
    cartona = `<div class="col-lg-4">
                    <div class="bg-content rounded-4 text-white">
                        <div class="d-flex justify-content-between bg-header px-3 py-1">
                            <h3>${days[currentDay?.getDay()]}</h3>
                            <h4>${currentDay?.getDate()} January</h4>
                        </div>
                        <h3 class="p-3">${a?.location?.name}</h3>
                        <div class="d-flex justify-content-between p-3">
                            <h4>${a?.current?.temp_c}<span class="topp">o</span>C</h4>
                            <img class="position-relative left" src="https:${a?.current?.condition?.icon}">
                        </div>
                        <h5 class="p-3">${a?.current?.condition?.text}</h5>
                        <div class="d-flex justify-content-between p-3">
                            <div>
                                <img src="https://routeweather.netlify.app/images/icon-umberella.png">
                                <span>20%</span>
                            </div>
                            <div>
                                <img src="https://routeweather.netlify.app/images/icon-wind.png">
                                <span>18km/h</span>
                            </div>
                            <div>
                                <img src="https://routeweather.netlify.app/images/icon-compass.png">
                                <span>East</span>
                            </div>
                        </div>
                    </div>
                </div>`   

                
    // diplay anthor days
    for (let i = 1; i < a?.forecast?.forecastday?.length; i++) 
    {
        afterday = a.forecast.forecastday[i].date
        currentDay = new Date(afterday)
        finalDay = days[currentDay.getDay()]
        cartona +=`<div class="col-lg-4">
                        <div class="text-white bg-content rounded-4 text-center">
                            <h3 class="text-center bg-header py-2">${finalDay}</h3>
                            <img class="py-3" src="https:${a?.forecast?.forecastday[i]?.day?.condition?.icon}">
                            <h3 class="p-2">${a?.forecast?.forecastday[i]?.day?.maxtemp_c}<span class="topp">o</span>C</h3>
                            <h5 class="p-2">${a?.forecast?.forecastday[i]?.day?.mintemp_c}<span class="topp">o</span>C</h5>
                            <h6 class="py-6">${a?.forecast?.forecastday[i]?.day?.condition?.text}</h6>
                        </div>
                    </div>` 
    }

    // check if name exist
    if(a?.location?.name != undefined)
    {
        Weather.innerHTML = cartona;
    }
    else
    {
        alert("Please Enter Valid Country");
    }
}

api("cairo");

// get location

if (navigator.geolocation) 
{
    navigator.geolocation.getCurrentPosition(showPosition)
} 
else 
{ 
    alert("Geolocation is not supported by this browser.");
}

// show position
function showPosition(position) 
{
    console.log(position)
    api(position.coords.latitude+","+position.coords.longitude);
}
// ====================== Events & Actions ======================

// search about weather for anthor country
search.addEventListener("change",function(){
     
    api(search.value);
    search.value = ""
})