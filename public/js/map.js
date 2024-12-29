mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // Change the map style here
    center: [77.2088, 28.6139], // starting position [lng, lat]
    zoom: 4, // starting zoom
});

// Array of locations with longitude, latitude, and optional descriptions
const locations = [
    { lng: 80.9462, lat: 26.8467, description: 'Lucknow' },
    { lng: 72.8777, lat: 19.0760, description: 'Mumbai' },
    { lng: 77.5946, lat: 12.9716, description: 'Bangalore' },
    { lng: 88.3639, lat: 22.5726, description: 'Kolkata' },
    { lng: 76.2673, lat: 9.9312, description: 'Kochi' },
    { lng: 77.2088, lat: 28.6139, description: 'Delhi' },
    { lng: 78.4772, lat: 17.4065, description: 'Hyderabad' },
    { lng: 72.5714, lat: 23.0225, description: 'Ahmedabad' },
];

// Create a bounds object to fit all markers
const bounds = new mapboxgl.LngLatBounds();

// Loop through the locations array to add markers
locations.forEach(location => {
    // Add a marker
    new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .addTo(map);

    // Extend the map bounds to include the current location
    bounds.extend([location.lng, location.lat]);
});

// Adjust the map view to fit all markers within the viewport
map.fitBounds(bounds, {
    padding: { top: 50, bottom: 50, left: 50, right: 50 }
});
