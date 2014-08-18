/* global google:true */

(function(){
  'use strict';

  $(document).ready(function(){
    $('form').submit(addVacation);
  });

  function addVacation(e){
    var lat = $('#lat').val();

    if(!lat){
      var name = $('#name').val();
      geocode(name);
      e.preventDefault();
    }
  }
  function geocode(place){
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({address: place}, function(results, status){
      var name = results[0].formatted_place,
          lat = results[0].geometry.location.lat(),
          lng = results[0].geometry.location.lng();

      $('#name').val(name);
      $('#lat').val(lat);
      $('#lng').val(lng);

      $('form').submit();
      console.log(name, lat, lng);

    });
  }

})();

