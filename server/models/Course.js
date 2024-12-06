const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  title: { type: String, required: true },
  mode: { type: String, required: true },
  start_date: { type: Date, required: true },
  duration: { type: String, required: true },
  trainer: { type: String, required: true },
  price: { type: Number, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("Course", courseSchema);
