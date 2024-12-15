import React, { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  time: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const ContactNow: React.FC = () => {
  // State to hold form values
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    time: '',
    message: ''
  });

  // State to hold form errors
  const [errors, setErrors] = useState<FormErrors>({});
  
  // State for submission status
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  // Handle change in form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Simple form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // No errors, form is valid
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Automatically set the time to the current time when the form is submitted
    const options = { timeZone: 'Asia/Kolkata', hour12: true };
    const currentTimeIST = new Date().toLocaleString('en-GB', options);
    setFormData((prevData) => ({ ...prevData, time: currentTimeIST }));
    
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/contact/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, time: currentTimeIST
           })
        });

        if (!response.ok) {
          throw new Error('Server error: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Server response:', result);
        setSubmissionStatus('success');
        alert('Thank you for reaching out! We will contact you soon.');

        // Clear form after submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          time: '',
          message: ''
        });
        setErrors({});
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmissionStatus('error');
        alert('An error occurred. Please try again later.');
      }
    } else {
      alert('Please fix the errors in the form');
    }
  };

  return (
    <div className="contact-now-form" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Contact Now</h2>
      {submissionStatus === 'success' && <p className="success-message">Form submitted successfully!</p>}
      {submissionStatus === 'error' && <p className="error-message">There was an error submitting the form.</p>}
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Enter your name" 
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Enter your email" 
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="Enter your phone number" 
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <input 
          type="hidden" 
          id="time" 
          name="time" 
          value={formData.time} 
        />

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            placeholder="Enter your message" 
          ></textarea>
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactNow;