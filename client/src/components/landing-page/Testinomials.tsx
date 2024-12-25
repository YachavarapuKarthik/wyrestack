import React, { useEffect, useState } from "react";

const testimonialsData = [
  {
    text: "It's a great course for anyone who wants to become a web designer or developer. I really liked the practical focus of the course - we not only studied theory but also created our own websites from scratch.",
    author: "Sarah Williams",
    stars: 5,
    bgColor: "#a7d26e",
  },
  {
    text: "This course was the perfect start for my career in programming! The materials were well-structured and the teachers were professionals in their field.",
    author: "John Doe",
    stars: 4,
    bgColor: "#fefeff",
  },
  {
    text: "Excellent training sessions that helped me understand advanced programming concepts clearly. Highly recommend this course!",
    author: "Emily Smith",
    stars: 5,
    bgColor: "#20B2AA",
  },
];

function Testimonials() {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prevIndex) =>
        prevIndex < testimonialsData.length - 1 ? prevIndex + 1 : 0
      );
    }, 3000); // Change testimonial every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="testimonials-container">
      <h2>Our Students Say</h2>
      <div className="testimonials-wrapper">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className={`testimonial-item ${
              index === visibleIndex ? "visible" : ""
            }`}
            style={{
              backgroundColor: testimonial.bgColor,
              zIndex: index === visibleIndex ? 2 : 1,
            }}
          >
            <p className="testimonial-text">"{testimonial.text}"</p>
            <p className="testimonial-author">{testimonial.author}</p>
            <div className="stars">
              {"★".repeat(testimonial.stars)}
              {"☆".repeat(5 - testimonial.stars)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
