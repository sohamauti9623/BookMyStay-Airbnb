// ===== Core Packages =====
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");

// ===== Utils =====
const ExpressError = require("./utils/ExpressError");

// ===== Routes =====
const listings = require("./routes/listing");
const reviews = require("./routes/reviews");

const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


// ================= DATABASE =================
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));


// ================= VIEW ENGINE =================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// ================= MIDDLEWARE =================
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


// ================= SESSION CONFIG =================
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,  // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,              // ❗ FIXED: maxAg → maxAge
    httpOnly: true
  }
};

app.use(session(sessionOptions));
app.use(flash());


// ================= FLASH MESSAGES (global) =================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


// ================= ROUTES =================
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);


// ================= ROOT =================
app.get("/", (req, res) => {
  res.redirect("/listings");
});


// ================= 404 =================
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});


// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});


// ================= SERVER =================
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
