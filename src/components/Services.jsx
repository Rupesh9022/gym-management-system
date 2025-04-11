import React from "react";
import { Link } from "react-router-dom";

function Services() {
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
          <h1 className="text-4xl font-bold mb-6">Our Services</h1>
          <p className="text-lg text-gray-300">
            At GymPro, we provide innovative solutions tailored to optimize your gym operations and elevate member
            experiences.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Membership Management</h2>
            <p>Streamline your gym's operations with our comprehensive membership management system.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Class Scheduling</h2>
            <p>Easily manage and book classes, ensuring optimal utilization of your gym's resources.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Equipment Tracking</h2>
            <p>Keep track of your gym equipment, maintenance schedules, and usage patterns.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Financial Management</h2>
            <p>Handle billing, payments, and financial reporting with our integrated financial tools.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Member Portal</h2>
            <p>Provide your members with a personalized portal to manage their accounts and track their progress.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Reporting and Analytics</h2>
            <p>Gain valuable insights into your gym's performance with our advanced reporting features.</p>
          </div>
        </div>
      </main>
      <footer className="relative z-10 container mx-auto px-4 py-8 text-center text-gray-400">
        <p>&copy; 2023 GymPro Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Services;
