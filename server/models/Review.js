const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);

