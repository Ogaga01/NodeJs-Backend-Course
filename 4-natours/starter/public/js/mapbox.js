/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations)
console.log(locations)

mapboxgl.accessToken =
  'pk.eyJ1Ijoib2dhZ2EwMSIsImEiOiJjbGUxaWU0dHEwbmViM25wNWllYnBuMjdvIn0.t_mX1x5kV3DzVZy1T13ccw';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ogaga01/cle1jcy1e005b01pdgbx8ofqs',
});

const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
