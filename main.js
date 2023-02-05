// Weather object
let weather = {
    "apiKey" : "080e1b858580ddc5c6ed8b09e04aa9b3",
    fetchWeather : function(city) {
        if (typeof city == "string") {
            fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=imperial&appid=" 
            + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
        } else {
            fetch("https://api.openweathermap.org/data/2.5/weather?zip=" 
            + city 
            + "&units=imperial&appid=" 
            + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
        }
    },
    fetchForecast : function(city) {
        if (typeof city == "string") {
            fetch("https://api.openweathermap.org/data/2.5/forecast?q=" 
                + city 
                + "&units=imperial&appid=" 
                + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayForecast(data));
        } else {
            fetch("https://api.openweathermap.org/data/2.5/forecast?zip=" 
                + city 
                + "&units=imperial&appid=" 
                + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayForecast(data));
        }
    },
    displayWeather : function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.floor(temp) + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind-speed").innerText = "Wind Speed: " + speed + " mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    displayForecast : function(data) {
        const dayOne = {
            "dt_txt" : data.list[0].dt_txt,
            "icon" : data.list[0].weather[0].icon,
            "temp_max" : data.list[5].main.temp_max,
            "temp_min" : data.list[0].main.temp_min
        }
        const dayTwo = {
            "dt_txt" : data.list[6].dt_txt,
            "icon" : data.list[6].weather[0].icon,
            "temp_max" : data.list[6].main.temp_max,
            "temp_min" : data.list[10].main.temp_min
        }
        const dayThree = {
            "dt_txt" : data.list[14].dt_txt,
            "icon" : data.list[14].weather[0].icon,
            "temp_max" : data.list[20].main.temp_max,
            "temp_min" : data.list[17].main.temp_min
        }
        const dayFour = {
            "dt_txt" : data.list[22].dt_txt,
            "icon" : data.list[22].weather[0].icon,
            "temp_max" : data.list[28].main.temp_max,
            "temp_min" : data.list[26].main.temp_min
        }
        const dayFive = {
            "dt_txt" : data.list[30].dt_txt,
            "icon" : data.list[30].weather[0].icon,
            "temp_max" : data.list[36].main.temp_max,
            "temp_min" : data.list[32].main.temp_min
        }
        this.addForecastToDocument(dayOne, ".day1");
        this.addForecastToDocument(dayTwo, ".day2");
        this.addForecastToDocument(dayThree, ".day3");
        this.addForecastToDocument(dayFour, ".day4");
        this.addForecastToDocument(dayFive, ".day5");
    },
    search : function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
        this.fetchForecast(document.querySelector(".search-bar").value);
    },
    formatDate : function(data) {
        const date = new Date(data);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const formattedDate = `${month}/${day}`;
        return formattedDate;
    },
    addForecastToDocument : function(day, cls) {
        document.querySelector(`${cls}`).querySelector(".date").innerText = this.formatDate(day.dt_txt);
        document.querySelector(`${cls}`).querySelector(".icon").src = "https://openweathermap.org/img/wn/" + day.icon + ".png";
        document.querySelector(`${cls}`).querySelector(".temps").querySelector(".max-temp").innerText = Math.floor(day.temp_max) + "°F";
        document.querySelector(`${cls}`).querySelector(".temps").querySelector(".min-temp").innerText = Math.floor(day.temp_min) + "°F";
    }
};

// Search for weather when search button is clicked
document.querySelector(".search-button").addEventListener('click', () => {
    weather.search();
});

// Search for weather when enter button is pressed
document.querySelector(".search-bar").addEventListener('keyup', (event) => {
    if (event.key == "Enter") {
        weather.search();
    }
});

// Default Weather
weather.fetchWeather("Miami");
weather.fetchForecast("Miami");