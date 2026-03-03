const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listings.js");
const listingController = require("../controllers/listings.js");
const { isOwner, isLoggedIn, validateListing } = require("../middleware.js");

/* ===========================
   ROUTES FOR LISTINGS
=========================== */

// INDEX & CREATE
router
  .route("/")
  .get(wrapAsync(listingController.index)) // INDEX - Show all listings
  // .post(isLoggedIn, validateListing, wrapAsync(listingController.createNew))
  .post(upload.single("listing[image]"), (req, res) => {
    res.send(req.file);
  }); // CREATE - Add new listing

// NEW - Form to create a new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW, UPDATE, DELETE
router
  .route("/:id")
  .get(wrapAsync(listingController.showListings)) // SHOW - Show a single listing
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing),
  ) // UPDATE - Update listing
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyLinsting)); // DELETE - Delete listing

// EDIT - Form to edit a listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing),
);

module.exports = router;
