// Weather object
let weather = {
    "apiKey" : "080e1b858580ddc5c6ed8b09e04aa9b3",
    fetchWeather: function(city) {
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
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.floor(temp) + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind-speed").innerText = "Wind Speed: " + speed + " mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search : function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
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