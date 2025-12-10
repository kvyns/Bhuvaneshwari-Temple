import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const countryCodes = [
    { code: '+91', country: 'India', length: 10 },
    { code: '+1', country: 'USA/Canada', length: 10 },
    { code: '+44', country: 'UK', length: 10 },
    { code: '+971', country: 'UAE', length: 9 },
    { code: '+61', country: 'Australia', length: 9 },
    { code: '+65', country: 'Singapore', length: 8 },
    { code: '+60', country: 'Malaysia', length: 9 },
    { code: '+977', country: 'Nepal', length: 10 },
    { code: '+880', country: 'Bangladesh', length: 10 },
    { code: '+94', country: 'Sri Lanka', length: 9 },
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone, countryCode) => {
    const country = countryCodes.find(c => c.code === countryCode);
    if (!country) return false;
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phone) && phone.length === country.length;
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    alert('Thank you for contacting us!');
    setFormData({ name: '', email: '', countryCode: '+91', phone: '', message: '' });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    
    // Validate all fields simultaneously
    const newErrors = {};

    if (updatedFormData.name && !validateName(updatedFormData.name)) {
      newErrors.name = 'Please enter a valid name (2-50 characters, letters only)';
    }

    if (updatedFormData.email && !validateEmail(updatedFormData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (updatedFormData.phone && !validatePhone(updatedFormData.phone, updatedFormData.countryCode)) {
      const country = countryCodes.find(c => c.code === updatedFormData.countryCode);
      newErrors.phone = `Please enter a valid ${country?.length}-digit phone number`;
    }

    setErrors(newErrors);
  };

  return (
    <div className="min-h-screen">
      <motion.section 
        className="relative h-[50vh] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('/images/DSC08130.JPG ')"
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
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className={`px-4 py-3 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-4 ${
                      errors.name 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                        : 'border-gray-300 focus:border-temple-maroon focus:ring-temple-maroon/10'
                    }`}
                  />
                  {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
                </div>

                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">{t('puja.email')} *</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className={`px-4 py-3 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-4 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                        : 'border-gray-300 focus:border-temple-maroon focus:ring-temple-maroon/10'
                    }`}
                  />
                  {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
                </div>

                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">{t('puja.phone')}</label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className={`px-3 py-3 border-2 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:ring-4 ${
                        errors.phone 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                          : 'border-gray-300 focus:border-temple-maroon focus:ring-temple-maroon/10'
                      }`}
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code} ({country.country})
                        </option>
                      ))}
                    </select>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      placeholder={`${countryCodes.find(c => c.code === formData.countryCode)?.length} digits`}
                      className={`flex-1 px-4 py-3 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-4 ${
                        errors.phone 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                          : 'border-gray-300 focus:border-temple-maroon focus:ring-temple-maroon/10'
                      }`}
                    />
                  </div>
                  {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
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
