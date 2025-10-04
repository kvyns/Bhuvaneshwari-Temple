import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaMountain, FaSchool, FaOm } from 'react-icons/fa';

const About = () => {
  const { t } = useTranslation();

  const features = [
    { icon: <FaMapMarkerAlt />, title: t('about.location'), description: t('about.locationDesc'), color: '#FF6B6B' },
    { icon: <FaOm />, title: t('about.goddess'), description: t('about.goddessDesc'), color: '#4ECDC4' },
    { icon: <FaMountain />, title: t('about.scenicViews'), description: t('about.scenicViewsDesc'), color: '#FFD93D' },
    { icon: <FaSchool />, title: t('about.guruShishya'), description: t('about.guruShishyaDesc'), color: '#95E1D3' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section className="relative h-[60vh] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(/images/home_2.jpg)'}}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="absolute inset-0" style={{background: 'radial-gradient(circle at center, transparent 0%, rgba(139, 0, 0, 0.3) 100%)'}}></div>
        <motion.div className="relative z-10 max-w-4xl px-8" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">{t('about.title')}</h1>
          <p className="text-xl md:text-2xl text-[#FFD700] drop-shadow-lg">{t('about.subtitle')}</p>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} className="bg-white rounded-2xl p-10 text-center shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.2 }} whileHover={{ scale: 1.05 }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-white"
                  style={{ background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)` }}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl text-[#8B0000] mb-4 font-bold">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Neelkanth Connection Section */}
      <motion.section className="py-20 bg-gradient-to-b from-gray-50 to-white" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div className="rounded-2xl overflow-hidden shadow-2xl" whileHover={{ scale: 1.05 }}>
              <img src="https://images.unsplash.com/photo-1585383646398-eafc9e55ff1d?q=80&w=2070" alt="Neelkanth Mahadev" className="w-full h-full object-cover" />
            </motion.div>
            <div>
              <h2 className="text-4xl md:text-5xl text-[#8B0000] mb-6 font-bold">{t('about.neelkanth')}</h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-700">{t('about.neelkanthDesc')}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Temple Gallery Preview */}
      <motion.section className="py-20 bg-white" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="container">
          <h2 className="text-4xl md:text-5xl text-[#8B0000] text-center mb-12 font-bold">{t('gallery.subtitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <motion.div key={item} className="rounded-2xl overflow-hidden shadow-lg h-80" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <img src={`https://images.unsplash.com/photo-${1580600000000 + item * 1000000}-random?q=80&w=800`} alt={`Temple view ${item}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
