const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Ocean View Resort",
    description:
      "Wake up to breathtaking ocean views and enjoy luxury amenities in this beautiful seaside resort.",
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e9c4c8a3a9?auto=format&fit=crop&w=800&q=60",
    price: 2800,
    location: "Goa",
    country: "India",
  },
  {
    title: "Desert Luxury Camp",
    description:
      "Stay under the stars in this luxury desert camp with traditional decor and modern comforts.",
    image:
      "https://images.unsplash.com/photo-1518684079-0b6fce7b52b5?auto=format&fit=crop&w=800&q=60",
    price: 2200,
    location: "Jaisalmer",
    country: "India",
  },
  {
    title: "Hilltop View Villa",
    description:
      "Enjoy cool mountain air and stunning valley views from this peaceful hilltop villa.",
    image:
      "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Manali",
    country: "India",
  },
  {
    title: "Royal Heritage Palace",
    description:
      "Experience royal living in this heritage palace converted into a luxury hotel.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60",
    price: 3500,
    location: "Jaipur",
    country: "India",
  },
  {
    title: "Lakefront Boutique Hotel",
    description:
      "Relax by the serene lake in this boutique hotel offering beautiful views and cozy rooms.",
    image:
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "Udaipur",
    country: "India",
  },
  {
    title: "Urban Studio Apartment",
    description:
      "A modern studio apartment in the heart of the city, perfect for business and leisure travelers.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60",
    price: 1400,
    location: "Mumbai",
    country: "India",
  },
  {
    title: "Rainforest Eco Lodge",
    description:
      "Stay surrounded by lush greenery in this eco-friendly lodge in the rainforest.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Wayanad",
    country: "India",
  },
  {
    title: "Snowy Mountain Chalet",
    description:
      "A cozy wooden chalet with stunning snowy mountain views and a warm fireplace.",
    image:
      "https://images.unsplash.com/photo-1509644853490-4f45f56d6b21?auto=format&fit=crop&w=800&q=60",
    price: 2600,
    location: "Gulmarg",
    country: "India",
  },
  {
    title: "Luxury Riverside Resort",
    description:
      "Relax by the river in this high-end resort offering spa services and premium rooms.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Rishikesh",
    country: "India",
  },
  {
    title: "Backwater Houseboat",
    description:
      "Enjoy a peaceful stay on a traditional houseboat cruising through scenic backwaters.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60",
    price: 2400,
    location: "Alleppey",
    country: "India",
  },
  {
    title: "City View Sky Hotel",
    description:
      "Stay high above the city in this stylish hotel offering panoramic skyline views.",
    image:
      "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=60",
    price: 2800,
    location: "Bangalore",
    country: "India",
  },
  {
    title: "Tea Estate Bungalow",
    description:
      "A charming bungalow located in the middle of lush tea gardens for a refreshing stay.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
    price: 1700,
    location: "Munnar",
    country: "India",
  },
  {
    title: "Heritage Haveli Stay",
    description:
      "Stay in a traditional haveli with royal architecture and warm hospitality.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60",
    price: 2100,
    location: "Jodhpur",
    country: "India",
  },
  {
    title: "Cliffside Beach Resort",
    description:
      "Enjoy dramatic sea views from this beautiful cliffside beach resort.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a26db0f5c2be?auto=format&fit=crop&w=800&q=60",
    price: 3200,
    location: "Varkala",
    country: "India",
  },
  {
    title: "Luxury Forest Retreat",
    description:
      "A peaceful forest retreat offering luxury cottages and nature experiences.",
    image:
      "https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=800&q=60",
    price: 2900,
    location: "Coorg",
    country: "India",
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    price: 1000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    price: 800,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image:
      "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60",
    price: 3500,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image:
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
  }
];

module.exports = { data: sampleListings };
