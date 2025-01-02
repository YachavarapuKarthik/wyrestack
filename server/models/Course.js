const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

  courseLogoUrl: { type: String, required: true },

  title: { type: String, required: true },

  start_date: { type: Date },

  duration: { type: String },

  trainer: { type: String },

  price: { type: Number, required: true },

  courseBannerUrl: { type: String },
  
  syallabusLink :{type: String},

  description: { type: String, required: true },

  isFreeCourse: { type: Boolean, default: false },

  language: { type: String, required: true },

  materials: [{ type: String }],

  demoLink: { type: String },

});

module.exports = mongoose.model("Course", courseSchema);
