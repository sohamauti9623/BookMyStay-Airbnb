const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Forces Node to use Google DNS
require("dns").setDefaultResultOrder("ipv4first");
// ================= ENV =================
require("dotenv").config();

// ================= CORE =================
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// ================= MIDDLEWARE =================
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// ================= MODELS =================
const User = require("./models/user");

// ================= UTILS =================
const ExpressError = require("./utils/ExpressError");

// ================= ROUTES =================
const listingsRouter = require("./routes/listings");
const reviewsRouter = require("./routes/reviews");
const userRouter = require("./routes/user");

const app = express();

// ================= DATABASE =================
const dbUrl = process.env.ATLASDB_URL;

// Important: Use strictQuery for Mongoose 7+
mongoose.set("strictQuery", true);
console.log(process.env.ATLASDB_URL);
async function connectDB() {
  try {
    console.log("🔌 Connecting to DB...");
    
    // Safety check for the URL
    if (!dbUrl) {
        throw new Error("ATLASDB_URL is not defined in your .env file");
    }

    // Connect using modern defaults (SRV support)
    await mongoose.connect(dbUrl);

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed");
    console.error(`Error details: ${err.message}`);
    
    // If you see "MongooseServerSelectionError", 
    // it's almost always a Whitelist/DNS/Firewall issue.
    process.exit(1);
  }
}

// ================= VIEW ENGINE =================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================= APP MIDDLEWARE =================
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ================= SESSION =================
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "devsecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// ================= PASSPORT =================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================= GLOBAL LOCALS =================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// ================= ROUTES =================
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

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
  res.status(statusCode).render("error", { message });
});

// ================= START SERVER =================
// We only start the server IF the DB connection is successful
connectDB().then(() => {
  app.listen(8080, () => {
    console.log("🚀 Server running on http://localhost:8080");
  });
});