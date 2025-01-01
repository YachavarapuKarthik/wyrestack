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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa deserunt ipsam quos et in similique eaque sed illo ut, velit accusamus neque quaerat nemo quam eveniet ex voluptate quod consequuntur. Earum minima distinctio esse animi aliquam perferendis. Nostrum autem omnis quae pariatur porro magnam culpa quod sunt esse, enim illo vero laboriosam sint aliquam illum? Ipsum laboriosam maiores neque, earum porro quaerat in perspiciatis facilis dolorem quia, voluptas repudiandae officiis explicabo nesciunt labore! Odit non numquam, dolore delectus dolorem dicta, tenetur sed in voluptates blanditiis aut fugit quisquam quod a? Assumenda, sed odit distinctio provident harum voluptatibus autem veritatis doloremque!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident cupiditate recusandae deserunt accusamus. Minima odio quam perferendis suscipit at modi iure accusantium tempore velit, autem ullam pariatur illo, aperiam corrupti magni voluptate deserunt beatae! Voluptatem voluptas, doloribus, eligendi minus iure dolorem harum quidem ullam excepturi molestiae repudiandae officiis aperiam possimus?     Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum error ab amet deleniti distinctio similique laborum natus, quas vitae consequuntur sapiente nam earum libero sint tempore a nesciunt adipisci at quis id saepe odio aliquam excepturi? Neque nam blanditiis laboriosam reiciendis natus! Culpa quasi qui sapiente nisi sit nihil voluptate vel! Quis modi tenetur ea impedit excepturi ut, quo omnis odit quod inventore tempora eveniet illo, hic, fugiat itaque aperiam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum reiciendis maxime laboriosam, eum natus fuga est molestiae sit quidem facere impedit quod laudantium, nemo cupiditate suscipit quaerat dolor delectus optio perferendis, quo non. Tempora beatae, reiciendis eos modi et molestias voluptate recusandae eum veniam. Reprehenderit quo voluptate dolorem deserunt animi, deleniti odio, error alias, eligendi tenetur similique cumque. Necessitatibus a alias labore nemo iure ipsa similique vitae esse, earum illum, excepturi placeat molestias. Voluptate esse nisi nemo expedita aliquid et consequatur labore exercitationem tenetur illum. Repellat, aut. Assumenda eius ipsa, quibusdam praesentium blanditiis, voluptatibus vel ducimus incidunt tenetur error voluptates!</p>
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
              <p className="payback">30-Day Money-Back Guarantee</p>
              <p className="payback">Full Lifetime Access</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDashboard;
