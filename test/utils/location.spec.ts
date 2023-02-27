import { calculateDistance, getLocation } from "../../src/utils/location";

describe("getLocation", () => {
  it("should get error message if navigator.geolocation is not available", async () => {
    (global.navigator as Writeable<typeof global.navigator | null>) = null;
    let errorMessage = "";
    try {
      await getLocation();
    } catch (e) {
      errorMessage = e as string;
    }

    expect(errorMessage).toBe("Geolocation is not supported by this browser");
  });

  it("should get location data if navigator.geolocation is available", async () => {
    const mockGeolocation = {
      clearWatch: jest.fn(),
      getCurrentPosition: jest.fn().mockImplementationOnce(success =>
        Promise.resolve(
          success({
            coords: {
              latitude: 51.1,
              longitude: 45.3,
            },
          }),
        ),
      ),
      watchPosition: jest.fn(),
    };
    (global.navigator as Writeable<typeof global.navigator>).geolocation =
      mockGeolocation;
    const result = await getLocation();
    expect(result).toEqual({
      coords: {
        latitude: 51.1,
        longitude: 45.3,
      },
    });
  });

  describe("location fetch failed", () => {
    it("should show error message when user denied the request for Geolocation", async () => {
      const mockGeolocation = {
        clearWatch: jest.fn(),
        getCurrentPosition: jest.fn().mockImplementationOnce((_, failed) =>
          Promise.resolve(
            failed({
              PERMISSION_DENIED: 1,
              code: 1,
            }),
          ),
        ),
        watchPosition: jest.fn(),
      };

      (global.navigator as Writeable<typeof global.navigator>).geolocation =
        mockGeolocation;
      let errorMessage = "";
      try {
        await getLocation();
      } catch (e) {
        errorMessage = e as string;
      }
      expect(errorMessage).toBe("User denied the request for Geolocation.");
    });

    it("should show error message when location information is unavailable", async () => {
      const mockGeolocation = {
        clearWatch: jest.fn(),
        getCurrentPosition: jest.fn().mockImplementationOnce((_, failed) =>
          Promise.resolve(
            failed({
              POSITION_UNAVAILABLE: 1,
              code: 1,
            }),
          ),
        ),
        watchPosition: jest.fn(),
      };

      (global.navigator as Writeable<typeof global.navigator>).geolocation =
        mockGeolocation;
      let errorMessage = "";
      try {
        await getLocation();
      } catch (e) {
        errorMessage = e as string;
      }
      expect(errorMessage).toBe("Location information is unavailable.");
    });

    it("should show error message when request timed out", async () => {
      const mockGeolocation = {
        clearWatch: jest.fn(),
        getCurrentPosition: jest.fn().mockImplementationOnce((_, failed) =>
          Promise.resolve(
            failed({
              TIMEOUT: 1,
              code: 1,
            }),
          ),
        ),
        watchPosition: jest.fn(),
      };

      (global.navigator as Writeable<typeof global.navigator>).geolocation =
        mockGeolocation;
      let errorMessage = "";
      try {
        await getLocation();
      } catch (e) {
        errorMessage = e as string;
      }
      expect(errorMessage).toBe("The request to get user location timed out.");
    });

    it("should show error message in other cases", async () => {
      const mockGeolocation = {
        clearWatch: jest.fn(),
        getCurrentPosition: jest.fn().mockImplementationOnce((_, failed) =>
          Promise.resolve(
            failed({
              code: 1,
            }),
          ),
        ),
        watchPosition: jest.fn(),
      };

      (global.navigator as Writeable<typeof global.navigator>).geolocation =
        mockGeolocation;
      let errorMessage = "";
      try {
        await getLocation();
      } catch (e) {
        errorMessage = e as string;
      }
      expect(errorMessage).toBe("An unknown error occurred.");
    });
  });
});

describe("calculateDistance", () => {
  it("should calculation distance between 2 coordinate", () => {
    const point1 = {
      latitude: 25.0903289,
      longitude: 121.5210998,
    };

    const point2 = {
      latitude: 25.0520999,
      longitude: 121.5258373,
    };

    const distance = calculateDistance(point1, point2);
    expect(distance).toBe(4.2775668429469755);
  });
});
