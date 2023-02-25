import type { UserLocation } from "../store/location/types";

export function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by this browser");
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        let errorMessage = "";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;

          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;

          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;

          default:
            errorMessage = "An unknown error occurred.";
            break;
        }

        reject(errorMessage);
      },
    );
  });
}

// Haversine Distance Formula
export function calculateDistance(
  location1: UserLocation,
  location2: UserLocation,
): number {
  const { latitude: lat1, longitude: lon1 } = location1;
  const { latitude: lat2, longitude: lon2 } = location2;

  const RADIUS_OF_EARTH_IN_KM = 6371;

  const dLat = distance(lat2, lat1);
  const dLon = distance(lon2, lon1);

  // Haversine Formula
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2));
  const c = 2 * Math.asin(Math.sqrt(a));

  const finalDistance = RADIUS_OF_EARTH_IN_KM * c;
  return finalDistance;
}

function toRadian(angle: number) {
  return (Math.PI / 180) * angle;
}

function distance(a: number, b: number) {
  return (Math.PI / 180) * (a - b);
}
