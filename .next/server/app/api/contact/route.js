"use strict";
(() => {
var exports = {};
exports.id = 386;
exports.ids = [386];
exports.modules = {

/***/ 39491:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 13685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 95687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 76224:
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ 57310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 73837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 59796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 72404:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   headerHooks: () => (/* binding */ headerHooks),
/* harmony export */   originalPathname: () => (/* binding */ originalPathname),
/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   serverHooks: () => (/* binding */ serverHooks),
/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
/* harmony export */ });
/* harmony import */ var next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42394);
/* harmony import */ var next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_modules_app_route_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(69692);
/* harmony import */ var next_dist_server_future_route_modules_app_route_module__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19513);
/* harmony import */ var _Users_jaisuveerjain_Desktop_Portfolio_New_src_app_api_contact_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(62374);

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = next_dist_server_future_route_modules_app_route_module__WEBPACK_IMPORTED_MODULE_1__.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_2__.RouteKind.APP_ROUTE,
        page: "/api/contact/route",
        pathname: "/api/contact",
        filename: "route",
        bundlePath: "app/api/contact/route"
    },
    resolvedPagePath: "/Users/jaisuveerjain/Desktop/Portfolio/New/src/app/api/contact/route.ts",
    nextConfigOutput,
    userland: _Users_jaisuveerjain_Desktop_Portfolio_New_src_app_api_contact_route_ts__WEBPACK_IMPORTED_MODULE_3__
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/contact/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [587,501,659,374], () => (__webpack_exec__(72404)));
module.exports = __webpack_exports__;

})();