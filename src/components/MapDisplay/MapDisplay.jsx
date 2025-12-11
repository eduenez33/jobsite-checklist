import { useState, useRef, useEffect } from "react";
import {
  loadGoogleMapsScript,
  createMap,
  createMarker,
} from "../../utils/googleMapsService";

import "./MapDisplay.css";

function MapDisplay({ address, coordinates, height = "400px" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const infoWindowRef = useRef(null);

  useEffect(() => {
    if (!coordinates?.lng || !coordinates?.lat) {
      setError("Coordinates are not available");
      setIsLoading(false);
      return;
    }

    if (
      typeof coordinates.lat !== "number" ||
      typeof coordinates.lng !== "number"
    ) {
      setError("Invalid coordinates format");
      setIsLoading(false);
      return;
    }

    const initializeMap = async () => {
      try {
        await loadGoogleMapsScript();

        const mapInstance = createMap(mapContainerRef.current, {
          center: { lat: coordinates.lat, lng: coordinates.lng },
          zoom: 15,
        });
        mapInstanceRef.current = mapInstance;

        const marker = createMarker(
          mapInstance,
          {
            lat: coordinates.lat,
            lng: coordinates.lng,
          },
          address
        );
        markerRef.current = marker;

        const infoWindow = new window.google.maps.InfoWindow({
          content: address,
        });
        infoWindowRef.current = infoWindow;

        marker.addListener("click", () => {
          infoWindow.open(mapInstance, marker);
        });

        setIsLoading(false);
        setError(null);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    initializeMap();

    return () => {
      if (markerRef.current) {
        google.maps.event.clearInstanceListeners(markerRef.current);
      }
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates, address]);

  return (
    <div style={{ position: "relative", width: "100%", height }}>
      <div
        ref={mapContainerRef}
        id="map"
        style={{ width: "100%", height }}
      ></div>

      {error && (
        <div className="map-display__error" style={{ width: "100%", height }}>
          {error}
        </div>
      )}

      {isLoading && (
        <div className="map-display__loading" style={{ width: "100%", height }}>
          Loading map...
        </div>
      )}
    </div>
  );
}

export default MapDisplay;
