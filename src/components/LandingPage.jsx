import { motion } from "framer-motion"
import { Calendar, ChevronRight, Dumbbell, Users } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="https://imgs.search.brave.com/5HphTRzYgXqmndrXKSazQXRz9M4jGgAjLrB-cgh9vJE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzAyLzIzLzkx/LzM2MF9GXzEwMDIy/MzkxMzVfR1QwZHpE/OVl0UUlncmF3OGxN/WE5hUHlnTjQydmtD/UE4uanBn"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-20">
          <h1 className="text-3xl font-bold">GymPro</h1>
          <nav className="space-x-4">
            <Link to="/about" className="text-white hover:text-blue-300 transition duration-300">
              About
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Transform Your Fitness Journey</h2>
            <p className="text-xl mb-8">Experience the future of gym management with GymPro</p>
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300 inline-flex items-center"
            >
              Get Started <ChevronRight className="ml-2" />
            </Link>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <Dumbbell className="w-12 h-12 mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">State-of-the-art Equipment</h3>
              <p className="text-gray-300">Access to premium fitness equipment for all your workout needs.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <Users className="w-12 h-12 mb-4 text-green-400" />
              <h3 className="text-xl font-semibold mb-2">Expert Trainers</h3>
              <p className="text-gray-300">Personalized guidance from certified fitness professionals.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <Calendar className="w-12 h-12 mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-300">Book classes and sessions that fit your busy lifestyle.</p>
            </motion.div>
          </div>
        </main>
      </div>
      <footer className="relative z-10 container mx-auto px-4 py-8 text-center text-gray-400">
        <p>&copy; 2023 GymPro Management System. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage

