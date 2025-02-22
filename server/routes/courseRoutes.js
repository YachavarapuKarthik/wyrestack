const express = require('express');
const CourseModel = require('../models/Course');

const router = express.Router();

/**
 * @route POST /courses/add
 * @desc Add a New Course
 */
router.post('/add', async (req, res) => {
  try {
    const {
      courseLogoUrl,
      title,
      start_date,
      duration,
      trainer,
      price,
      courseBannerUrl,
      syallabusLink,
      description,
      isFreeCourse,
      language,
      materials,
      demoLink,
    } = req.body;

    const newCourse = new CourseModel({
      courseLogoUrl,
      title,
      start_date,
      duration,
      trainer,
      price,
      courseBannerUrl,
      syallabusLink,
      description,
      isFreeCourse,
      language,
      materials,
      demoLink,
    });

    await newCourse.save();

    res.status(201).json({ 
      message: 'Course added successfully', 
      course: newCourse 
    });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ 
      message: 'Error adding course', 
      error: error.message 
    });
  }
});

/**
 * @route GET /courses/
 * @desc Get All Courses
 */
router.get('/', async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ 
      message: 'Error fetching courses', 
      error: error.message 
    });
  }
});

/**
 * @route GET /courses/:id
 * @desc Get a specific course by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findById(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ 
      message: 'Error fetching course', 
      error: error.message 
    });
  }
});

/**
 * @route PUT /courses/edit/:id
 * @desc Edit an Existing Course by ID
 */
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCourse = await CourseModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ 
      message: 'Course updated successfully', 
      course: updatedCourse 
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ 
      message: 'Error updating course', 
      error: error.message 
    });
  }
});

/**
 * @route DELETE /courses/delete/:id
 * @desc Delete a Course by ID
 */
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await CourseModel.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ 
      message: 'Course deleted successfully', 
      course: deletedCourse 
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ 
      message: 'Error deleting course', 
      error: error.message 
    });
  }
});

module.exports = router;
