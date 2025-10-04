import { useTranslation } from 'react-i18next';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#1a0000] to-[#4a0000] text-white pt-16 pb-8 mt-20">
      <div className="container max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-12">
          {/* About Section */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-temple-gold">{t('home.title')}</h3>
            <p className="text-base leading-7 opacity-90 pr-4">{t('footer.tagline')}</p>
            <div className="flex gap-4 pt-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full text-white text-xl transition-all duration-300 hover:bg-temple-gold hover:text-temple-maroon hover:-translate-y-1 hover:shadow-lg"
                  aria-label={`Social media link ${idx + 1}`}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl md:text-2xl font-bold mb-6 text-temple-gold">{t('footer.quickLinks')}</h4>
            <ul className="list-none p-0 m-0 space-y-3">
              {[['/', 'home'], ['/about', 'about'], ['/darshan', 'darshan'], ['/gallery', 'gallery']].map(([path, key]) => (
                <li key={key}>
                  <Link 
                    to={path} 
                    className="text-white text-base no-underline opacity-90 transition-all duration-300 hover:text-temple-gold hover:pl-2 inline-block"
                  >
                    → {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl md:text-2xl font-bold mb-6 text-temple-gold">{t('footer.services')}</h4>
            <ul className="list-none p-0 m-0 space-y-3">
              {[['puja', 'puja'], ['donation', 'donation'], ['aarti', 'aarti'], ['contact', 'contact']].map(([path, key]) => (
                <li key={key}>
                  <Link 
                    to={`/${path}`} 
                    className="text-white text-base no-underline opacity-90 transition-all duration-300 hover:text-temple-gold hover:pl-2 inline-block"
                  >
                    → {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl md:text-2xl font-bold mb-6 text-temple-gold">{t('footer.connect')}</h4>
            <div className="space-y-5">
              <p className="flex items-start gap-4 text-base leading-7">
                <FaMapMarkerAlt className="text-temple-gold text-xl mt-1 flex-shrink-0" />
                <span className="opacity-90">{t('contact.addressText')}</span>
              </p>
              <p className="flex items-center gap-4 text-base">
                <FaPhone className="text-temple-gold text-lg flex-shrink-0" />
                <span className="opacity-90">+91-XXXXXXXXXX</span>
              </p>
              <p className="flex items-center gap-4 text-base">
                <FaEnvelope className="text-temple-gold text-lg flex-shrink-0" />
                <span className="opacity-90 break-all">info@bhuvaneshwari-temple.org</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-white/20 pt-8 mt-8">
          <p className="text-center m-0 opacity-80 text-base">
            © {currentYear} {t('home.title')}. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
