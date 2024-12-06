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

    // Update the course to include the new review
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

    // Fetch reviews for a specific course
    const reviews = await ReviewModel.find({ course: courseId }).populate('course', 'title');

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

// Get All Courses with Reviews
router.get('/', async (req, res) => {
  try {
    const courses = await CourseModel.find().populate('reviews');
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});

module.exports = router;
