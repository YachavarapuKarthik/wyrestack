const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  // Logo image of the course, used for the course card or course listing page
  logo: { type: String, required: true },

  // URL for the course logo, could be used for displaying the logo on different platforms
  courseLogoUrl: { type: String },

  // The title of the course (usually displayed on the course page)
  title: { type: String, required: true },

  // A more specific title for the course (for example, a catchy course title for marketing purposes)
  courseTitle: { type: String },

  // The mode of the course, like online, offline, hybrid, etc.
  mode: { type: String, required: true },

  // The specific mode of the course (this might be used in a more granular way, like 'self-paced' or 'instructor-led')
  courseMode: { type: String },

  // The starting date of the course
  start_date: { type: Date },

  // The date when the course itself begins (could be different from the start of registration)
  courseStartDate: { type: Date },

  // The start date for registrations, when students can enroll
  registrationStartDate: { type: Date },

  // The end date for registrations, after which students cannot enroll
  registrationEndDate: { type: Date },

  // Duration of the course, e.g., "4 weeks", "3 months", etc.
  duration: { type: String },

  // Name of the trainer(s) or instructors for the course
  trainer: { type: String },

  // The price of the course (may be discounted or at full price)
  price: { type: Number, required: true },

  // Original price of the course, used for discount comparisons
  originalPrice: { type: Number },

  // Discounted price, in case the course is on sale
  discountedPrice: { type: Number },

  // Payment coupons associated with the course (could be used for discounts or promotions)
  coursePaymentCoupons: [{  
    code: { type: String }, // Coupon code for discount
    discountPercentage: { type: Number }, // Percentage of discount
    expiryDate: { type: Date }, // Expiry date for the coupon
  }],

  // Banner image URL for the course (often displayed in course detail pages or course lists)
  courseBannerUrl: { type: String },

  // A detailed description of the course, helping users understand the content and what to expect
  description: { type: String, required: true },

  // Link to the syllabus or curriculum of the course (could be a PDF or web page)
  syllabusLink: { type: String },

  // Array of reviews associated with this course, typically linked to another "Review" model
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  
  // Reviews count, indicating how many reviews this course has received
  reviewsCount: { type: Number, default: 0 },

  // Average rating of the course, typically calculated as an average of all reviews
  averageRating: { type: Number, default: 0 },

  // Boolean field indicating whether the course is free or paid
  isFreeCourse: { type: Boolean, default: false },

  // Array of instructors for the course (could be multiple instructors for a single course)
  instructors: [{
    name: { type: String }
  }],

  // Course categories like "Programming", "Data Science", "Design", etc., to help categorize the course
  categories: [{ type: String }],

  // Language in which the course is delivered, e.g., "English", "Spanish", etc.
  language: { type: String, required: true },

  // Materials related to the course, like links to videos, books, or documents
  materials: [{ type: String }],

  // Demo link for previewing a portion of the course content (could be a free intro or sample lesson)
  demoLink: { type: String },

  // Link to a certificate awarded upon completion of the course
  democertificationLink: { type: String },
});

module.exports = mongoose.model("Course", courseSchema);
