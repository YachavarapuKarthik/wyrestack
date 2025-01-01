import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Admin.css";

interface Course {
  _id?: string;
  logo: string;
  courseLogoUrl?: string;
  title: string;
  courseTitle?: string;
  mode: string;
  courseMode?: string;
  start_date?: string;
  courseStartDate?: string;
  registrationStartDate?: string;
  registrationEndDate?: string;
  duration: string;
  trainer: string;
  price: number;
  originalPrice?: number;
  discountedPrice?: number;
  coursePaymentCoupons?: {
    code: string;
    discountPercentage: number;
    expiryDate: string;
  }[];
  courseBannerUrl?: string;
  description: string;
  syllabusLink?: string;
  reviewsCount?: number;
  averageRating?: number;
  isFreeCourse?: boolean;
  instructors?: { name: string }[];
  categories?: string[];
  language: string;
  materials?: string[];
  demoLink?: string;
  democertificationLink?: string;
}

const AdminPage: React.FC = () => {
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editCourseId, setEditCourseId] = useState<string | null>(null);
  const [course, setCourse] = useState<Course>({
    logo: "",
    title: "",
    mode: "",
    duration: "",
    trainer: "",
    price: 0,
    description: "",
    language: "",
  });
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const addCourse = async () => {
    try {
        // Add new course if no editCourseId
        await axios.post("http://localhost:5000/courses/add", course);
        alert("Course added successfully!");
      
      
      // Close the form after adding/updating
      setShowCourseForm(false);
      
      // Refresh the course list
      refreshCourses(); 
    } catch (error) {
      console.error("Error saving course:", error);
      alert("An error occurred while saving the course.");
    }
  };

  const refreshCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error refreshing courses:", error);
    }
  };

  const editCourse = (course: Course) => {
    setCourse(course);
    setEditCourseId(course._id || null);
    setShowCourseForm(true);
  };

  const deleteCourse = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/courses/delete/${id}`);
      alert("Course deleted successfully!");
      refreshCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Admin Dashboard</h1>

      <div className="admin-page__courses-section">
        <h2 className="admin-page__subtitle">Manage Courses</h2>
        <button
          className="btn btn--toggle-form"
          onClick={() => setShowCourseForm(!showCourseForm)}
        >
          {showCourseForm ? "Close Form" : "Add New Course"}
        </button>

        {showCourseForm && (
          <div className="course-form">
            <input
              className="course-form__input"
              type="text"
              name="logo"
              placeholder="Logo URL"
              value={course.logo}
              onChange={handleCourseChange}
            />
            <input
              className="course-form__input"
              type="text"
              name="courseLogoUrl"
              placeholder="Course Logo URL"
              value={course.courseLogoUrl || ""}
              onChange={handleCourseChange}
            />
            <input
              className="course-form__input"
              type="text"
              name="title"
              placeholder="Course Title"
              value={course.title}
              onChange={handleCourseChange}
            />
            <input
              className="course-form__input"
              type="text"
              name="mode"
              placeholder="Mode"
              value={course.mode}
              onChange={handleCourseChange}
            />
            <input
              className="course-form__input"
              type="date"
              name="start_date"
              placeholder="Start Date"
              value={course.start_date || ""}
              onChange={handleCourseChange}
            />
            <input
              className="course-form__input"
              type="text"
              name="duration"
              placeholder="Duration"
              value={course.duration}
              onChange={handleCourseChange}
            />
            <input
              className="course-form__input"
              type="text"
              name="trainer"
              placeholder="Trainer"
              value={course.trainer}
              onChange={handleCourseChange}
            />
            <input
              className="course-form__input"
              type="number"
              name="price"
              placeholder="Price"
              value={course.price}
              onChange={handleCourseChange}
            />
            <input
              className="course-form__input"
              type="number"
              name="originalPrice"
              placeholder="Original Price"
              value={course.originalPrice || ""}
              onChange={handleCourseChange}
            />
            <input
              className="course-form__input"
              type="number"
              name="discountedPrice"
              placeholder="Discounted Price"
              value={course.discountedPrice || ""}
              onChange={handleCourseChange}
            />
            <textarea
              className="course-form__textarea"
              name="description"
              placeholder="Description"
              value={course.description}
              onChange={handleCourseChange}
            ></textarea>
            <input
              className="course-form__input"
              type="text"
              name="syllabusLink"
              placeholder="Syllabus Link"
              value={course.syllabusLink || ""}
              onChange={handleCourseChange}
            />
            <input
              className="course-form__input"
              type="text"
              name="language"
              placeholder="Language"
              value={course.language}
              onChange={handleCourseChange}
            />
            <textarea
              className="course-form__textarea"
              name="materials"
              placeholder="Materials"
              value={course.materials?.join(", ") || ""}
              onChange={(e) => {
                const materials = e.target.value.split(", ");
                setCourse({ ...course, materials });
              }}
            ></textarea>
            <input
              className="course-form__input"
              type="text"
              name="demoLink"
              placeholder="Demo Link"
              value={course.demoLink || ""}
              onChange={handleCourseChange}
            />
            <input
              className="course-form__input"
              type="text"
              name="democertificationLink"
              placeholder="Demo Certification Link"
              value={course.democertificationLink || ""}
              onChange={handleCourseChange}
            />
            <button className="btn btn--submit" onClick={addCourse}>
              {"Add Course"}
            </button>
          </div>
        )}

        <div className="course-list">
          <h3 className="course-list__title">All Courses</h3>
          {courses.map((course) => (
            <div key={course._id} className="course-item">
              <h4 className="course-item__title">{course.title}</h4>
              <p className="course-item__trainer">Trainer: {course.trainer}</p>
              <p className="course-item__mode">Mode: {course.mode}</p>
              <p className="course-item__price">Price: ₹{course.price}</p>
              <button
                className="btn btn--edit"
                onClick={() => editCourse(course)}
              >
                Edit
              </button>
              <button
                className="btn btn--delete"
                onClick={() => deleteCourse(course._id || "")}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
