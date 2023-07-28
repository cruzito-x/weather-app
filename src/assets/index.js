$(function () {
  $(".search_box button").on("click", function() {
    const APIKey = "0ca7fb8919814e59836c2f5d2c86d168";
    const city = $(".search_box input").val();

    if(city === "") {
     return;
    } else {
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&appid=${APIKey}`)
     .then(response => response.json())
     .then(json => {
      if(json.cod === "404") {
       $(".container").css({"height": "400px"});
       $(".weather_box").hide();
       $(".weather_details").hide();
       $(".not_found").show().addClass("fadeIn");
       $(".search_box  input").focus();

       return;
      }
      $(".not_found").hide().removeClass("fadeIn");

      const image = $(".weather_box img");

      switch(json.weather[0].main) {
       case "Clear":
        image.attr("src", "src/icons/clear.svg");
       break;

       case "Rain":
        image.attr("src", "src/icons/rain.svg");
       break;

       case "Snow":
        image.attr("src", "src/icons/snow.svg");
       break;

       case "Clouds":
        image.attr("src", "src/icons/cloudy.svg");
       break;

       case "Haze":
        image.attr("src", "src/icons/haze.svg");
       break;

       case "Thunderstorm":
        image.attr("src", "src/icons/thunderstorm.svg");
       break;

       default:
        image.attr("src", "");
      }

      $(".weather_box .temperature").html(`${parseInt(json.main.temp)} <span> ºC </span>`);
      $(".weather_box .description").html(`${json.weather[0].description}`);
      $(".weather_details .humidity span").html(`${json.main.humidity}%`);
      $(".weather_details .wind span").html(`${parseInt(json.wind.speed)}Km/H`);

      $(".weather_box").show().addClass("fadeIn");
      $(".weather_details").show().addClass("fadeIn");
      $(".container").css({"height": "590px"});
      $(".search_box  input").focus();
     }).catch((error) => {
      console.log(error);
     });
    }
  });
});