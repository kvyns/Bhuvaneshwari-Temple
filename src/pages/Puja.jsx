import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Puja = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ pujaType: '', name: '', email: '', phone: '', date: '', gotra: '', specialRequest: '' });

  const pujaTypes = [
    { id: 'regular', name: t('puja.pujaTypes.regular'), price: '₹501' },
    { id: 'special', name: t('puja.pujaTypes.special'), price: '₹1100' },
    { id: 'abhishek', name: t('puja.pujaTypes.abhishek'), price: '₹2100' },
    { id: 'havan', name: t('puja.pujaTypes.havan'), price: '₹3100' },
    { id: 'satyanarayan', name: t('puja.pujaTypes.satyanarayan'), price: '₹2500' },
    { id: 'sunderkand', name: t('puja.pujaTypes.sunderkand'), price: '₹1500' }
  ];

  const handleSubmit = (e) => { e.preventDefault(); alert(t('donation.thankyou')); };
  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  return (
    <div className="min-h-screen">
      <motion.section className="relative h-[50vh] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(/images/home_4.JPG )'}}
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
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" />
                </div>
                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">{t('puja.email')} *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" />
                </div>
                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">{t('puja.phone')} *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" />
                </div>
                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">{t('puja.date')} *</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" />
                </div>
                <div className="flex flex-col mb-6">
                  <label className="font-semibold text-gray-700 mb-2">{t('puja.gotra')}</label>
                  <input type="text" name="gotra" value={formData.gotra} onChange={handleChange} className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label className="font-semibold text-gray-700 mb-2">{t('puja.specialRequest')}</label>
                <textarea name="specialRequest" value={formData.specialRequest} onChange={handleChange} rows="4" className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10"></textarea>
              </div>
              <motion.button 
                type="submit" 
                className="w-full py-5 bg-yellow-500 text-temple-maroon rounded-full text-xl font-semibold uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 mt-4 hover:from-yellow-500 hover:to-temple-gold" 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                {t('puja.bookNow')}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Puja;
