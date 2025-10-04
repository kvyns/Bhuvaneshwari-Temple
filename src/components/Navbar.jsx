import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const toggleMenu = () => setIsOpen(!isOpen);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
  };

  const menuVariants = {
    closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

return (
    <motion.nav 
        className="bg-gradient-to-r from-temple-maroon to-temple-crimson h-20 flex justify-center items-center text-base sticky top-0 z-[999] shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: 'rgba(139, 0, 0, 0.95)' }}
    >
        <div className="flex justify-between items-center w-full max-w-7xl px-8 mx-auto">
            <Link to="/" className="text-white no-underline cursor-pointer">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <h2 className="m-0 text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>{t('home.title')}</h2>
                </motion.div>
            </Link>

            <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                    <FaGlobe className="text-white text-xl" />
                    <select 
                        value={currentLang} 
                        onChange={(e) => changeLanguage(e.target.value)}
                        className="bg-transparent text-white border-none outline-none cursor-pointer text-sm font-medium"
                    >
                        <option value="en" className="bg-temple-maroon">English</option>
                        <option value="hi" className="bg-temple-maroon">हिंदी</option>
                    </select>
                </div>

                <div className="md:hidden text-white text-3xl cursor-pointer" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>

                <ul className="hidden md:flex items-center justify-center list-none gap-8 m-0 p-0">
                    {['home', 'about', 'darshan', 'puja', 'donation', 'aarti', 'gallery', 'contact'].map((item) => (
                        <motion.li key={item} whileHover={{ scale: 1.05 }}>
                            <Link 
                                to={item === 'home' ? '/' : `/${item}`} 
                                className="text-white no-underline px-4 py-2 rounded transition-all duration-300 font-semibold hover:bg-white/20"
                                style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
                            >
                                {t(`nav.${item}`)}
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>

        <motion.div 
            className="md:hidden fixed top-20 right-0 w-[300px] h-[calc(100vh-5rem)] bg-gradient-to-b from-temple-maroon to-temple-crimson shadow-xl z-[998]"
            variants={menuVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
        >
            <div className="flex items-center justify-center gap-2 bg-white/10 px-4 py-3 mx-4 mt-4 rounded-full backdrop-blur-md">
                <FaGlobe className="text-white text-xl" />
                <select 
                    value={currentLang} 
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="bg-transparent text-white border-none outline-none cursor-pointer text-sm font-medium w-full"
                >
                    <option value="en" className="bg-temple-maroon">English</option>
                    <option value="hi" className="bg-temple-maroon">हिंदी</option>
                </select>
            </div>
            
            <ul className="list-none p-8 m-0 flex flex-col items-center">
                {['home', 'about', 'darshan', 'puja', 'donation', 'aarti', 'gallery', 'contact'].map((item) => (
                    <li key={item} className="mb-4 w-full">
                        <Link 
                            to={item === 'home' ? '/' : `/${item}`} 
                            className="text-white no-underline text-lg font-semibold block p-4 rounded-lg transition-all duration-300 hover:bg-white/20 hover:translate-x-2 text-center" 
                            onClick={toggleMenu}
                            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
                        >
                            {t(`nav.${item}`)}
                        </Link>
                    </li>
                ))}
            </ul>
        </motion.div>
    </motion.nav>
);
};

export default Navbar;
