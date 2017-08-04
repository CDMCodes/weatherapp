$(document).ready(function(){
  //declare functions for temperature conversion
  function celtofahr(cel){
    return (cel / (5.0 / 9.0)) + 32.0;
  }
  function fahrtocel(fahr){
    return (fahr - 32.0) * (5.0/9.0);
  }


  //On click of get weather button
  $("#getWeather").click(function(){
    console.log("you clicked get weather");

    //define what to do if get position works
    function success(position){
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      console.log("lat = " + lat + "  long = " + long);
      $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long, function(result){
        //var city = result.name;
        $("#location").html("<p>"+result.name+"</p>");
        //var temp = result.main.temp;
        $("#temp").html("<p>"+result.main.temp+" Celsius</p>");
        //var low = result.main.temp_min;
        //var high = result.main.temp_max;
        $("#hilo").html("<p>"+result.main.temp_min+" / " + result.main.temp_max+"</p>");
        // var img = result.weather[0].icon;
        $("#wximg").html("<img src="+result.weather[0].icon+" alt="+result.weather[0].icon+"/>");
        // var type = result.weather[0].main;
        $("#wxdesc").html("<p>"+result.weather[0].main+"</p>");
      });
    }

    //define what to do if get position fails
    function error(err) {
      console.log(err.code);
    }

    //run get location if available
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error);
    }else{
      console.log("geolocation function unavailable");
    }
  });


  $("#convert").click(function(){
    console.log("you clicked convert");
    if(degree == "F"){
      temp = fahrtocel(temp)
      degree = "C"
    }else{
      temp = celtofahr(temp);
      degree = "F";
    }
  });

});
