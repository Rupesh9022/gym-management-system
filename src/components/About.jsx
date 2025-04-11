import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">GymPro</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-300 transition duration-300">
            Home
          </Link>
          <Link to="/services" className="text-white hover:text-blue-300 transition duration-300">
            Services
          </Link>
          <Link to="/contact" className="text-white hover:text-blue-300 transition duration-300">
            Contact
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
          <h1 className="text-4xl font-bold mb-6">About GymPro</h1>
          <p className="text-lg text-gray-300">
            GymPro is a cutting-edge gym management system designed to revolutionize fitness experiences for both
            gym owners and members.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-300">
              To provide a seamless platform that streamlines operations, enhances member engagement, and promotes a
              healthier lifestyle.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <p className="text-gray-300">
              GymPro offers an all-in-one solution to tackle administrative challenges while focusing on the fitness
              needs of members.
            </p>
          </div>
        </div>
        <h2 className="text-3xl font-bold mt-12 mb-6 text-center">Core Features</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-300">
          <li>Efficient member management</li>
          <li>Automated billing and payments</li>
          <li>Flexible class and personal training schedules</li>
          <li>Personalized workout plans</li>
          <li>Equipment tracking and maintenance</li>
          <li>Detailed performance analytics</li>
        </ul>
        <div className="text-center mt-12">
          <Link
            to="/signup"
            className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300 inline-flex items-center"
          >
            Join Us Today <ChevronRight className="ml-2" />
          </Link>
        </div>
      </main>
      <footer className="relative z-10 container mx-auto px-4 py-8 text-center text-gray-400">
        <p>&copy; 2023 GymPro Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;
