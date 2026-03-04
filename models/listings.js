const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    url: String,
    filename: String,
  },

  price: Number,
  location: String,
  country: String,

  // 📍 GEO LOCATION (FOR MAP)
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",   // safe default
      required: true,
    },
    coordinates: {
      type: [Number],     // [lng, lat]
      default: [72.8777, 19.076], // Mumbai (temporary)
      required: true,
    },
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// 🔥 Cascade delete reviews
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

module.exports = mongoose.model("Listing", listingSchema);