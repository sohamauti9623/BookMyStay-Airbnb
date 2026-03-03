const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listings.js");
const { validateReview, isLoggedIn } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Review route

router.get("/test", reviewController.reviewReview);

//post

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.showReview),
);

//delete for reviews

router.delete("/:reviewId", wrapAsync(reviewController.destroyReview));

module.exports = router;
