const apiKey = "68406648614c2611c7d0ea905d8935b5";

const url2 =
  "https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=68406648614c2611c7d0ea905d8935b5&units=metric&lang=ru";

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (city.trim() !== "") {
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;
  const weatherInfo = document.getElementById("weatherInfo");
  const loader = document.getElementById("loader");

  loader.classList.remove("hidden");

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const temperature = Math.round(data.main.temp); // Округляем температуру до целого числа
      const windSpeed = data.wind.speed;
      const humidity = data.main.humidity;
      const rainProbability = data.rain ? data.rain["1h"] : 0; // Вероятность осадков за час
      const date = new Date(data.dt * 1000); // Дата и время в формате Unix timestamp

      // Преобразовываем дату и время в строку в формате 'DD.MM.YYYY HH:MM'
      const dateTimeString = `${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()} ${date.getHours()}:${
        (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
      }`;

      // иконка
      const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

      // Обновляем информацию о погоде
      weatherInfo.innerHTML = `
        <p>${description}</p>
        <img src="${iconUrl}" alt="Weather Icon">
        <p>Температура: ${temperature}°C</p>
        <p>Скорость ветра: ${windSpeed} m/s</p>
        <p>Влажность: ${humidity}%</p>
        <p>Вероятность осадков: ${rainProbability}%</p>
        <p>Дата и время: ${dateTimeString}</p>
      
    `;
      updateDateTime();

      // Скрываем loader после успешного получения данных
      loader.classList.add("hidden");
    })
    .catch((error) => {
      weatherInfo.innerHTML = `<p>${error.message}</p>`;
    })
    .finally(() => {
      loader.classList.add("hidden");
    });
}

function updateDateTime() {
  // Находим элемент для отображения времени
  const dateTimeElement = document.getElementById("dateTime");

  // Обновляем время каждую секунду
  setInterval(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    dateTimeElement.textContent = `Date & Time: ${formattedDate}`;
  }, 1000); 
}
