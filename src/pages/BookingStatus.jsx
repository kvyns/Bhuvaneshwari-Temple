import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import api from '../utils/api';

const BookingStatus = () => {
  const { t } = useTranslation();
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bookingId.trim()) {
      setError('Please enter a booking ID');
      return;
    }

    setLoading(true);
    setError('');
    setBookingData(null);

    const result = await api.getBookingStatus(bookingId.trim());
    
    if (result.success && result.data) {
      setBookingData(result.data);
    } else {
      setError('Booking not found. Please check your booking ID and try again.');
    }
    
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'CONFIRMED':
        return 'text-green-600 bg-green-50 border-green-300';
      case 'NEW':
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-50 border-yellow-300';
      case 'COMPLETED':
        return 'text-blue-600 bg-blue-50 border-blue-300';
      case 'CANCELLED':
        return 'text-red-600 bg-red-50 border-red-300';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen">
      <motion.section 
        className="relative h-[50vh] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('/images/home_4.JPG')"}}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0" style={{background: 'radial-gradient(circle at center, transparent 0%, rgba(139, 0, 0, 0.3) 100%)'}}></div>
        <motion.div 
          className="relative z-10 max-w-4xl px-8" 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">Booking Status</h1>
          <p className="text-xl md:text-2xl text-[#FFD700] drop-shadow-lg">Check Your Puja Booking Status</p>
        </motion.div>
      </motion.section>

      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div 
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl text-[#8B0000] mb-8 text-center font-bold">
              Enter Booking ID
            </h2>
            
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={bookingId}
                  onChange={(e) => {
                    setBookingId(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your booking ID"
                  className={`flex-1 px-6 py-4 border-2 rounded-xl text-lg text-gray-900 transition-all duration-300 focus:outline-none focus:ring-4 ${
                    error 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                      : 'border-gray-300 focus:border-temple-maroon focus:ring-temple-maroon/10'
                  }`}
                />
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-[#8B0000] text-white rounded-xl text-lg font-semibold hover:bg-[#6B0000] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? 'Checking...' : 'Check Status'}
                </motion.button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>

            {bookingData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 md:p-8 border-2 border-gray-200"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
                  <h3 className="text-2xl font-bold text-[#8B0000]">Booking Details</h3>
                  <span className={`px-4 py-2 rounded-full font-semibold text-sm border-2 ${getStatusColor(bookingData.bookingStatus)}`}>
                    {bookingData.bookingStatus || 'Unknown'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Booking ID</p>
                      <p className="text-lg font-semibold text-gray-800">{bookingData.bookingID || bookingId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Booking Number</p>
                      <p className="text-lg font-semibold text-gray-800">{bookingData.bookingNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Name</p>
                      <p className="text-lg font-semibold text-gray-800">{bookingData.fullName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="text-lg font-semibold text-gray-800">{bookingData.email || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone</p>
                      <p className="text-lg font-semibold text-gray-800">{bookingData.mobileNumber || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Puja ID</p>
                      <p className="text-lg font-semibold text-gray-800">{bookingData.pujaID || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Puja Date</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {bookingData.pujaDate ? new Date(bookingData.pujaDate).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Puja Time</p>
                      <p className="text-lg font-semibold text-gray-800">{bookingData.pujaTime || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Devotees</p>
                      <p className="text-lg font-semibold text-gray-800">{bookingData.devotees || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Requested On</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {bookingData.requestedOn ? new Date(bookingData.requestedOn).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {bookingData.specialRequest && (
                  <div className="mt-6 pt-6 border-t-2 border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">Special Request</p>
                    <p className="text-base text-gray-800">{bookingData.specialRequest}</p>
                  </div>
                )}

                {bookingData.amount && (
                  <div className="mt-6 pt-6 border-t-2 border-gray-200">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold text-gray-700">Total Amount</p>
                      <p className="text-2xl font-bold text-[#8B0000]">₹{bookingData.amount}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BookingStatus;
