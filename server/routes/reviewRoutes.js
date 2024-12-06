const express = require('express');
const ReviewModel = require('../models/Review');
const CourseModel = require('../models/Course');

const router = express.Router();

// Add a Review to a Course
router.post('/add', async (req, res) => {
  try {
    const { courseId, name, rating, description } = req.body;

    const newReview = new ReviewModel({
      name,
      course: courseId,
      rating,
      description,
    });

    const savedReview = await newReview.save();

    // Update Course with the new Review
    await CourseModel.findByIdAndUpdate(courseId, {
      $push: { reviews: savedReview._id },
    });

    res.status(201).json({ message: 'Review added successfully', review: savedReview });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
});

// Get Reviews for a Specific Course
router.get('/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;

    const reviews = await ReviewModel.find({ course: courseId });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

module.exports = router;
