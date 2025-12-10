const API_BASE_URL = 'https://982clqs13g.execute-api.ap-south-1.amazonaws.com/prod/v1';

// Temple configuration
const TEMPLE_CONFIG = {
  templeID: 'bhuvaneshwari-devi',
  templeName: 'Bhuvaneshwari Devi Temple',
};

// API endpoints
const API_ENDPOINTS = {
  GET_PUJA: `${API_BASE_URL}/puja`,
  GET_PUJAS: `${API_BASE_URL}/pujas`,
  ADD_BOOKING: `${API_BASE_URL}/booking/add`,
};

// Generic API call function
const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('API call error:', error);
    return { success: false, error: error.message };
  }
};

// API functions
export const api = {
  // Get single puja details
  getPuja: async (pujaID) => {
    const url = `${API_ENDPOINTS.GET_PUJA}?templeID=${TEMPLE_CONFIG.templeID}&pujaID=${pujaID}`;
    const result = await apiCall(url, { method: 'GET' });
    if (result.success && result.data.puja) {
      return { success: true, data: result.data.puja };
    }
    return result;
  },

  // Get all pujas for the temple
  getPujas: async () => {
    const url = `${API_ENDPOINTS.GET_PUJAS}?templeID=${TEMPLE_CONFIG.templeID}`;
    const result = await apiCall(url, { method: 'GET' });
    if (result.success && result.data.allPuja) {
      return { success: true, data: result.data.allPuja };
    }
    return result;
  },

  // Add booking
  addBooking: async (bookingData) => {
    const payload = {
      ...bookingData,
      templeID: TEMPLE_CONFIG.templeID,
      templeName: TEMPLE_CONFIG.templeName,
    };
    return await apiCall(API_ENDPOINTS.ADD_BOOKING, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Get booking status by ID
  getBookingStatus: async (bookingId) => {
    const url = `${API_BASE_URL}/booking?bookingID=${bookingId}&templeID=${TEMPLE_CONFIG.templeID}`;
    const result = await apiCall(url, { method: 'GET' });
    if (result.success && result.data.booking) {
      return { success: true, data: result.data.booking };
    }
    return result;
  },
};

export default api;
