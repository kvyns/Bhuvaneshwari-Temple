import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Darshan from './pages/Darshan';
import Puja from './pages/Puja';
import Donation from './pages/Donation';
import Aarti from './pages/Aarti';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import BookingStatus from './pages/BookingStatus';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/darshan" element={<Darshan />} />
            <Route path="/puja" element={<Puja />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/aarti" element={<Aarti />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking-status" element={<BookingStatus />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
