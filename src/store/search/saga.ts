import { call, put, takeEvery } from "redux-saga/effects";

import {
  searchCompanyAction,
} from "./actions";
import {
  searchError,
  searchPending,
  searchSuccess,
} from "./slice";
import { invokeAPI } from "../sagas";

import type { AxiosResponse } from "axios";
import type {
  Company,
  SearchCompanyRequest,
} from "./types";

function* executeSearch(data: {
  type?: string;
  payload: SearchCompanyRequest;
}) {
  const { searchKey } = data.payload;
  try {
    yield put(searchPending());
    const response: AxiosResponse<Company[]> = yield call(invokeAPI, {
      method: "GET",
      url: `https://autocomplete.clearbit.com/v1/companies/suggest?query=${searchKey}`,
    });
    yield put(searchSuccess(response.data));
  } catch (error: any) {
    yield put(searchError(error));
  }
}

function* identitySaga() {
  yield takeEvery(searchCompanyAction, executeSearch);
}

export default identitySaga;
