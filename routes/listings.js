const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listings.js");

const { isOwner, isLoggedIn, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const upload=multer({dest:'uploads/'});

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(validateListing, isLoggedIn, wrapAsync(listingController.createNew));

// INDEX - Show all listings

// NEW - Form to create listing

router.get("/new", isLoggedIn, listingController.renderNewForm);

// CREATE - Add new listing

router;
// SHOW - Show a single listing
router
  .route("/:id")
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyLinsting))
  .get(wrapAsync(listingController.showListings))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,

    wrapAsync(listingController.updateListing),
  );

// EDIT - Form to edit listing

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing),
);

// UPDATE - Update listing

// DELETE - Delete listing

router;

module.exports = router;
