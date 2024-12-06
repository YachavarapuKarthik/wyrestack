import React, { useState, useEffect } from "react";
import axios from "axios";

// Review type definition
interface Review {
  _id?: string; // Optional because MongoDB will generate it
  name: string;
  course_id: string;
  rating: number;
  description: string;
}

const AdminPage: React.FC = () => {
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [course, setCourse] = useState({
    logo: "",
    banner: "",
    title: "",
    mode: "Online",
    start_date: "",
    duration: "",
    trainer: "",
    price: 0,
  });

  const [review, setReview] = useState<Review>({
    name: "",
    course_id: "",
    rating: 0,
    description: "",
  });

  const [courses, setCourses] = useState<any[]>([]);

  // Fetch courses from the database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };
  

  const addCourse = async () => {
    try {
      await axios.post("/api/courses", course);
      alert("Course added successfully!");
      setShowCourseForm(false);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const addReview = async () => {
    try {
      // Create the review without _id
      await axios.post("/api/reviews", review);
      alert("Review added successfully!");
      setShowReviewForm(false);

      // Re-fetch courses and reviews after adding a review
      const response = await axios.get("/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {/* Manage Courses Section */}
      <div>
        <h2>Manage Courses</h2>
        <button onClick={() => setShowCourseForm(!showCourseForm)}>
          {showCourseForm ? "Close Add Course Form" : "Add New Course"}
        </button>

        {showCourseForm && (
          <div className="course-form">
            <input type="text" name="logo" placeholder="Logo URL" onChange={handleCourseChange} />
            <input type="text" name="banner" placeholder="Banner URL" onChange={handleCourseChange} />
            <input type="text" name="title" placeholder="Title" onChange={handleCourseChange} />
            <input type="text" name="mode" placeholder="Mode" onChange={handleCourseChange} />
            <input type="date" name="start_date" onChange={handleCourseChange} />
            <input type="text" name="duration" placeholder="Duration" onChange={handleCourseChange} />
            <input type="text" name="trainer" placeholder="Trainer" onChange={handleCourseChange} />
            <input type="number" name="price" placeholder="Price" onChange={handleCourseChange} />
            <button onClick={addCourse}>Add Course</button>
          </div>
        )}

        {/* Display Courses */}
        <div>
          <h3>All Courses</h3>
          {courses.map((course) => (
            <div key={course._id}>
              <h4>{course.title}</h4>
              <p>Trainer: {course.trainer}</p>
              <p>Mode: {course.mode}</p>
              <p>Price: ₹{course.price}</p>
              <h5>Reviews:</h5>
              <ul>
                {course.reviews.map((review: any) => (
                  <li key={review._id}>
                    {review.name}: {review.rating} stars - {review.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Manage Reviews Section */}
      <div>
        <h2>Manage Reviews</h2>
        <button onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? "Close Add Review Form" : "Add New Review"}
        </button>

        {showReviewForm && (
          <div className="review-form">
            <input type="text" name="name" placeholder="Reviewer Name" onChange={handleReviewChange} />
            <select name="course_id" onChange={handleReviewChange}>
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
            <input type="number" name="rating" placeholder="Rating (1-5)" onChange={handleReviewChange} />
            <textarea name="description" placeholder="Review Description" onChange={handleReviewChange}></textarea>
            <button onClick={addReview}>Add Review</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
