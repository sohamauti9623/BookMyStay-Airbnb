const ejsMate = require("ejs-mate");
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");

const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// ===== Mongoose Connection =====
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// ===== App Config =====
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ===== Routers (MUST come after middleware) =====
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// ===== Root =====
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// ===== 404 Handler =====
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// ===== Error Handler =====
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// ===== Start Server =====
app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
