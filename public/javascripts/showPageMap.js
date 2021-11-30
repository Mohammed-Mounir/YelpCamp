mapboxgl.accessToken = mapToken;

const coordinates = JSON.parse(campground).geometry.coordinates;

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
