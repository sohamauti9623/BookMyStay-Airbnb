const Listing = require("../models/listings");
const ExpressError = require("../utils/ExpressError");
const axios = require("axios");

/* =======================
   INDEX – show all listings
======================= */
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

/* =======================
   NEW – render form
======================= */
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

/* =======================
   CREATE – image + geocoding
======================= */
module.exports.createNew = async (req, res) => {
  if (!req.file) {
    throw new ExpressError(400, "Image upload is required");
  }

  const listing = new Listing(req.body.listing);
  listing.owner = req.user._id;

  // Image from Cloudinary
  listing.image = {
    url: req.file.path,
    filename: req.file.filename,
  };

  // 🌍 REAL-TIME GEOCODING
  const locationText = `${listing.location}, ${listing.country}`;

  const geoRes = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: locationText,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "wanderlust-app", // REQUIRED by Nominatim
      },
    }
  );

  if (!geoRes.data.length) {
    throw new ExpressError(400, "Invalid location");
  }

  listing.geometry = {
    type: "Point",
    coordinates: [
      parseFloat(geoRes.data[0].lon), // lng
      parseFloat(geoRes.data[0].lat), // lat
    ],
  };

  await listing.save();
  req.flash("success", "New listing created");
  res.redirect("/listings");
};

/* =======================
   SHOW – single listing
======================= */
module.exports.showListings = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing does not exist");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

/* =======================
   EDIT – render edit form
======================= */
module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  let originalImageUrl = listing.image.url;

  if (originalImageUrl.includes("cloudinary")) {
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  }

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

/* =======================
   UPDATE – data + optional image
======================= */
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await listing.save();
  }

  req.flash("success", "Listing updated");
  res.redirect(`/listings/${id}`);
};

/* =======================
   DELETE – remove listing
======================= */
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findByIdAndDelete(id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  req.flash("success", "Listing deleted");
  res.redirect("/listings");
};

// GET Index
module.exports.index = async (req, res) => {
    let { search } = req.query;
    let allListings;

    if (search) {
        // Find listings where title or location matches the search query (case-insensitive)
        allListings = await Listing.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } }
            ]
        });
    } else {
        allListings = await Listing.find({});
    }
    
    res.render("listings/index.ejs", { allListings });
};
