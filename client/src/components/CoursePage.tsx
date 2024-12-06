// import React, { useEffect, useState } from "react";
// import axios from "axios";

// // Define the types for reviews and courses
// interface Review {
//   _id: string;
//   name: string;
//   rating: number;
//   description: string;
// }

// interface Course {
//   _id: string;
//   logo: string;
//   title: string;
//   trainer: string;
//   mode: string;
//   start_date: string;
//   duration: string;
//   price: number;
//   reviews: Review[];
// }

// const CoursePage: React.FC = () => {
//   // Initialize state with the proper type for courses
//   const [courses, setCourses] = useState<Course[]>([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         // Make an API call to fetch courses
//         const response = await axios.get("/api/courses");
//         setCourses(response.data); // Set the courses data from the response
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div>
//       <h1>Available Courses</h1>
//       {courses.length === 0 ? (
//         <p>No courses available at the moment.</p>
//       ) : (
//         courses.map((course) => (
//           <div key={course._id}>
//             <img src={course.logo} alt={course.title} />
//             <h2>{course.title}</h2>
//             <p>Trainer: {course.trainer}</p>
//             <p>Mode: {course.mode}</p>
//             <p>Start Date: {new Date(course.start_date).toLocaleDateString()}</p>
//             <p>Duration: {course.duration}</p>
//             <p>Price: ₹{course.price}</p>
//             <h3>Reviews:</h3>
//             <ul>
//               {course.reviews.length === 0 ? (
//                 <li>No reviews yet.</li>
//               ) : (
//                 course.reviews.map((review) => (
//                   <li key={review._id}>
//                     <strong>{review.name}</strong>: {review.rating} stars - {review.description}
//                   </li>
//                 ))
//               )}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default CoursePage;
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Course {
  _id: string;
  logo: string;
  title: string;
  trainer: string;
  mode: string;
  start_date: string;
  duration: string;
  price: number;
  reviews: Review[];
}

interface Review {
  _id: string;
  name: string;
  rating: number;
  description: string;
}

const CoursePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Available Courses</h1>
      {courses.length === 0 ? (
        <p>No courses available at the moment.</p>
      ) : (
        courses.map((course) => (
          <div key={course._id}>
            <img src={course.logo} alt={course.title} />
            <h2>{course.title}</h2>
            <p>Trainer: {course.trainer}</p>
            <p>Mode: {course.mode}</p>
            <p>Start Date: {new Date(course.start_date).toLocaleDateString()}</p>
            <p>Duration: {course.duration}</p>
            <p>Price: ₹{course.price}</p>
            <h3>Reviews:</h3>
            <ul>
              {course.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>: {review.rating} stars - {review.description}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default CoursePage;
