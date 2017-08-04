$(document).ready(function(){
  function celtofahr(cel){
    return (cel / (5.0 / 9.0)) + 32.0;
  }
  function fahrtocel(fahr){
    return (fahr - 32.0) * (5.0/9.0);
  }

  var temp = 0;
  var degree = "F"
  if(degree == "F"){
    temp = fahrtocel(temp)
    degree = "C"
  }else{
    temp = celtofahr(temp);
    degree = "F";
  }

  var lat = ""
  var long = ""

  //On click of get weather button
  $("#getWeather").click(function(){
    console.log("you clicked get weather");

    //define what to do if get position works
    function success(position){
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      console.log("lat = " + lat + "  long = " + long);
    }

    //define what to do if get position fails
    function error(err) {
      console.log(err.code);
    }

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error);
    }else{
      console.log("geolocation function unavailable");
    }
  });

  $("#convert").click(function(){
    console.log("you clicked convert");
  });

});
