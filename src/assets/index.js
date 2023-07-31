$(function () {
 $(".search_box button, .search_box input").on("click keypress", function(event) {
  if(event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
   const city = $(".search_box input").val().trim();

   if(city === "") {
    return;
   } else {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&appid=0ca7fb8919814e59836c2f5d2c86d168`)
    .then(response => response.json())
    .then(data => {
     if(data.cod === "404") {
      $(".container").css({"height": "420px"});
      $(".weather_box, .weather_details").hide();
      $(".not_found").show().addClass("fadeIn");
      $(".search_box input").focus();
      $(".footer").css({"margin-top": "40px;"});
     
      return;
     }
    
     $(".not_found").hide().removeClass("fadeIn");
    
     const image = $(".weather_box img");
    
     switch(data.weather[0].main) {
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
    
     $(".weather_box .temperature").html(`${parseInt(data.main.temp)} ºC`);
     $(".weather_box .description").html(`${data.weather[0].description}`);
     $(".weather_details .min_temp span").html(`${data.main.temp_min} ºC`);
     $(".weather_details .max_temp span").html(`${data.main.temp_max} ºC`);
    
     $(".weather_box, .weather_details").show().addClass("fadeIn");
     $(".container").css({"height": "590px"});
     $(".search_box input").focus();
    }).catch((error) => {
     console.log(error);
    });
   }
  }
 });
});