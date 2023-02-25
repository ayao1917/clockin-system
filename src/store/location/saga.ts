import { call, put, takeEvery } from "redux-saga/effects";

import {
  locationGetAction,
} from "./actions";
import {
  locationGetError,
  locationGetPending,
  locationGetSuccess,
} from "./slice";
import { getLocation } from "../../utils/location";

function* executeLocationGet() {
  try {
    yield put(locationGetPending());
    const location: GeolocationPosition = yield call(getLocation);
    const { latitude, longitude } = location.coords;
    yield put(locationGetSuccess({ latitude, longitude }));
  } catch (error: any) {
    yield put(locationGetError(error));
  }
}

function* identitySaga() {
  yield takeEvery(locationGetAction, executeLocationGet);
}

export default identitySaga;
