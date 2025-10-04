import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaClock, FaMusic } from 'react-icons/fa';

const Aarti = () => {
  const { t } = useTranslation();

  const aartiSchedule = [
    { time: '5:00 AM', name: t('aarti.morning'), description: 'Mangla Aarti' },
    { time: '7:00 PM', name: t('aarti.evening'), description: 'Sandhya Aarti' }
  ];

  return (
    <div className="min-h-screen">
      <motion.section 
        className="relative h-[50vh] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('/images/aarti.JPG')"
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">{t('aarti.title')}</h1>
          <p className="text-xl md:text-2xl text-[#FFD700] drop-shadow-md">{t('aarti.subtitle')}</p>
        </motion.div>
      </motion.section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.h2
            className="text-4xl font-bold text-[#8B0000] text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('darshan.schedule')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {aartiSchedule.map((aarti, index) => (
              <motion.div
                key={index}
                className="rounded-3xl p-10 text-center text-white shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)' }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <FaClock className="text-5xl text-[#FFD700] mx-auto mb-4" />
                <h3 className="text-4xl font-bold mb-2 text-[#FFD700]">{aarti.time}</h3>
                <h4 className="text-2xl font-semibold mb-3">{aarti.name}</h4>
                <p className="text-lg opacity-90">{aarti.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#8B0000] text-center mb-8 flex items-center justify-center gap-4">
              <FaMusic /> {t('aarti.watch')}
            </h2>
            <div className="aspect-video bg-gradient-to-br from-[#1a0000] to-[#4a0000] rounded-2xl flex items-center justify-center text-white text-center p-8">
              <div>
                <p className="text-xl mb-2">🔴 Aarti video will be displayed here</p>
                <p className="opacity-75">Connect your live stream source to enable this feature</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Aarti;
