import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "../header/NavBar";
import "../../css/coursepage-css/CourseDashboard.css";

interface Course {
  _id: string;
  logo: string;
  banner: string;
  title: string;
  trainer: string;
  mode: string;
  price: number;
  start_date: string;
  duration: string;
  description:string;
}

function CourseDashboard() {
  const { id } = useParams<{ id: string }>();  // Extract the course _id from the URL
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/courses/${id}`);
        setCourse(response.data);  // Response includes the course with the MongoDB _id
      } catch (err) {
        setError("Failed to load course details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (loading) return <div>Loading course details...</div>;
  if (error) return <div>{error}</div>;

  if (!course) return <div>Course not found</div>;

  return (
    <>
      <NavBar />
      <div className="dash-container">
                <div className="dash-info">
                    <div className="dash-left">
                        <div className="corsinfo">
                            <h2>{course.title}</h2>
                            <h4>{course.trainer}</h4>
                            <p>{course.description}</p>
                          </div>
                    </div>
          <div className="dash-right">
            <div className="vidplay">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/iSfrVNowJ9Y?si=UC6aa9RY-TXZD1tm"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="vidinfo">
              <p className="vidcap">Preview this course</p>
              <span className="offprice">₹{course.price}</span>
              <span className="actprice">₹{6999}</span>
              <span className="off">84% off</span>
              <br />
              <button className="enroll">Enroll now!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDashboard;
