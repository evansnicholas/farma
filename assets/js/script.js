var map;
var key = "AIzaSyDz-fA7ScCf27wZdfSh6qTpaObP-A9_WTU";
var travelInfo = {};

function updateCountry(latLng) {
  var lat = latLng.lat();
  var lng = latLng.lng();
  var latLngParam = lat + "," +lng;
  var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latLngParam+"&key="+key;

  $.ajax({
    url: url,
    success: function(data) {
      console.log(data.results);
      var country = extractCountry(data.results);
      console.log(country);
      travelInfo.destination = country;
      updateMedication();
    },
    dataType: "json"
  });
}

function updateMedication() {
  var country = travelInfo.destination;
  if (!country) {
    alert("Please select a destination.");
    return;
  }
  var countryHtml = "<p>You are travelling to: " + country + "</p>";
  var medsListHtml = "<p>Please take:</p><ul><li>doxopramine</li><li>doxycycline</li></ul>";

  $("#meds-div").show();
  $("#meds").html(countryHtml + medsListHtml);
}

function extractCountry(results) {
  var countryResult = results.find(function(result) {
    return result.types.includes("country");
  })
  return countryResult.formatted_address;
}

function initMap() {
  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 50, lng: 0},
    scrollwheel: false,
    zoom: 2
  });

  map.addListener('click', function(event) {
    updateCountry(event.latLng);
  });
}


$( document ).ready(function() {
  $("#meds-div").hide();
});
