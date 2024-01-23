export const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              resolve(currentLocation);
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          reject(new Error('Geolocation is not supported by this browser.'));
        }
      });
}