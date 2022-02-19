document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);

  // call the Open Weather API
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=d22e100c0b841d5b9724817b04c264ef";
    fetch(url)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        
        console.log(json);

        // FORMAT JSON AS HTML
        let results = "";
        results += '<h3>Weather in ' + json.name + "</h3>";
        for (let i=0; i < json.weather.length; i++) {
          results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h3>' + json.main.temp + " &deg;F</h3>"
        results += "<p>"

        // max and min
        results +=  "Max: " + json.main.temp_max + "&deg;F</h3>" + " Min: " + json.main.temp_min + "&deg;F</h3>" +`<br>`;

        for (let i=0; i < json.weather.length; i++) {
            results += json.weather[i].description
            if (i !== json.weather.length - 1)
            results += ", "
        }

        // wind
        results += `<br>` + "Wind Speed: " + json.wind.speed + " mph";

        // humidity
        results += `<br>` + "Humidity: " + json.main.humidity + "%";

        results += "</p>";
        document.getElementById("weatherResults").innerHTML = results;

    });


/* --------------
   5 Day Forecast (below)
   --------------- */

  const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=d22e100c0b841d5b9724817b04c264ef";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);

      // FORMAT JSON AS HTML
    let forecast = "";

    for (let i=0; i<40; i+=8) //0,8,16,24,32,40
    {
        let counter = 0;
        forecast += "<div class='col'> <h5>" + moment(json.list[i].dt_txt).format('MMMM Do') + "</h5>";
        for (let j=i; j < (i+8); j++) {
            if (counter > 4) forecast += "<div style='color:white'>" + moment(json.list[j].dt_txt).format('h a') + "";
            else if (counter > 1) forecast += "<div style='color:beige'>" + moment(json.list[j].dt_txt).format('h a') + "";
            else forecast += "<div style='color:black'>" + moment(json.list[j].dt_txt).format('h a') + "";
            forecast += '<img src="http://openweathermap.org/img/w/' + json.list[j].weather[0].icon + '.png"/>'
            forecast += "<br> Temp: " + json.list[j].main.temp + "&deg;F</h3>";
             // wind
            forecast += `<br>` + "Wind: " + json.list[j].wind.speed + " mph";
            // humidity
            forecast += `<br>` + "Humidity: " + json.list[j].main.humidity + "%";
            forecast += "</div> <br>"
            counter++;
        }
        forecast += "</div>";
    }

    


    document.getElementById("forecastResults").innerHTML = forecast;

    });





});
