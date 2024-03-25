const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
    const APIKey = "57f673f63bced1ec7d5d4372d75c4da5";
    const city = document.querySelector(".search-box input").value;
    if (city === "") return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then((response) => response.json())
        .then((json) => {
            if (json.cod === "404") {
                cityHide.textContent = city;
                container.style.height = "400px";
                weatherBox.classList.remove("active");
                weatherDetails.classList.remove("active");
                error404.classList.add("active");
                return;
            }

            cityHide.textContent = city;
            container.style.height = "555px";
            container.classList.add("active");
            weatherBox.classList.add("active");
            weatherDetails.classList.add("active");
            error404.classList.remove("active");

            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(".weather-box .temperature");
            const description = document.querySelector(".weather-box .description");
            const humidity = document.querySelector(".weather-details .humidity span");
            const wind = document.querySelector(".weather-details .wind span");

            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "/img/clear.png";
                    break;
                case "Rain":
                    image.src = "/img/rain.png";
                    break;
                case "Snow":
                    image.src = "/img/snow.png";
                    break;
                case "Clouds":
                    image.src = "/img/cloud.png";
                    break;

                case "Mist":
                    image.src = "/img/mist.png";
                    break;
                case "Haze":
                    image.src = "/img/cloud.png";
                    break;
                case "Thunderstorm":
                    image.src = "/img/thunderstorm.png";
                    break;
                case "Sunny":
                    image.src = "/img/sunny.png";
                    break;
                default:
                    image.src = "/img/clear.png";
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Cloning info elements
            const infoWeather = document.querySelector(".info-weather");
            const infoHumidity = document.querySelector(".info-humidity");
            const infoWind = document.querySelector(".info-wind");

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = "clone-info-weather";
            elCloneInfoHumidity.id = "clone-info-humidity";
            elCloneInfoWind.id = "clone-info-wind";

            elCloneInfoWeather.classList.add("clone-info");
            elCloneInfoHumidity.classList.add("clone-info");
            elCloneInfoWind.classList.add("clone-info");

            // Inserting clones after original elements
            infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
            infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
            infoWind.insertAdjacentElement("afterend", elCloneInfoWind);

            // Removing clones after a delay
            setTimeout(() => {
                elCloneInfoWeather.remove();
                elCloneInfoHumidity.remove();
                elCloneInfoWind.remove();
            });
        });
});
