
import React from 'react';
import '../Styles/Home.css'


function Home () {

  return (
   
    <div>
      {/* Header Section */}
      <header>
        <div className="container header-content">
          <nav>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="./Login">Login</a>
              </li>
              <li>
                <a href="#status">Track Status</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h2>Efficient Complaint Resolution for CUET Students</h2>
            <p>
              Submit your complaints seamlessly, track progress, and improve
              hall management services.
            </p>
           
          </div>
          <div className="hero-image">
            <img src="tapshi.png" alt="Complaint Management" />
          </div>
        </div>
      </section>

      {/* Track Status Section */}
      <section id="status" className="section">
        <div className="container">
          <h2>Track Your Complaint</h2>
          <p>
            To check the progress of your complaint, please get in touch with
            hall authorities or check notifications sent to your email.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <div className="container">
          <h2>Contact Us</h2>
          <p>
            Email:{" "}
            <a href="mailto:halladmin@cuet.ac.bd">halladmin@cuet.ac.bd</a>
          </p>
          <p>Phone: +880-1234-567890</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
          <p>
            &copy; 2024 CUET Hall Complaint Management System. All rights
            reserved.
          </p>
      </footer>
    </div>
  );
 
   
};

export default Home;