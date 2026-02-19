const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const{isLoggedIn}=require("../middleware.js");

// validation function
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    return next(new ExpressError(400, errMsg));
  }

  next();
};




// INDEX - Show all listings
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// NEW - Form to create listing
router.get("/new",isLoggedIn, (req, res) => {
  
    
    res.render("listings/new.ejs");
});

// CREATE - Add new listing
router.post("/",
    validateListing,
    isLoggedIn,
    wrapAsync(async (req, res) => {

        const newListing = new Listing(req.body.listing);

        await newListing.save();
        req.flash("success","New listing created");
        res.redirect("/listings");
    }));

// SHOW - Show a single listing
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error","Listing does not exist");
        res.redirect("/listings");
    }
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("listings/show.ejs", { listing });
}));

// EDIT - Form to edit listing
router.get("/:id/edit",isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("listings/edit.ejs", { listing });
}));

// UPDATE - Update listing
router.put("/:id",
    validateListing,
    isLoggedIn,
    wrapAsync(async (req, res) => {

        const { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
          req.flash("success","Listing Updated");
        res.redirect(`/listings/${id}`);
    }));


// DELETE - Delete listing
router.delete("/:id", isLoggedIn,wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
      req.flash("success","listing deleted");
    res.redirect("/listings");
}));

module.exports = router;