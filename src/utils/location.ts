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
export function calculateDistance(location1: UserLocation, location2: UserLocation): number {
  const { latitude: lat1, longitude: lon1 } = location1;
  const { latitude: lat2, longitude: lon2 } = location2;

  const R = 6371; // km
  const x1 = lat2 - lat1;
  const dLat = toRad(x1);
  const x2 = lon2 - lon1;
  const dLon = toRad(x2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(value: number) {
  return (value * Math.PI) / 180;
}
