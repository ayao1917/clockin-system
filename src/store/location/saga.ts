import { call, put, takeLatest } from "redux-saga/effects";

import {
  locationGetAction,
} from "./actions";
import {
  locationGetError,
  locationGetPending,
  locationGetSuccess,
  locationInfoGetSuccess,
} from "./slice";
import { invokeAPI } from "../sagas";
import { getLocation } from "../../utils/location";

import type { AxiosResponse } from "axios";
import type { UserLocation } from "./types";

function* executeGeocodingGet(location: UserLocation) {
  const { latitude, longitude } = location;
  const accessToken = "pk.eyJ1IjoiaWFtYXBhcms4OSIsImEiOiJjanlpZmF5c3AwOXJzM2NxaDQzNWhiaDRmIn0.C-e2EpmyDtsqPbu9FjJz5Q";
  try {
    const response: AxiosResponse<{ features: { place_name: string }[] }> = yield call(invokeAPI, {
      method: "GET",
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`,
    });

    if (response.data?.features.length > 0) {
      return response.data?.features[0].place_name;
    }

    return null;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

function* executeLocationGet() {
  try {
    yield put(locationGetPending());
    const location: GeolocationPosition = yield call(getLocation);
    const { latitude, longitude } = location.coords;
    const locationInfo: string | null = yield call(
      executeGeocodingGet,
      { latitude, longitude },
    );
    yield put(locationGetSuccess({ latitude, longitude }));
    yield put(locationInfoGetSuccess(locationInfo));
  } catch (error: any) {
    yield put(locationGetError(error));
  }
}

function* identitySaga() {
  yield takeLatest(locationGetAction, executeLocationGet);
}

export default identitySaga;
