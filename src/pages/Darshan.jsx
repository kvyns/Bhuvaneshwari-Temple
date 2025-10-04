import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaCircle } from 'react-icons/fa';

const Darshan = () => {
  const { t } = useTranslation();

  const schedule = [
    { time: '5:00 AM', event: t('aarti.morning') },
    { time: '12:00 PM', event: t('darshan.morning') },
    { time: '4:00 PM', event: t('darshan.evening') },
    { time: '7:00 PM', event: t('aarti.evening') }
  ];

  return (
    <div className="min-h-screen">
      <motion.section className="relative h-[50vh] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(/images/home_3.JPG )'}}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="absolute inset-0" style={{background: 'radial-gradient(circle at center, transparent 0%, rgba(139, 0, 0, 0.3) 100%)'}}></div>
        <motion.div className="relative z-10 max-w-4xl px-8" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">{t('darshan.title')}</h1>
          <p className="text-xl md:text-2xl text-[#FFD700] drop-shadow-lg">{t('darshan.subtitle')}</p>
        </motion.div>
      </motion.section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div className="bg-white rounded-3xl overflow-hidden shadow-2xl mb-16" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 flex items-center gap-3 font-semibold text-lg">
              <FaCircle className="animate-pulse" />
              {t('darshan.liveNow')}
            </div>
            
            <div className="aspect-video bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed?listType=user_uploads&list=manishjugran&autoplay=0" 
                title="Bhuwneshwari Temple Videos"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="bg-gray-50 px-8 py-4 text-center">
              <p className="text-gray-700 text-sm">
                📺 Watch temple videos and darshan recordings • <a href="https://www.youtube.com/@manishjugran" target="_blank" rel="noopener noreferrer" className="text-temple-maroon hover:underline font-semibold">Visit Channel →</a>
              </p>
            </div>
          </motion.div>

          <motion.div className="mb-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl text-[#8B0000] text-center mb-8 font-bold">{t('darshan.schedule')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {schedule.map((item, index) => (
                <motion.div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center border-l-4 border-[#8B0000]"
                  initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl font-bold text-[#8B0000] mb-2">{item.time}</div>
                  <div className="text-lg text-gray-600">{item.event}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl text-[#8B0000] text-center mb-8 font-bold">{t('darshan.timings')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div className="bg-gradient-to-br from-[#8B0000] to-[#DC143C] text-white rounded-2xl p-10 text-center shadow-2xl" whileHover={{ scale: 1.05 }}>
                <h3 className="text-3xl mb-4 text-[#FFD700] font-bold">{t('darshan.morning')}</h3>
                <p className="text-2xl font-medium">{t('darshan.morningTime')}</p>
              </motion.div>
              <motion.div className="bg-gradient-to-br from-[#8B0000] to-[#DC143C] text-white rounded-2xl p-10 text-center shadow-2xl" whileHover={{ scale: 1.05 }}>
                <h3 className="text-3xl mb-4 text-[#FFD700] font-bold">{t('darshan.evening')}</h3>
                <p className="text-2xl font-medium">{t('darshan.eveningTime')}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Darshan;
