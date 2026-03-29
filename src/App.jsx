import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Signal, Bell, MapPin, Layout, Smartphone, Zap, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import './index.css'

const slides = [
  {
    id: 1,
    title: "One-Press SOS",
    description: "A single press captures an alert in milliseconds. No hesitation, no delay. Just immediate safety when you need it most.",
    badge: "Instant Alert",
    icon: <Shield size={32} className="text-purple-400" />,
    image: "/images/hero_switch.webp",
    color: "purple"
  },
  {
    id: 2,
    title: "Zero-Internet Reliability",
    description: "Equipped with the A9G GSM+GPS module. Works in rural areas and dead zones where smartphones fail. Connectivity that doesn't depend on WiFi.",
    badge: "Offline Ready",
    icon: <Signal size={32} />,
    image: "/images/gsm_module.webp",
    color: "red"
  },
  {
    id: 3,
    title: "Dual-Action Alert",
    description: "Simultaneous SMS with live location and an automated voice call to your emergency contacts. Two ways to ensure your message is heard.",
    badge: "Guaranteed Response",
    icon: <Bell size={32} />,
    image: "/images/dual_alert.webp",
    color: "purple"
  },
  {
    id: 4,
    title: "Precise GPS Tracking",
    description: "Real-time location sharing via Google Maps link, accurate within 5–10 meters. Your contacts know exactly where you are, instantly.",
    badge: "High Precision",
    icon: <MapPin size={32} />,
    image: "/images/gps_tracking.webp",
    color: "red"
  },
  {
    id: 5,
    title: "Cloud-Based Config",
    description: "Web interface to update emergency contacts without touching the device code. Manage your safety net from any browser.",
    badge: "Smart Management",
    icon: <Layout size={32} />,
    image: "/images/dashboard.webp",
    color: "purple"
  },
  {
    id: 6,
    title: "Discreet Portability",
    description: "Compact design developed for everyday carry. The current prototype is small enough to fit inside an AirPods case.",
    badge: "Compact Design",
    icon: <Smartphone size={32} />,
    image: "/images/portability.webp",
    color: "red"
  },
  {
    id: 7,
    title: "Performance Metrics",
    description: "12-day standby battery life and a 35-second average total response time. Reliability that lasts nearly two weeks on a single charge.",
    badge: "Power Efficiency",
    icon: <Zap size={32} />,
    image: "/images/performance.webp",
    color: "purple"
  },
  {
    id: 8,
    title: "Recognized Excellence",
    description: "Winner of the ADC-2024 Embedded Project Competition at IIIT Bangalore. Developed at PACE, CSE Department.",
    badge: "Award Winning",
    icon: <Award size={32} />,
    image: "/images/recognition.webp",
    color: "red"
  }
]

const Slide = ({ slide, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="slide-container"
  >
    <div className="glass-card">
      <div className="slide-content">
        <div className={`badge ${slide.color === 'purple' ? 'badge-purple' : 'badge-red'}`}>
          {slide.badge}
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/5 rounded-xl">
            {slide.icon}
          </div>
        </div>
        <h2>{slide.title}</h2>
        <p>{slide.description}</p>
        
        <div className="hardware-preview">
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="hardware-image"
            style={{ 
              border: `1px solid ${slide.color === 'purple' ? 'rgba(156,39,176,0.3)' : 'rgba(233,30,99,0.3)'}`
            }}
          />
        </div>
      </div>
    </div>
  </motion.div>
)

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setDirection(1)
      setCurrentIndex(prev => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(prev => prev - 1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  return (
    <div className="app-main">
      <AnimatePresence mode="wait">
        <Slide 
          key={slides[currentIndex].id} 
          slide={slides[currentIndex]} 
          index={currentIndex} 
        />
      </AnimatePresence>

      <div className="progress-indicator">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
          />
        </div>
        <span>
          {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      <div className="nav-controls">
        <button 
          className="nav-btn" 
          onClick={prevSlide} 
          disabled={currentIndex === 0}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          className="nav-btn" 
          onClick={nextSlide} 
          disabled={currentIndex === slides.length - 1}
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .flex { display: flex; }
        .items-center { align-items: center; }
        .gap-4 { gap: 1rem; }
        .mb-4 { margin-bottom: 1rem; }
        .bg-white\\/5 { background-color: rgba(255, 255, 255, 0.05); }
        .rounded-xl { border-radius: 0.75rem; }
        .p-3 { padding: 0.75rem; }
        .text-purple-400 { color: #ce93d8; }
        .app-main { overflow: hidden; height: 100vh; position: relative; }
      `}} />
    </div>
  )
}
