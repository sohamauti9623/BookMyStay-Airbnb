const ejsMate = require("ejs-mate");
const express = require("express");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");
const Listing = require("./models/listing.js");

const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// validation function
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    return next(new ExpressError(400, errMsg));
  }

  next();
};


//validate review

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    return next(new ExpressError(400, errMsg));   
  }

  next();   // continue if valid
};


// ====== Mongoose Connection ======
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// ====== App Config ======
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// ====== ROUTES ======

// Root
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// INDEX - Show all listings
app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

// NEW - Form to create listing
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// CREATE - Add new listing
app.post("/listings",
  validateListing,
  wrapAsync(async (req, res) => {

    const newListing = new Listing(req.body.listing);

    await newListing.save();
    res.redirect("/listings");
  }));

// SHOW - Show a single listing
app.get("/listings/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  if (!listing) throw new ExpressError(404, "Listing not found");
  res.render("listings/show.ejs", { listing });
}));

// EDIT - Form to edit listing
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) throw new ExpressError(404, "Listing not found");
  res.render("listings/edit.ejs", { listing });
}));

// UPDATE - Update listing
app.put("/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {

    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  }));

// Review route
//post 

app.post("/listings/:id/review", validateReview, wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${listing._id}`);
}));

//delete for reviews

app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);

}));


// DELETE - Delete listing
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));
// //route for the Poert Bi 
// app.get("/api/listings", async (req, res) => {
//   const { country, minPrice, maxPrice } = req.query;
//   const filter = {};
//   if (country) filter.country = country;
//   if (minPrice) filter.price = { $gte: parseInt(minPrice) };
//   if (maxPrice) filter.price = { ...filter.price, $lte: parseInt(maxPrice) };

//   const allListings = await Listing.find(filter);
//   res.json(allListings);
// });

// ====== 404 Handler ======
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// ====== Error Handler ======
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

// ====== Start Server ======
app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
