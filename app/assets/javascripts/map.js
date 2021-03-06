var position = {
  // Default position
  default: {
    lat: 57.049515,
    lng: 9.916286
  },

  // Current location
  current: null,

  // Map
  map: null,

  // Wissles
  wissles: null,

  // Geocoder
  geocoder: null
};

function initMap() {
  position.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: position.default,
    disableDefaultUI: true
  });

  // Geolocate every 5 seconds
  setTimeout(geolocate, 5000);

  // Add blue dot on map
  geolocate();

  // Set up geocoder
  position.geocoder = new google.maps.Geocoder;

  // Add wissles on map
  showWissles();
}

function geolocate() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      var newPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

      if (position.current) {
        position.current.setPosition(newPosition);
      } else {
        position.current = new google.maps.Marker({ position: newPosition, map: position.map, icon: '/assets/bluedot.png' });
      }

      position.map.panTo(newPosition);
    });
  } else {
    showAlert('Location is not supported')
  }
}
