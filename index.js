/* -------------------------------- Elements -------------------------------- */
const dateElement = document.querySelector("span.date")
const LocationElement = document.querySelector(".location")
const degreeElement = document.querySelector("h1")
const dayElement = document.querySelector(".day-weather h2")
const weatherElementTitle = document.querySelector(".day-weather h3")
const weatherHourlyElement = document.querySelector(".grid-container")
const buttonElement = document.querySelectorAll(".days button")
/* --------------------------- Location Variables --------------------------- */
let city = ""
let country = ""
let date = ""
let month = ""
let year = ""
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};
let workOnData = ""
const weekday = ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]
const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

/* -------------------------------- Handlers -------------------------------- */

buttonElement.forEach(button => {
    button.addEventListener("click", (e) => {
        handleDayChange(button.className)
        buttonElement.forEach(button => {
            button.classList.remove("active")
            if(button.classList.contains("activeToday")){
                button.classList.remove("activeToday")
                button.classList.add("today")
            }
            
        })
        if (button.classList.contains("today")) {
            button.classList.remove("today")
            button.classList.add("activeToday")
        }
        else{
            button.classList.add("active")
        }
    })
})

function handleHourClick(elements,currentWeatherState) {
    
    elements.forEach(element => {
        element.addEventListener("click", () => {
            elements.forEach(element => {
                element.classList.remove("activeHour")
            })
            element.classList.add("activeHour")
            console.log(element)
            degreeElement.textContent = document.querySelector(".activeHour span").textContent
            weatherElementTitle.textContent = currentWeatherState

        })
    })
}

function handleDayChange(dayClass){
    let year
    let day
    let month
    let date

    if(dayClass === "yesterday"){
        date = workOnData.forecast.forecastday[1].date
        date = date.split("-")
        year = date[0]
        day = date[2]
        date = new Date(date[0], date[1], date[2])
        month = date.getMonth()
        let textDay = date.getDay()
        dateElement.textContent = `${months[month - 1]} ${day}, ${year}`
        dayElement.textContent = weekday[textDay-2]
        degreeElement.textContent = `${workOnData.forecast.forecastday[1].day.avgtemp_c} °C`
        const weatherHourlyData = workOnData.forecast.forecastday[1].hour.slice(0, 10)
        const weatherHourlyDataArr = weatherHourlyData.map(day => {
            let hours = day.time.split(" ")[1].split(":")[0];
            hours = parseInt(hours)
            let AmOrPm = hours >= 12 ? 'pm' : 'am'
            hours = (hours % 12) || 12;
            return `<div class="hour">
                        <h4>${hours} ${AmOrPm}</h4>
                        ${day.temp_c > 20  ? `<i class='bx bxs-sun'></i>` : `<i class='bx bxs-moon'></i>`}
                        <span>${day.temp_c} °C</span>
                    </div>`;
        })
        weatherHourlyElement.innerHTML = weatherHourlyDataArr.join("")
        let state = workOnData.current.condition.text
        let hourElements = document.querySelectorAll(".hour")
        handleHourClick(hourElements,state)
    }
    else if(dayClass === "today"){
        date = workOnData.current.last_updated.split(" ")[0].toString()
        date = date.split("-")
        year = date[0]
        day = date[2]
        date = new Date(date[0], date[1], date[2])
        month = date.getMonth()
        let textDay = date.getDay()
        dateElement.textContent = `${months[month - 1]} ${day}, ${year}`
        dayElement.textContent = weekday[textDay-2]
        degreeElement.textContent = `${workOnData.current.temp_c} °C`
        const weatherHourlyData = workOnData.forecast.forecastday[0].hour.slice(0, 10)
        const weatherHourlyDataArr = weatherHourlyData.map(day => {
            let hours = day.time.split(" ")[1].split(":")[0];
            hours = parseInt(hours)
            let AmOrPm = hours >= 12 ? 'pm' : 'am'
            hours = (hours % 12) || 12;
            return `<div class="hour">
                        <h4>${hours} ${AmOrPm}</h4>
                        ${day.temp_c > 20  ? `<i class='bx bxs-sun'></i>` : `<i class='bx bxs-moon'></i>`}
                        <span>${day.temp_c} °C</span>
                    </div>`;
        })
        weatherHourlyElement.innerHTML = weatherHourlyDataArr.join("")
        let state = workOnData.current.condition.text
        let hourElements = document.querySelectorAll(".hour")
        handleHourClick(hourElements,state)
    }
    else if(dayClass === "tomorrow"){
        date = workOnData.forecast.forecastday[2].date
        date = date.split("-")
        year = date[0]
        day = date[2]
        date = new Date(date[0], date[1], date[2])
        month = date.getMonth()
        let textDay = date.getDay()
        dateElement.textContent = `${months[month - 1]} ${day}, ${year}`
        dayElement.textContent = weekday[textDay-2]
        degreeElement.textContent = `${workOnData.forecast.forecastday[1].day.avgtemp_c} °C`
        const weatherHourlyData = workOnData.forecast.forecastday[2].hour.slice(0, 10)
        const weatherHourlyDataArr = weatherHourlyData.map(day => {
            let hours = day.time.split(" ")[1].split(":")[0];
            hours = parseInt(hours)
            let AmOrPm = hours >= 12 ? 'pm' : 'am'
            hours = (hours % 12) || 12;
            return `<div class="hour">
                        <h4>${hours} ${AmOrPm}</h4>
                        ${day.temp_c > 20  ? `<i class='bx bxs-sun'></i>` : `<i class='bx bxs-moon'></i>`}
                        <span>${day.temp_c} °C</span>
                    </div>`;
        })
        weatherHourlyElement.innerHTML = weatherHourlyDataArr.join("")
        let state = workOnData.current.condition.text
        let hourElements = document.querySelectorAll(".hour")
        handleHourClick(hourElements,state)
    }
}

/* -------------------------- Get Current Position And Weather -------------------------- */
  
function success(pos) {
    const crd = pos.coords;
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=eda8d98890214bab926190059241708&q=${crd.latitude},${crd.longitude}&days=3`).then(res => res.json()).then(data => {
        workOnData = data
        city = data.location.name
        country = data.location.country
        date = data.current.last_updated.split(" ")[0].toString()
        date = date.split("-")
        year = date[0]
        day = date[2]
        date = new Date(date[0], date[1], date[2])
        month = date.getMonth()
        let textDay = date.getDay()
        dateElement.textContent = `${months[month - 1]} ${day}, ${year}`
        LocationElement.textContent = `${city}, ${country}`
        degreeElement.textContent = `${data.current.temp_c} °C`
        weatherElementTitle.textContent = `${data.current.condition.text}`
        dayElement.textContent = weekday[textDay-2]
        const weatherHourlyData = data.forecast.forecastday[0].hour.slice(0, 10)
        const weatherHourlyDataArr = weatherHourlyData.map(day => {
            let hours = day.time.split(" ")[1].split(":")[0];
            hours = parseInt(hours)
            let AmOrPm = hours >= 12 ? 'pm' : 'am'
            hours = (hours % 12) || 12;
            return `<div class="hour">
                        <h4>${hours} ${AmOrPm}</h4>
                        ${day.temp_c > 20  ? `<i class='bx bxs-sun'></i>` : `<i class='bx bxs-moon'></i>`}
                        <span>${day.temp_c} °C</span>
                    </div>`;
        })
        weatherHourlyElement.innerHTML = weatherHourlyDataArr.join("")
        let state = data.current.condition.text
        let hourElements = document.querySelectorAll(".hour")
        handleHourClick(hourElements,state)
        
    })
}
  
function error(err) {
    if (err.code === 3) {
        document.querySelector(".grid-container").innerHTML = "<p class='error-msg'>Request timed out.</p>"
        alert("Request timed out. Trying again...");
        navigator.geolocation.getCurrentPosition(success, error, { ...options, timeout: 15000 });
        
    } else {
        alert(`Sorry, we are unable to retrieve your location. ERROR(${err.code}): ${err.message}`);
        document.querySelector(".grid-container").innerHTML = `<p>Sorry, we are unable to retrieve your location. ERROR(${err.code}): ${err.message}</p>`
    }
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
  
navigator.geolocation.getCurrentPosition(success, error, options);
  