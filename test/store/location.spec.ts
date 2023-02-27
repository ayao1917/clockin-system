import { runSaga } from "redux-saga";

import { mockGeocodingResponse } from "../mockData/location";
import LocationReducers, * as LocationSlice from "../../src/store/location/slice";
import * as LocationSaga from "../../src/store/location/saga";
import * as SagaUtils from "../../src/store/sagas";
import * as LocationUtils from "../../src/utils/location";

const mockUserLocation = {
  latitude: 12,
  longitude: 88,
};

const mockLocationInfo = "mockLocationInfo";

describe("Reducers & Selectors: ", () => {
  const initialState = LocationSlice.initialState;

  const mockStoreState: any = {
    location: initialState,
  };

  it("should handle locationGetError", () => {
    mockStoreState.location = LocationReducers(
      initialState,
      LocationSlice.locationGetError("error"),
    );
    expect(
      LocationSlice.selectLocationGetPending(mockStoreState),
    ).toEqual(false);
    expect(
      LocationSlice.selectLocationGetError(mockStoreState),
    ).toEqual("error");
    expect(
      LocationSlice.selectLocation(mockStoreState),
    ).toEqual(null);
  });

  it("should handle locationGetPending", () => {
    mockStoreState.location = LocationReducers(
      initialState,
      LocationSlice.locationGetPending(),
    );
    expect(
      LocationSlice.selectLocationGetPending(mockStoreState),
    ).toEqual(true);
  });

  it("should handle locationGetSuccess", () => {
    mockStoreState.location = LocationReducers(
      initialState,
      LocationSlice.locationGetSuccess(mockUserLocation),
    );
    expect(
      LocationSlice.selectLocationGetPending(mockStoreState),
    ).toEqual(false);
    expect(
      LocationSlice.selectLocationGetError(mockStoreState),
    ).toEqual(null);
    expect(
      LocationSlice.selectLocation(mockStoreState),
    ).toEqual(mockUserLocation);
  });

  it("should handle locationInfoGetSuccess", () => {
    mockStoreState.location = LocationReducers(
      initialState,
      LocationSlice.locationInfoGetSuccess(mockLocationInfo),
    );
    expect(
      LocationSlice.selectLocationInfo(mockStoreState),
    ).toEqual(mockLocationInfo);
  });
});

describe("Sagas", () => {
  afterEach(() => {    
    jest.clearAllMocks();
  });

  describe("executeGeocodingGet", () => {
    it("should handle success", async () => {
      (SagaUtils as Writeable<typeof SagaUtils>).invokeAPI = jest.fn().mockResolvedValueOnce({ data: mockGeocodingResponse });
      const dispatched = [] as any;
      const response = await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        LocationSaga.executeGeocodingGet,
        mockUserLocation,
      ).toPromise();

      expect(response).toBe("LG Electronics Gangnam R&D Campus, 2621, Seoul, 06267, South Korea");
    });

    it("should handle failed", async () => {
      (SagaUtils as Writeable<typeof SagaUtils>).invokeAPI = jest.fn().mockRejectedValueOnce("error");
      const dispatched = [] as any;
      const response = await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        LocationSaga.executeGeocodingGet,
        mockUserLocation,
      ).toPromise();

      expect(response).toBe(null);
    });
  });

  describe("executeLocationGet", () => {
    it("should handle success", async () => {
      (LocationUtils as Writeable<typeof LocationUtils>).getLocation = jest.fn().mockResolvedValueOnce({ coords: mockUserLocation });
      (SagaUtils as Writeable<typeof SagaUtils>).invokeAPI = jest.fn().mockResolvedValueOnce({ data: mockGeocodingResponse });
      const dispatched = [] as any;
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        LocationSaga.executeLocationGet,
      ).toPromise();

      expect(dispatched.length).toBe(3);

      expect(dispatched[1].type).toEqual("location/locationGetSuccess");
      expect(dispatched[1].payload).toEqual(mockUserLocation);

      expect(dispatched[2].type).toEqual("location/locationInfoGetSuccess");
      expect(dispatched[2].payload).toEqual(mockGeocodingResponse.features[0].place_name);
    });
  });
});
