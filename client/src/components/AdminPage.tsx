import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Admin.css";

interface Course {
  _id?: string;
  courseLogoUrl?: string;
  title: string;
  start_date?: string;
  duration: string;
  trainer: string;
  price: number;
  courseBannerUrl?: string;
  syllabusLink?: string;
  description: string;
  isFreeCourse?: boolean;
  language: string;
  materials?: string[];
  demoLink?: string;
}

const AdminPage: React.FC = () => {
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editCourseId, setEditCourseId] = useState<string | null>(null);
  const [course, setCourse] = useState<Course>({
    title: "",
    duration: "",
    trainer: "",
    price: 0,
    description: "",
    language: "",
  });
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    refreshCourses();
  }, []);

  const refreshCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleCourseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const addOrUpdateCourse = async () => {
    try {
      if (editCourseId) {
        await axios.put(`http://localhost:5000/courses/edit/${editCourseId}`, course);
        alert("Course updated successfully!");
        
      } else {
        await axios.post("http://localhost:5000/courses/add", course);
        alert("Course added successfully!");
      }
      setShowCourseForm(false);
      setEditCourseId(null);
      refreshCourses();
    } catch (error) {
      console.error("Error saving course:", error);
      alert("An error occurred while saving the course.");
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
          onClick={() => {
            setShowCourseForm(!showCourseForm);
            if (showCourseForm) {
              setCourse({
                title: "",
                duration: "",
                trainer: "",
                price: 0,
                description: "",
                language: "",
              });
              setEditCourseId(null);
            }
          }}
        >
          {showCourseForm ? "Close Form" : "Add New Course"}
        </button>


        {showCourseForm && (
          <div className="course-form">
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
            <button className="btn btn--submit" onClick={addOrUpdateCourse}>
              {editCourseId ? "Update Course" : "Add Course"}
            </button>
          </div>
        )}

        <div className="course-list">
          <h3 className="course-list__title">All Courses</h3>
          {courses.map((course) => (
            <div key={course._id} className="course-item">
              <h4 className="course-item__title">{course.title}</h4>
              <p className="course-item__trainer">Trainer: {course.trainer}</p>
              <p className="course-item__duration">Duration: {course.duration}</p>
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
