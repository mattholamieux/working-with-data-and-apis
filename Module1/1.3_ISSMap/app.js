const iss_api_url = "https://api.wheretheiss.at/v1/satellites/25544";

const getISS = async() => {
    const response = await fetch(iss_api_url);
    const data = await response.json();
    const { latitude, longitude } = data;
    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;
}

getISS();

// //Create map and add tiles
// const myMap = L.map('issMap').setView([0, 0], 1);
// const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> constributors';
// const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// const tiles = L.tileLayer(tileUrl, { attribution });
// tiles.addTo(myMap);

// // Create marker with custom icon
// const issIcon = L.icon({
//     iconUrl: 'iss.png',
//     iconSize: [50, 32],
//     iconAnchor: [25, 16]
// });
// const marker = L.marker([0, 0], { icon: issIcon }).addTo(myMap);

// let firstTime = true;

// async function getISS() {
//     const iss_url = 'https://api.wheretheiss.at/v1/satellites/25544';
//     const response = await fetch(iss_url);
//     const data = await response.json();
//     const { latitude, longitude } = data;
//     marker.setLatLng([latitude, longitude]);
//     if (firstTime) {
//         myMap.setView([latitude, longitude], 4);
//         firstTime = false;
//     }
//     document.getElementById('lat').textContent = latitude.toFixed(2);
//     document.getElementById('lon').textContent = longitude.toFixed(2);
// }

// //get the ISS current latitude and longitude
// getISS();
// setInterval(getISS, 1000);