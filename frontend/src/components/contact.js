import React from "react";
import { Button } from "react-bootstrap";
import "../App.css"; // make sure you import the CSS file if styles are there

function Contact() {
  const contact = (event) => {
    event.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    alert(`Hello, ${name}!`);
  };

  return (
    <div className="contact-container">
      <h2>Contact Form</h2>
      <form>
        <label>Email:</label>
        <input type="text" name="email" />
        <label>Full Name:</label>
        <input type="text" name="name" />
        <label>Message:</label>
        <textarea name="message" rows="4"></textarea>
        <Button onClick={contact}>Submit</Button>
      </form>
    </div>
  );
}

export default Contact;