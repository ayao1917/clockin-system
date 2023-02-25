import React from "react";

import Home from "../page/Home";
import Search from "../page/Search";

const routePath = {
  home: "/",
  search: "/search",
};

const publicRoutes = [
  { component: <Home />, path: routePath.home },
  { component: <Search />, path: routePath.search },
];

export { routePath, publicRoutes };
