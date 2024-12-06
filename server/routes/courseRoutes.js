const express = require('express');
const CourseModel = require('../models/Course');
const ReviewModel = require('../models/Review');

const router = express.Router();

// Add a New Course
router.post('/add', async (req, res) => {
  try {
    const { logo, banner, title, mode, start_date, duration, trainer, price } = req.body;

    const newCourse = new CourseModel({
      logo,
      banner,
      title,
      mode,
      start_date,
      duration,
      trainer,
      price,
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully', course: newCourse });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Error adding course', error: error.message });
  }
});

// Get All Courses 
router.get('/', async (req, res) => {
  try {
    const courses = await CourseModel.find()//.populate('reviews');
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});

module.exports = router;