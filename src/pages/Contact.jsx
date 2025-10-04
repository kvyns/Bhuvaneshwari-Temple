import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    alert('Thank you for contacting us!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <motion.section 
        className="relative h-[50vh] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('/images/DSC08130.jpg ')"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#8B0000]/30"></div>
        <motion.div 
          className="relative z-10 max-w-4xl px-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">{t('contact.title')}</h1>
          <p className="text-xl md:text-2xl text-[#FFD700] drop-shadow-md">{t('contact.subtitle')}</p>
        </motion.div>
      </motion.section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-[#8B0000] mb-8">{t('contact.getInTouch')}</h2>
              
              {[
                { icon: <FaMapMarkerAlt />, title: t('contact.address'), content: t('contact.addressText') },
                { icon: <FaPhone />, title: t('contact.phone'), content: '+91-XXXXXXXXXX\n+91-YYYYYYYYYY' },
                { icon: <FaEnvelope />, title: t('contact.email'), content: 'info@bhuvaneshwari-temple.org\ncontact@bhuvaneshwari-temple.org' },
                { icon: <FaClock />, title: t('darshan.timings'), content: `${t('darshan.morning')}: ${t('darshan.morningTime')}\n${t('darshan.evening')}: ${t('darshan.eveningTime')}` }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 bg-white p-6 rounded-2xl mb-6 shadow-lg">
                  <div className="text-3xl text-[#8B0000] flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#8B0000] mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{item.content}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div 
              className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">{t('puja.name')} *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-red-800" />
                </div>

                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">{t('puja.email')} *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-red-800" />
                </div>

                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">{t('puja.phone')}</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-red-800" />
                </div>

                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">{t('contact.message')} *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-red-800"></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-5 bg-red-800 text-white rounded-full text-xl font-semibold uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('contact.send')}
                </motion.button>
              </form>
            </motion.div>
          </div>

          <motion.div 
            className="bg-white rounded-3xl p-8 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[#8B0000] text-center mb-6">Find Us Here</h2>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1331.881524551561!2d78.34036502857279!3d30.071942959013295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909144b72d8dad5%3A0x4662576fdcf075d7!2sBhuwneshwari%20Devi%20Temple(Parwati%20Devi%20Temple)!5e1!3m2!1sen!2sin!4v1759566952847!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Bhuwneshwari Devi Temple Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
