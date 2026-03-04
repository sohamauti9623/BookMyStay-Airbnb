const mapDiv = document.getElementById("map");

if (mapDiv && typeof listingCoords !== "undefined") {
  const map = L.map("map").setView(listingCoords, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  L.marker(listingCoords)
    .addTo(map)
    .bindPopup("Listing location")
    .openPopup();
}