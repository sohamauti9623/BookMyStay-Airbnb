const Listing = require("../models/listings");
const ExpressError = require("../utils/ExpressError");

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
   CREATE – multer + cloudinary ONLY
======================= */
module.exports.createNew = async (req, res) => {
  if (!req.file) {
    throw new ExpressError(400, "Image upload is required");
  }

  const listing = new Listing(req.body.listing);
  listing.owner = req.user._id;

  listing.image = {
    url: req.file.path,       // Cloudinary URL
    filename: req.file.filename,
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

  // apply Cloudinary resize ONLY if cloudinary image
  if (originalImageUrl.includes("cloudinary")) {
    originalImageUrl = originalImageUrl.replace(
      "/upload",
      "/upload/w_250"
    );
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

  // update image ONLY if new file uploaded
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