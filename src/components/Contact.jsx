
import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">GymPro</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-300 transition duration-300">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-blue-300 transition duration-300">
            About
          </Link>
          <Link to="/services" className="text-white hover:text-blue-300 transition duration-300">
            Services
          </Link>
          <Link
            to="/signin"
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </Link>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-gray-300">
            We'd love to hear from you. Reach out to us for any inquiries or assistance.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <form className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg">
              <div>
                <label htmlFor="name" className="block mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 border rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full p-2 border rounded bg-gray-700 text-white"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              <strong>Address:</strong> 123 Gym Street, Fitness City, FC 12345
            </p>
            <p className="mb-4">
              <strong>Phone:</strong> (123) 456-7890
            </p>
            <p className="mb-4">
              <strong>Email:</strong> info@gympro.com
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-4">Business Hours</h3>
            <p className="mb-2">Monday - Friday: 6:00 AM - 10:00 PM</p>
            <p className="mb-2">Saturday - Sunday: 8:00 AM - 8:00 PM</p>
          </div>
        </div>
      </main>
      <footer className="relative z-10 container mx-auto px-4 py-8 text-center text-gray-400">
        <p>&copy; 2023 GymPro Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Contact;
