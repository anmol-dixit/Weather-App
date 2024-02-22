const apiKey = "30a179c83084b1eb8cdb51ef7d0d1843";
const weatherDataEl = document.querySelector(".weather-data");
const form = document.querySelector("form");
let cityInputEl = document.querySelector(".city-name");


const ionEl = weatherDataEl.querySelector(".icon");
const temperatureEl = weatherDataEl.querySelector(".temperature");
const descryptionEl = weatherDataEl.querySelector(".descryption");
const detailsEl = weatherDataEl.querySelector(".details");


form.onsubmit = (e) => {
    e.preventDefault();
    const cityName = cityInputEl.value;
    getWeatherData(cityName);

}



const getWeatherData = async (city) =>{
   try{
         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
         if(!response.ok)
         {
            throw new Error("Network response is not Good");
         }
         const data = await response.json();
        //  console.log(data)
         const temperature = Math.round(data.main.temp);
         const descryption = data.weather[0].description;
         const icon = data.weather[0].icon;
         const details = [
            `Feels Like : ${Math.round(data.main.feels_like)}`,
            `humidity : ${data.main.humidity}`,
            `Wind Speed : ${data.wind.speed}m/s`,
         ]
         
         ionEl.innerHTML = `
         <img src="http://openweathermap.org/img/wn/${icon}.png" alt="icon">
         `

         temperatureEl.innerHTML = temperature + " °C";
         descryptionEl.innerHTML = descryption;
         detailsEl.innerHTML = `
         <div>${details[0]}</div>
         <div>${details[1]}</div>
          <div>${details[2]}</div>  
         `;
   }
   catch(error){
    ionEl.innerHTML = "";

    temperatureEl.innerHTML = "";
    descryptionEl.innerHTML = "";
    detailsEl.innerHTML = `<h1 style="color:red">Network error please try again later !</h1>`;
   }
}