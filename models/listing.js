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
    url: {
      type: String,
      default:
        "https://plus.unsplash.com/premium_photo-1720760951582-a9e8fabb9e15?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      set: (v) =>
        v === ""
          ? "https://plus.unsplash.com/premium_photo-1720760951582-a9e8fabb9e15?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          : v,
    },
    filename: {
      type: String,
      default: "default_image",
    },
  },
  price: Number,
  location: String,
  country: String,
  latitude: Number,
  longitude: Number,
  reviews: [
    {
      type:Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
  }
});


listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
   await Review.deleteMany({_id: {$in: listing.reviews}});
   }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
