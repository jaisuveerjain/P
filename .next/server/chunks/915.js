"use strict";
exports.id = 915;
exports.ids = [915];
exports.modules = {

/***/ 69915:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  a: () => (/* binding */ useMDXComponents)
});

// NAMESPACE OBJECT: ./src/components/mdx.tsx
var mdx_namespaceObject = {};
__webpack_require__.r(mdx_namespaceObject);
__webpack_require__.d(mdx_namespaceObject, {
  CodeGroup: () => (Code/* CodeGroup */.P),
  code: () => (Code/* Code */.E),
  h1: () => (h1),
  h2: () => (h2),
  h3: () => (h3),
  h4: () => (h4),
  ol: () => (ol),
  p: () => (p),
  ul: () => (ul),
  wrapper: () => (wrapper)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(95182);
;// CONCATENATED MODULE: ./src/components/Heading.tsx


function Heading({ level, className, children }) {
    let Component = `h${level}`;
    return /*#__PURE__*/ jsx_runtime_.jsx(Component, {
        className: (0,clsx/* default */.Z)("font-display font-medium tracking-tight text-white [text-wrap:balance]", className),
        children: children
    });
}

// EXTERNAL MODULE: ./src/components/Code.tsx
var Code = __webpack_require__(89912);
;// CONCATENATED MODULE: ./src/components/mdx.tsx




function wrapper({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "overflow-y-auto text-gray-500 w-full relative overflow-hidden",
        children: children
    });
}
function h1(props) {
    return /*#__PURE__*/ jsx_runtime_.jsx(Heading, {
        level: 1,
        ...props,
        className: "max-w-5xl text-5xl sm:text-6xl mt-16"
    });
}
function h2(props) {
    return /*#__PURE__*/ jsx_runtime_.jsx(Heading, {
        level: 2,
        ...props,
        className: "max-w-3xl text-3xl sm:text-4xl mt-12"
    });
}
function h3(props) {
    return /*#__PURE__*/ jsx_runtime_.jsx(Heading, {
        level: 3,
        ...props,
        className: "max-w-3xl text-xl sm:text-2xl mt-8"
    });
}
function h4(props) {
    return /*#__PURE__*/ jsx_runtime_.jsx(Heading, {
        level: 4,
        ...props,
        className: "max-w-3xl text-base sm:text-lg mt-5"
    });
}
function p({ children, className }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("p", {
        className: (0,clsx/* default */.Z)("mt-5 lg:text-lg text-gray-500", className),
        children: children
    });
}
function ol({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("ol", {
        className: "pl-10 mb-4 mt-2 text-gray-500 list-decimal",
        children: children
    });
}
function ul({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("ul", {
        className: "pl-10 mb-4 mt-2 text-gray-500 list-disc",
        children: children
    });
}

;// CONCATENATED MODULE: ./mdx-components.tsx

function useMDXComponents(components) {
    return {
        ...components,
        ...mdx_namespaceObject
    };
}


/***/ })

};
;