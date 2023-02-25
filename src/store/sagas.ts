import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import axios from "axios";
import qs from "qs";
import { all, fork } from "redux-saga/effects"

import locationSaga from "./location/saga";

import type { Method } from "axios";

interface RequestOption {
  url: string;
  method: Method;
  data?: any;
};

export const invokeAPI = async (option: RequestOption) => {
  let url: string = option.url;
  if (option.method.toUpperCase() === "GET") {
    if (option.data) {
      const queryString: string = qs.stringify(option.data);
      url = `${url}?${queryString}`;
    }
  }
  return await axios({
    data: option.data,
    method: option.method,
    url: url,
  });
};

export const initAxios = (store: ToolkitStore) => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return new Promise((resolve, reject) => {
        return reject(error);
      });
    },
  );
};

export default function* rootSaga() {
  yield all([
    // public
    fork(locationSaga),
  ]);
}
