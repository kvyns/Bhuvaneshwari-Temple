import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  // Dynamically load all images from /images folder
  useEffect(() => {
    const loadImages = () => {
      // Get all image files using import.meta.glob
      const imageModules = import.meta.glob('//images/*.(jpg|jpeg|png|gif|jpg|JPEG|PNG|GIF)', { eager: true, as: 'url' });
      
      const images = Object.keys(imageModules).map((path, index) => {
        const fileName = path.split('/').pop();
        const imagePath = `/images/${fileName}`;
        const title = fileName.replace(//.(jpg|jpeg|png|gif|jpg|JPEG|PNG|GIF)$/, '').replace(/_/g, ' ');
        
        return {
          id: index + 1,
          category: 'temple',
          url: imagePath,
          title: title.charAt(0).toUpperCase() + title.slice(1)
        };
      });
      
      // Randomize the image sequence
      const shuffledImages = images.sort(() => Math.random() - 0.5);
      
      setGalleryImages(shuffledImages);
    };

    loadImages();
  }, []);

  return (
    <div className="min-h-screen">
      <motion.section 
        className="relative h-[50vh] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(/images/DSC08164.jpg )'
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">{t('gallery.title')}</h1>
          <p className="text-xl md:text-2xl text-[#FFD700] drop-shadow-md">{t('gallery.subtitle')}</p>
        </motion.div>
      </motion.section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          {galleryImages.length === 0 ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-temple-maroon mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading images...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-gray-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                    style={{ imageRendering: 'auto' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-full transition-transform duration-300 hover:translate-y-0">
                    <p className="text-white font-semibold text-lg">{image.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <motion.div 
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[1000] p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div 
            className="relative max-w-[90%] max-h-[90%] bg-white rounded-2xl p-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute -top-4 -right-4 w-12 h-12 bg-[#8B0000] text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:bg-[#DC143C] transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img src={selectedImage.url} alt={selectedImage.title} className="max-w-full max-h-[80vh] rounded-xl" />
            <p className="text-center mt-4 text-xl font-semibold text-gray-800">{selectedImage.title}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
