import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Donation = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    fatherName: '',
    mobile: '',
    email: '',
    // Address Details
    address: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    // Other Details
    donationPurpose: '',
    donationAmount: '',
    idProofType: '',
    idProofNumber: '',
    panCardNumber: '',
    paymentGateway: ''
  });

  const predefinedAmounts = [500, 1000, 2100, 5000, 11000, 21000];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.donationAmount) {
      alert('Donation Amount is required!');
      return;
    }
    console.log('Donation:', formData);
    alert(t('donation.thankyou'));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAmountClick = (amount) => {
    setFormData({ ...formData, donationAmount: amount.toString() });
  };

  return (
    <div className="min-h-screen">
      <motion.section 
        className="relative h-[50vh] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('/images/DSC08168.JPG' )"
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">{t('donation.title')}</h1>
          <p className="text-xl md:text-2xl text-[#FFD700] drop-shadow-md">{t('donation.subtitle')}</p>
        </motion.div>
      </motion.section>

      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <motion.div 
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit}>
              
              {/* ========== PERSONAL DETAILS SECTION ========== */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-temple-maroon mb-8 pb-3 border-b-2 border-temple-gold">Personal Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2">First Name *</label>
                    <input 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleChange} 
                      placeholder="Enter Your First Name *"
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" 
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2">Last Name *</label>
                    <input 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleChange} 
                      placeholder="Enter Your Last Name *"
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" 
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2">Father Name *</label>
                    <input 
                      type="text" 
                      name="fatherName" 
                      value={formData.fatherName} 
                      onChange={handleChange} 
                      placeholder="Enter Your Father Name *"
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" 
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2">Mobile Number *</label>
                    <input 
                      type="tel" 
                      name="mobile" 
                      value={formData.mobile} 
                      onChange={handleChange} 
                      placeholder="Enter Your Mobile Number *"
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" 
                    />
                  </div>

                  <div className="flex flex-col md:col-span-2">
                    <label className="font-semibold text-gray-700 mb-2">Email *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="Enter Your Email *"
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" 
                    />
                  </div>
                </div>
              </div>

              {/* ========== ADDRESS DETAILS SECTION ========== */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-temple-maroon mb-8 pb-3 border-b-2 border-temple-gold">Address Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col md:col-span-2">
                    <label className="font-semibold text-gray-700 mb-2">Address *</label>
                    <textarea 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      placeholder="Enter Your Address *"
                      rows="3"
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10"
                    ></textarea>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2">Country *</label>
                    <select 
                      name="country" 
                      value={formData.country} 
                      onChange={handleChange} 
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10"
                    >
                      <option value="">Select Country *</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2">State *</label>
                    <select 
                      name="state" 
                      value={formData.state} 
                      onChange={handleChange} 
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10"
                    >
                      <option value="">Select State *</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2">City *</label>
                    <input 
                      type="text" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleChange} 
                      placeholder="Enter Your City *"
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" 
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2">Zip/Pin Code *</label>
                    <input 
                      type="text" 
                      name="zipCode" 
                      value={formData.zipCode} 
                      onChange={handleChange} 
                      placeholder="Enter Your ZipCode *"
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" 
                    />
                  </div>
                </div>
              </div>

              {/* ========== OTHER DETAILS SECTION ========== */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-temple-maroon mb-8 pb-3 border-b-2 border-temple-gold">Other Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2">Donation Purpose *</label>
                    <select 
                      name="donationPurpose" 
                      value={formData.donationPurpose} 
                      onChange={handleChange} 
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10"
                    >
                      <option value="">Select Donation Purpose *</option>
                      <option value="general">General Fund</option>
                      <option value="annadanam">Annadanam</option>
                      <option value="construction">Temple Construction</option>
                      <option value="education">Education</option>
                      <option value="medical">Medical Aid</option>
                      <option value="special_puja">Special Puja</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2">Donation Amount * ₹</label>
                    <input 
                      type="number" 
                      name="donationAmount" 
                      value={formData.donationAmount} 
                      onChange={handleChange} 
                      placeholder="Enter Your Donation Amount *"
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" 
                    />
                  </div>

                  {/* Quick Amount Selection */}
                  <div className="md:col-span-2">
                    <p className="font-semibold text-gray-700 mb-3">Quick Select Amount:</p>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {predefinedAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          className={`p-3 border-2 rounded-xl text-base font-semibold transition-all ${
                            formData.donationAmount === amount.toString()
                              ? 'bg-red-800 text-white border-temple-maroon'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-temple-maroon hover:bg-red-50'
                          }`}
                          onClick={() => handleAmountClick(amount)}
                        >
                          ₹{amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2">ID Proof Type *</label>
                    <select 
                      name="idProofType" 
                      value={formData.idProofType} 
                      onChange={handleChange} 
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10"
                    >
                      <option value="">Select ID Proof Type *</option>
                      <option value="aadhaar">Aadhaar Card</option>
                      <option value="pan">PAN Card</option>
                      <option value="passport">Passport</option>
                      <option value="voter">Voter ID</option>
                      <option value="driving">Driving License</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2">ID Proof Number *</label>
                    <input 
                      type="text" 
                      name="idProofNumber" 
                      value={formData.idProofNumber} 
                      onChange={handleChange} 
                      placeholder="Enter Your ID Proof Number *"
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" 
                    />
                  </div>

                  <div className="flex flex-col md:col-span-2">
                    <label className="font-semibold text-gray-700 mb-2">Pan Card Number</label>
                    <input 
                      type="text" 
                      name="panCardNumber" 
                      value={formData.panCardNumber} 
                      onChange={handleChange} 
                      placeholder="Enter Your Pan Card Number"
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10" 
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Note:</strong> Enter Pan Card Number If You Need Income Tax Receipt
                    </p>
                  </div>

                  <div className="flex flex-col md:col-span-2">
                    <label className="font-semibold text-gray-700 mb-2">Payment Gateway *</label>
                    <select 
                      name="paymentGateway" 
                      value={formData.paymentGateway} 
                      onChange={handleChange} 
                      required 
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base text-gray-900 transition-all duration-300 focus:outline-none focus:border-temple-maroon focus:ring-4 focus:ring-temple-maroon/10"
                    >
                      <option value="">Select Payment Gateway *</option>
                      <option value="razorpay">Razorpay</option>
                      <option value="paytm">Paytm</option>
                      <option value="phonepe">PhonePe</option>
                      <option value="googlepay">Google Pay</option>
                      <option value="upi">UPI</option>
                      <option value="netbanking">Net Banking</option>
                      <option value="card">Credit/Debit Card</option>
                    </select>
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full py-5 bg-yellow-500 text-temple-maroon rounded-full text-xl font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Payment
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Donation;
