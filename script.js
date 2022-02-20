let clicks = 0;
let resetNextTime = false;

document.getElementById("submit").addEventListener("click", function(event) {
  event.preventDefault();

  if (resetNextTime) {
    clicks = 0;
    document.getElementById("clicks").innerHTML = " 0 clicks";
    resetNextTime = false;
  }


  //math.random number 1-10 
  let randNumber = Math.random() * 10
  console.log("Random Number (1-10) is: " + randNumber)

  //  1/10 times give goose
  if (randNumber < 1)
  {
    document.getElementById("results").innerHTML = "<h2> Goose!! </h2> <img style='width: 100%' src='images/greylag-goose-g45cd056eb_1920.jpg' alt='goose image' />" ;
    let totalClicks = clicks;
    clicks = "Found a goose in " + totalClicks;
    resetNextTime = true;
  }


  // 9 times out of 10 return a duck. 
  else 
  {
    // document.getElementById("results").innerHTML = "<h2> Duck </h2> <img src='images/duck400.jpeg' alt='goose image' />" ;
    clicks++;

  // call the random dog API
  const url = "https://random.dog/woof.json";
    fetch(url)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        // let json = response.json();
        console.log(json);

        // FORMAT JSON AS HTML
        let results = "";

        if (json.url.includes('.mp4'))
        {
          results +='<h2> Dog </h2> <video style= "max-width: 100%; max-height: 80vh;" controls="controls">';
          results += '<source src=" ' + json.url + ' " type="video/mp4" />';
          results += 'Your browser does not support the <video> tag';
          results += '</video>';
        }
        
        else
        {
          results += '<h2> Dog </h2> <img style= "max-width: 100%; max-height: 80vh;" src= "';
          results += json.url;
          results += '" />';
        }

        document.getElementById("results").innerHTML = results;

    });

  }

  if (clicks==1) document.getElementById("clicks").innerHTML = " " + clicks + " click"; 
  else document.getElementById("clicks").innerHTML = " " + clicks + " clicks";

});
