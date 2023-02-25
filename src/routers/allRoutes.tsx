import React from "react";

import PageHome from "../page/PageHome";
import PageSetting from "../page/PageSetting";

const routePath = {
  home: "/",
  setting: "/setting",
};

const publicRoutes = [
  { component: <PageHome />, path: routePath.home },
  { component: <PageSetting />, path: routePath.setting },
];

export { routePath, publicRoutes };
