$(document).ready(function(){
  //declare functions for temperature conversion
  function celtofahr(cel){
    var newf = (cel / (5.0 / 9.0)) + 32.0;
    return Math.floor(newf);
  }
  function fahrtocel(fahr){
    var newc = (fahr - 32.0) * (5.0/9.0);
    return Math.round(newc*100) / 100;
  }

  //declare some variables up front so they are outside function scopes
  var prefCel = true;
  var temp = null;
  var tempmin = null;
  var tempmax = null;
  var lat = null;
  var long = null;
  var attempts = 0;

  //Set degree preference by clicing button
  $("#convert").click(function(){
    //console.log("you clicked convert");
   if(prefCel){
     prefCel = false;
     $("#convert").text("Fahrenheit");
     //console.log("temp was:"+temp);
     temp = celtofahr(temp);
     tempmin = celtofahr(tempmin);
     tempmax = celtofahr(tempmax);
     //console.log("temp is:" +temp);
     $("#temp").text(temp);
     $("#hilo").text(tempmin +" / " + tempmax);
   }else{
     prefCel = true;
     $("#convert").text("Celsius");
     //console.log("temp was: "+temp);
     temp = fahrtocel(temp);
     tempmin = fahrtocel(tempmin);
     tempmax = fahrtocel(tempmax);
     //console.log("temp is: "+temp);
     $("#temp").text(temp);
     $("#hilo").text(tempmin +" / " + tempmax);
   }
  });

  //On click of get weather button
  $("#getWeather").click(function(){
    //first show temp convert button
    $("#convert").css("display","inline");

    // API call as it's own function
    function weatherCall(latstring, longstring){
      $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+latstring+"&lon="+longstring, function(result){
        console.log(result);
        $("#location").text(result.name);
        $("#wximg").html("<img src="+result.weather[0].icon+" alt="+result.weather[0].icon+"/>");
        $("#wxdesc").text(result.weather[0].main);
        temp = (prefCel) ? result.main.temp : celtofahr(result.main.temp);
        $("#temp").text(temp);
        tempmin = (prefCel) ? result.main.temp_min : celtofahr(result.main.temp_min);
        tempmax = (prefCel) ? result.main.temp_max : celtofahr(result.main.temp_max);
        $("#hilo").text(tempmin+" / " + tempmax);
      });
    }

    //define what to do if get position works
    function success(position){
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log("lat = " + lat + "  long = " + long);
      weatherCall(lat, long);
    }

    //define what to do if get position fails
    function error(err) {
      console.log(err.code);
      attempts += 1;
      //Use Montreal lat long, so at least there is some data
      if(attempts<=1) {
        $("#location").before("<p>Location failed. How about weather for:");
      }
      lat = "46.815736";
      long = "-71.207750";
      weatherCall(lat,long);
    }

    //run get location if available
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error);
    }else{
      console.log("geolocation function unavailable");
    }
  });




});
