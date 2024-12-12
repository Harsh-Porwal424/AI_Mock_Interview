'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import Head from 'next/head'
import Link from 'next/link'
import { FaGithub, FaBars, FaTimes } from "react-icons/fa"
import { motion } from "framer-motion"
import Image from 'next/image'; // Import Next.js Image component



const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      })
    }

    function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.fill()

        particle.x += particle.dx
        particle.y += particle.dy

        if (particle.x < 0 || particle.x > canvas.width) particle.dx = -particle.dx
        if (particle.y < 0 || particle.y > canvas.height) particle.dy = -particle.dy
      })
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

const NavLink = ({ href, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-lg text-gray-200 mx-2 md:mx-4 hover:text-white transition-colors duration-300"
    >
      {children}
    </a>
  );
};

const Page = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Head>
        <title>AI Interview Trainer</title>
        <meta name="description" content="Ace your next interview with AI-powered mock interviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`fixed w-full py-4 transition-all duration-300 z-10 ${isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold text-white">AI Mock Interview</h1>
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <a
              href="https://github.com/Harsh-Porwal424/AI_Mock_Interview"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </nav>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 py-4">
            <nav className="flex flex-col items-center space-y-4">
              <NavLink href="#features" onClick={toggleMenu}>Features</NavLink>
              <NavLink href="#testimonials" onClick={toggleMenu}>Testimonials</NavLink>
              <NavLink href="#contact" onClick={toggleMenu}>Contact</NavLink>
              <a
                href="https://github.com/Harsh-Porwal424/AI_Mock_Interview"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-300"
                onClick={toggleMenu}
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="relative">
        <ParticleBackground />

        <section className="relative flex flex-col items-center justify-center min-h-screen text-center py-20 px-6 md:px-0">
  {/* Background Particle Canvas */}
  <div className="absolute inset-0 z-0">
    <canvas id="particles" className="w-full h-full"></canvas>
  </div>

  {/* Main Content */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="z-10"
  >
    <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
      Ace Your Next Interview
    </h2>

    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
      Practice with <span className="text-blue-400 font-semibold">AI-powered mock interviews </span> 
       and get personalized feedback to land your dream job.
    </p>

    {/* Button Section */}
    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
  {/* Get Started Button */}
  <Button
    asChild
    className="button-64 relative hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
  >
    <Link href="/dashboard">
      <span className="text">Get Started</span>
    </Link>
  </Button>

  {/* Learn More Button */}
  <Button
    asChild
    variant="outline"
    className="button-64 relative border-2 border-teal-300 text-teal-300 shadow-lg hover:bg-teal-300 hover:text-gray-900 transition-all duration-300 rounded-lg"
  >
    <a href="#features">
      <span className="text">Learn More</span>
    </a>
  </Button>
</div>
  </motion.div>
</section>

        <section id="features" className="py-20 bg-gray-800">
          <div className="container mx-auto text-center px-6 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-8">Features</h2>
              <p className="text-xl text-gray-300 mb-12">
                Our AI Mock Interview platform offers a range of powerful features:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "AI Mock Interviews",
                    description: "Experience realistic interview scenarios with our advanced AI.",
                    icon: "🤖",
                  },
                  {
                    title: "Instant Feedback",
                    description: "Get instant, personalized feedback to improve your performance.",
                    icon: "📊",
                  },
                  {
                    title: "Comprehensive Reports",
                    description: "Receive detailed reports highlighting your strengths and weaknesses.",
                    icon: "📝",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-gray-900">
          <div className="container mx-auto text-center px-6 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-12">What Our Users Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    quote: "The AI mock interviews were incredibly helpful. I felt much more confident going into my real interview.",
                    author: "Rohan Agarwal",
                  },
                  {
                    quote: "The feedback was spot on and helped me improve my answers. Highly recommend this service!",
                    author: "Harsh Pandey",
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-800 rounded-lg p-6 shadow-lg"
                  >
                    <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                    <p className="text-blue-400 font-semibold">- {testimonial.author}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

          
        <section id="team" className="py-20 bg-gray-800">
          <div className="container mx-auto text-center px-6 md:px-0">
            <motion.div
              initial={{ opacity: 20, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-12">Meet our Team</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {[
                  { name: "Harsh Porwal", image: "/har.png" },
                  { name: "Anish Sinha", image: "/ani.jpeg" },
                  { name: "Yogant Sahu", image: "/yog.jpeg" },
                  { name: "Vishwas Mishra", image: "/vis.jpeg" },
                  { name: "Somdatta Pradhan", image: "/som.jpeg" },
                  { name: "Ankur Suman", image: "/ank.jpeg" },

                ].map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-32 h-32 mb-4 overflow-hidden rounded-full bg-gray-700">
                      <Image
                        src={member.image}
                        alt={`${member.name}'s profile`}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        

        <section id="contact" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white text-center mb-12">Get in Touch</h2>
              <form className="max-w-lg mx-auto">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                  <input type="text" id="name" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-gray-800 text-gray-400 text-center">
        <p>© {new Date().getFullYear()} AI Mock Interview. All rights reserved to Team Interviewee Skill Analysis Using ML</p>
      </footer>
    </div>
  )
}

export default Page
