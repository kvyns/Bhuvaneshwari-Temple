import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaVideo, FaPrayingHands, FaDonate, FaClock } from 'react-icons/fa';

const Home = () => {
  const { t } = useTranslation();

  const services = [
    { 
      icon: <FaVideo />, 
      title: t('home.liveDarshan'), 
      description: t('darshan.subtitle'), 
      link: '/darshan', 
      gradient: 'from-red-400 to-red-600' 
    },
    { 
      icon: <FaPrayingHands />, 
      title: t('home.onlinePuja'), 
      description: t('puja.subtitle'), 
      link: '/puja', 
      gradient: 'from-teal-400 to-teal-600' 
    },
    { 
      icon: <FaDonate />, 
      title: t('home.donate'), 
      description: t('donation.subtitle'), 
      link: '/donation', 
      gradient: 'from-yellow-400 to-yellow-600' 
    },
    { 
      icon: <FaClock />, 
      title: t('home.aartiTimings'), 
      description: t('aarti.subtitle'), 
      link: '/aarti', 
      gradient: 'from-cyan-300 to-cyan-500' 
    }
  ];

  // Animation variants for consistency
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* ========== HERO SECTION ========== */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Video Background with Overlay */}
        <div className="absolute inset-0 overflow-hidden">
            <video
                className="absolute h-full w-full object-cover scale-110"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/videos/final4.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        {/* Radial Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%)'
          }}
        />
        
        {/* Hero Content */}
        <motion.div 
          className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl tracking-wide" 
            initial={{ y: -30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('home.title')}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl mb-6 text-temple-gold drop-shadow-lg font-medium" 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t('home.subtitle')}
          </motion.p>
          
          <motion.p 
            className="text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-3xl mx-auto opacity-95" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {t('home.description')}
          </motion.p>
          
          <motion.div 
            className="flex gap-5 md:gap-6 justify-center items-center flex-wrap mt-2" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link 
              to="/darshan" 
              className="inline-flex items-center justify-center px-8 md:px-12 py-3.5 md:py-4 rounded-full bg-yellow-500 text-temple-maroon font-bold text-sm md:text-base lg:text-lg uppercase tracking-[0.15em] shadow-2xl hover:shadow-3xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 min-w-[180px] md:min-w-[200px]"
            >
              <span>{t('nav.darshan')}</span>
            </Link>
            <Link 
              to="/about" 
              className="inline-flex items-center justify-center px-8 md:px-12 py-3.5 md:py-4 rounded-full bg-transparent text-white border-2 border-white font-bold text-sm md:text-base lg:text-lg uppercase tracking-[0.15em] hover:bg-white hover:text-black hover:-translate-y-1 hover:scale-105 transition-all duration-300 min-w-[180px] md:min-w-[200px] backdrop-blur-sm"
            >
              <span>{t('common.learnMore')}</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== WELCOME SECTION ========== */}
      <section className="relative py-20 md:py-28 lg:py-36 bg-gradient-to-b from-white via-orange-50/20 to-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-temple-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-temple-crimson/5 rounded-full blur-3xl" />
        
        <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl text-temple-maroon text-center mb-12 md:mb-16 font-bold"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {t('home.welcomeTitle')}
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="\images\home_1.jpg" 
                  alt="Temple Deity"
                  className="w-full h-[500px] md:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-temple-maroon/30 to-transparent" />
              </div>
            </motion.div>
            
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-700 mb-6">
                {t('home.welcomeText')}
              </p>
              <Link 
                to="/about" 
                className="inline-block bg-temple-maroon text-white bg-red-800 px-8 py-3 rounded-full font-semibold hover:bg-temple-crimson transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {t('common.learnMore')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== QUICK SERVICES SECTION ========== */}
      <section className="py-20 md:py-28 lg:py-36 bg-gradient-to-b from-gray-50 to-white">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl text-temple-maroon font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('home.quickLinks')}
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-base md:text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Explore our spiritual services
            </motion.p>
          </div>
          
          {/* Services Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                className="group"
                variants={fadeInUp}
              >
                <Link to={service.link} className="block no-underline">
                  <div className="relative bg-white rounded-3xl p-8 md:p-10 text-center shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-transparent overflow-hidden group-hover:-translate-y-2">
                    
                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mx-auto text-5xl text-white shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br ${service.gradient}`}>
                        {service.icon}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl text-gray-800 group-hover:text-temple-maroon mb-4 font-bold transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-base mb-4">
                      {service.description}
                    </p>
                    
                    {/* Learn More Arrow */}
                    <div className="text-temple-maroon font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      Learn More →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== TEMPLE GLIMPSES SECTION ========== */}
      <section className="py-20 md:py-28 lg:py-36 bg-white">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl text-temple-maroon text-center mb-16 md:mb-20 font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Temple Glimpses
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* Image 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-full"
            >
              <div className="relative w-full h-full min-h-[300px]">
                <img 
                  src="\images\home_2.jpg" 
                  alt="Temple Architecture"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold drop-shadow-lg">Sacred Architecture</h3>
                </div>
              </div>
            </motion.div>

            {/* Image 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-full"
            >
              <div className="relative w-full h-full min-h-[300px]">
                <img 
                  src="\images\home_3.jpg" 
                  alt="Temple Bells"
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold drop-shadow-lg">Divine Mata</h3>
                </div>
              </div>
            </motion.div>

            {/* Image 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-full"
            >
              <div className="relative w-full h-full min-h-[300px]">
                <img 
                  src="\images\home_4.jpg" 
                  alt="Temple Lamps"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold drop-shadow-lg">Sacred Diyas</h3>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link 
              to="/gallery" 
              className="inline-block bg-temple-maroon text-white bg-red-800 px-10 py-4 rounded-full font-semibold hover:bg-temple-crimson transition-all duration-300 hover:scale-105 shadow-lg text-lg"
            >
              View Full Gallery →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== TEMPLE TIMINGS SECTION ========== */}
      <section className="py-20 md:py-28 lg:py-36 bg-gradient-to-br from-temple-maroon to-temple-crimson ">
        <div className="container max-w-6xl mx-auto px-6 md:px-12 ">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl text-center mb-16 md:mb-20 font-bold text-red-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('darshan.timings')}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto ">
            {/* Morning Timing */}
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-3xl p-10 md:p-12 text-center border-2 border-white/20 shadow-2xl transition-all duration-500 hover:border-yellow-500"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 text-temple-gold font-bold">
                {t('darshan.morning')}
              </h3>
              <p className="text-xl md:text-2xl lg:text-3xl font-medium">
                {t('darshan.morningTime')}
              </p>
            </motion.div>
            
            {/* Evening Timing */}
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-3xl p-10 md:p-12 text-center border-2 border-white/20 shadow-2xl transition-all duration-500 hover:border-yellow-500"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 text-temple-gold font-bold">
                {t('darshan.evening')}
              </h3>
              <p className="text-xl md:text-2xl lg:text-3xl font-medium">
                {t('darshan.eveningTime')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SPIRITUAL OFFERINGS SECTION ========== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl text-temple-maroon text-center mb-16 font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Sacred Rituals & Offerings
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/home_5.jpg" 
                  alt="Temple Offerings"
                  className="w-full h-[350px] object-cover"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" /> */}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl text-temple-maroon font-bold mb-4">Daily Rituals</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Experience the divine energy through our traditional rituals and ceremonies. Each puja is performed with utmost devotion and authenticity by our experienced pandits.
              </p>
              <Link 
                to="/puja" 
                className="inline-block bg-temple-gold text-temple-maroon px-8 py-3 rounded-full font-semibold bg-red-800 text-white transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Book a Puja
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <h3 className="text-2xl md:text-3xl text-temple-maroon font-bold mb-4">Evening Aarti</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Join us for the mesmerizing evening aarti, where devotees gather to offer prayers and witness the divine atmosphere filled with bhajans and spiritual energy.
              </p>
              <Link 
                to="/aarti" 
                className="inline-block bg-temple-maroon text-white px-8 py-3 rounded-full font-semibold hover:bg-temple-crimson transition-all bg-red-800 text-white duration-300 hover:scale-105 shadow-lg"
              >
                Aarti Timings
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 md:order-2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/home_6.jpg" 
                  alt="Evening Aarti"
                  className="w-full h-[350px] object-cover"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" /> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CALL TO ACTION SECTION ========== */}
      <section className="relative py-20 md:py-28 lg:py-36 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-temple-maroon rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-temple-gold rounded-full blur-3xl" />
        </div>
        
        <div className="container max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl text-temple-maroon mb-6 md:mb-8 font-bold" 
            initial={{ scale: 0.9, opacity: 0 }} 
            whileInView={{ scale: 1, opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
          >
            {t('donation.subtitle')}
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-700 mb-10 md:mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Your contribution helps us maintain the temple and serve the community
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link 
              to="/donation" 
              className="inline-block bg-gradient-to-r from-temple-gold to-yellow-500 text-temple-maroon px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border-2 border-yellow-600 hover:border-temple-maroon"
            >
              {t('donation.donate')} 🙏
            </Link>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
