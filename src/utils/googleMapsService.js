const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const geocodeAddress = async (address) => {
  if (!address || typeof address !== "string" || address.trim() === "") {
    throw new Error("Address is required");
  }

  const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";
  const params = new URLSearchParams({
    address: address.trim(),
    key: API_KEY,
  });
  const url = `${baseUrl}?${params}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    switch (data.status) {
      case "OK":
        break;

      case "ZERO_RESULTS":
        throw new Error("Address not found");

      case "OVER_QUERY_LIMIT":
        throw new Error("API quota exceeded. Please try again later.");

      case "REQUEST_DENIED":
        throw new Error("API request denied. Check API key configuration.");

      case "INVALID_REQUEST":
        throw new Error("Invalid geocoding request");

      default:
        throw new Error(`Geocoding failed: ${data.status}`);
    }

    const result = data.results[0];

    return {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      formattedAddress: result.formatted_address,
    };
  } catch (error) {
    if (
      error.name === "TypeError" ||
      error.message.includes("Failed to fetch")
    ) {
      throw new Error("Network error. Please check your internet connection.");
    }
    throw error;
  }
};

// 2. Maps Script Loader:
let isScriptLoaded = false;
let isScriptLoading = false;
let scriptLoadPromise = null;

export const loadGoogleMapsScript = () => {
  // Check if already loaded: if (window.google?.maps) return Promise.resolve();
  // Check if loading: if (isScriptLoading) return scriptLoadPromise;
  // Create script tag: document.createElement('script')
  // src: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
  // Return Promise that resolves on script.onload
  // Store promise in scriptLoadPromise to prevent duplicates
};

// 3. Optional helper:
export const createMap = (element, options) => {
  // new google.maps.Map(element, options)
  // Returns map instance
};

export const createMarker = (map, position, title) => {
  // new google.maps.Marker({ map, position, title })
};
