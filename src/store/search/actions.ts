import { createAction } from "@reduxjs/toolkit";

import type {
  SearchCompanyRequest,
} from "./types";

export const searchCompanyAction =
  createAction<SearchCompanyRequest>("SEARCH_COMPANY");
