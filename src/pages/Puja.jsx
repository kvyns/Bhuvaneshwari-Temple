import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import api from '../utils/api';

const Puja = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ 
    pujaType: '', 
    name: '', 
    email: '', 
    countryCode: '+91',
    phone: '', 
    date: '',
    time: '',
    devotees: '1',
    gotra: '', 
    specialRequest: '' 
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(null);

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

  const [pujaTypes, setPujaTypes] = useState([
    { id: 'regular', name: t('puja.pujaTypes.regular'), price: '₹501' },
    { id: 'special', name: t('puja.pujaTypes.special'), price: '₹1100' },
    { id: 'abhishek', name: t('puja.pujaTypes.abhishek'), price: '₹2100' },
    { id: 'havan', name: t('puja.pujaTypes.havan'), price: '₹3100' },
    { id: 'satyanarayan', name: t('puja.pujaTypes.satyanarayan'), price: '₹2500' },
    { id: 'sunderkand', name: t('puja.pujaTypes.sunderkand'), price: '₹1500' }
  ]);

  // Fetch pujas from API on component mount
  useEffect(() => {
    const fetchPujas = async () => {
      setLoading(true);
      const result = await api.getPujas();
      if (result.success && result.data) {
        // Map API response to pujaTypes format
        if (Array.isArray(result.data)) {
          const mappedPujas = result.data
            .filter(puja => puja.active)
            .map(puja => ({
              id: puja.pujaID,
              name: puja.title,
              price: `₹${puja.price}`,
              description: puja.description || '',
              subtitle: puja.subTitle || '',
              image: puja.image || ''
            }));
          setPujaTypes(mappedPujas);
        }
        console.log('Pujas fetched:', result.data);
      } else {
        console.error('Failed to fetch pujas:', result.error);
      }
      setLoading(false);
    };
    
    fetchPujas();
  }, []);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.pujaType) {
      newErrors.pujaType = 'Please select a puja type';
    }

    if (!formData.name || !validateName(formData.name)) {
      newErrors.name = 'Please enter a valid name (2-50 characters, letters only)';
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone || !validatePhone(formData.phone, formData.countryCode)) {
      const country = countryCodes.find(c => c.code === formData.countryCode);
      newErrors.phone = `Please enter a valid ${country?.length}-digit phone number`;
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    // Prepare booking data according to API specification
    const bookingData = {
      pujaID: formData.pujaType,
      fullName: formData.name.trim(),
      email: formData.email.trim(),
      mobileNumber: `${formData.countryCode}${formData.phone}`,
      pujaDate: formData.date,
      pujaTime: formData.time || '10:00',
      devotees: parseInt(formData.devotees) || 1,
      specialRequest: formData.specialRequest.trim() || (formData.gotra ? `Gotra: ${formData.gotra.trim()}` : ''),
    };

    // Submit booking to API
    const result = await api.addBooking(bookingData);
    
    if (result.success) {
      const bookingID = result.data?.bookingID || '';
      const message = result.data?.responseMessage || t('donation.thankyou');
      
      // Show success modal
      setBookingSuccess({
        bookingID,
        message,
        pujaName: pujaTypes.find(p => p.id === formData.pujaType)?.name || 'Puja',
        date: formData.date,
        time: formData.time || '10:00',
        devotees: formData.devotees,
      });
      
      // Reset form
      setFormData({ 
        pujaType: '', 
        name: '', 
        email: '', 
        countryCode: '+91',
        phone: '', 
        date: '',
        time: '',
        devotees: '1',
        gotra: '', 
        specialRequest: '' 
      });
      setErrors({});
    } else {
      alert(`Booking Failed!\n\n${result.error || 'Please try again later.'}`);
    }
    
    setSubmitting(false);
  };

  const handleChange = (e) => { 
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    
    // Validate all fields simultaneously to show all errors
    const newErrors = {};

    if (!updatedFormData.pujaType) {
      newErrors.pujaType = 'Please select a puja type';
    }

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
      <motion.section className="relative h-[50vh] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('/images/home_4.JPG' )"}}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="absolute inset-0" style={{background: 'radial-gradient(circle at center, transparent 0%, rgba(139, 0, 0, 0.3) 100%)'}}></div>
        <motion.div className="relative z-10 max-w-4xl px-8" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">{t('puja.title')}</h1>
          <p className="text-xl md:text-2xl text-[#FFD700] drop-shadow-lg">{t('puja.subtitle')}</p>
        </motion.div>
      </motion.section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div className="mb-16" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl text-[#8B0000] text-center mb-8 font-bold">{t('puja.selectPuja')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pujaTypes.map((puja, index) => (
                <motion.div key={puja.id} className={`bg-white rounded-2xl p-8 text-center shadow-lg cursor-pointer border-4 transition-all duration-300 ${formData.pujaType === puja.id ? 'border-[#8B0000] bg-gradient-to-b from-red-50 to-white shadow-2xl' : 'border-transparent hover:border-[#8B0000]'}`}
                  onClick={() => setFormData({ ...formData, pujaType: puja.id })} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <h3 className="text-2xl text-[#8B0000] mb-4 font-bold">{puja.name}</h3>
                  <p className="text-3xl font-bold text-[#DC143C]">{puja.price}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl text-[#8B0000] mb-8 text-center font-bold">{t('puja.yourDetails')}</h2>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">{t('puja.name')} *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className={`px-4 py-3 border-2 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:ring-4 ${
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
                    className={`px-4 py-3 border-2 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:ring-4 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                        : 'border-gray-300 focus:border-temple-maroon focus:ring-temple-maroon/10'
                    }`}
                  />
                  {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
                </div>
                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">{t('puja.phone')} *</label>
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
                      className={`flex-1 px-4 py-3 border-2 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:ring-4 ${
                        errors.phone 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                          : 'border-gray-300 focus:border-temple-maroon focus:ring-temple-maroon/10'
                      }`}
                    />
                  </div>
                  {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
                </div>
                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">{t('puja.date')} *</label>
                  <input 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                    min={new Date().toISOString().split('T')[0]}
                    className={`px-4 py-3 border-2 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:ring-4 ${
                      errors.date 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                        : 'border-gray-300 focus:border-temple-maroon focus:ring-temple-maroon/10'
                    }`}
                  />
                  {errors.date && <span className="text-red-500 text-sm mt-1">{errors.date}</span>}
                </div>
                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">Puja Time</label>
                  <input 
                    type="time" 
                    name="time" 
                    value={formData.time} 
                    onChange={handleChange}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10"
                  />
                </div>
                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">Number of Devotees *</label>
                  <input 
                    type="number" 
                    name="devotees" 
                    value={formData.devotees} 
                    onChange={handleChange}
                    min="1"
                    max="50"
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10"
                  />
                </div>
                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">{t('puja.gotra')}</label>
                  <input type="text" name="gotra" value={formData.gotra} onChange={handleChange} className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" />
                </div>
              </div>
              {errors.pujaType && <div className="text-red-500 text-sm mb-4 text-center">{errors.pujaType}</div>}
              <div className="flex flex-col mb-6">
                <label className="font-semibold text-gray-700 mb-2">{t('puja.specialRequest')}</label>
                <textarea name="specialRequest" value={formData.specialRequest} onChange={handleChange} rows="4" className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10"></textarea>
              </div>
              <motion.button 
                type="submit" 
                disabled={submitting || !formData.pujaType}
                className="w-full py-5 bg-yellow-500 text-temple-maroon rounded-full text-xl font-semibold uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 mt-4 hover:from-yellow-500 hover:to-temple-gold disabled:opacity-50 disabled:cursor-not-allowed" 
                whileHover={{ scale: submitting ? 1 : 1.02 }} 
                whileTap={{ scale: submitting ? 1 : 0.98 }}
              >
                {submitting ? 'Submitting...' : t('puja.bookNow')}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Booking Success Modal */}
      {bookingSuccess && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setBookingSuccess(null)}
        >
          <motion.div
            className="bg-white rounded-3xl max-w-2xl w-full p-8 md:p-12 shadow-2xl"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4">
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#8B0000] mb-4">
              Booking Confirmed!
            </h2>
            <p className="text-center text-gray-600 mb-8 text-lg">
              {bookingSuccess.message}
            </p>

            {/* Booking Details */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 mb-6 border-2 border-[#8B0000]/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                  <p className="text-2xl font-bold text-[#8B0000] break-all">{bookingSuccess.bookingID}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Puja</p>
                  <p className="text-lg font-semibold text-gray-800">{bookingSuccess.pujaName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Date</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(bookingSuccess.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Time</p>
                  <p className="text-lg font-semibold text-gray-800">{bookingSuccess.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Devotees</p>
                  <p className="text-lg font-semibold text-gray-800">{bookingSuccess.devotees}</p>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 font-semibold">
                    Please save your Booking ID for future reference and verification.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => {
                  navigator.clipboard.writeText(bookingSuccess.bookingID);
                  alert('Booking ID copied to clipboard!');
                }}
                className="flex-1 py-3 px-6 bg-[#8B0000] text-white rounded-full font-semibold hover:bg-[#6B0000] transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Copy Booking ID
              </motion.button>
              <motion.button
                onClick={() => setBookingSuccess(null)}
                className="flex-1 py-3 px-6 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Puja;
