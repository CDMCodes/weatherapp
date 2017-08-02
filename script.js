$(document).ready(function(){
  function celtofahr(cel){
    return (cel / (5.0 / 9.0)) + 32.0;
  }
  function fahrtocel(fahr){
    return = (fahr - 32.0) * (5.0/9.0);
  }

  temp = 0;
  degree = "F"
  if(degree == "F"){
    temp = fahrtocel(temp)
    degree = "C"
  }else{
    temp = celtofahr(temp);
    degree = "F";
  }





});
