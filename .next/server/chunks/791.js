"use strict";
exports.id = 791;
exports.ids = [791];
exports.modules = {

/***/ 34791:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appData: () => (/* binding */ appData),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   metadata: () => (/* binding */ metadata),
/* harmony export */   sections: () => (/* binding */ sections),
/* harmony export */   technologies: () => (/* binding */ technologies)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_mdx_import_source_file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(69915);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44759);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14178);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _public_projects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19057);
/* harmony import */ var _app_apps_wrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42267);
/*@jsxRuntime automatic @jsxImportSource react*/ 




const appData = {
    industry: "Wood Supplier",
    title: "Sierra Ecomaderas",
    description: "Static website for a wood provider, located in Mexico. Mainly used to display the products and services offered by the company.",
    image: _public_projects__WEBPACK_IMPORTED_MODULE_4__/* .sierraEcomaderas */ .NK,
    date: "2021-10",
    service: "Static Website",
    url: "https://sierraecomaderas.com/",
    pathname: "/apps/sierra-ecomaderas",
    framework: "next"
};
const sections = [
    {
        index: 0,
        title: "About",
        id: "about"
    },
    {
        index: 1,
        title: "Challenge",
        id: "challenge"
    },
    {
        index: 2,
        title: "Solution",
        id: "solution"
    },
    {
        index: 3,
        title: "Technologies",
        id: "technologies"
    }
];
const metadata = {
    title: `${appData.title}`,
    description: appData.description
};
const technologies = [
    {
        name: "HTML5",
        image: "/logos/html5-logo.png"
    },
    {
        name: "CSS3",
        image: "/logos/css-logo.png"
    },
    {
        name: "JavaScript",
        image: "/logos/js-logo.png"
    },
    {
        name: "ReactJS",
        image: "/logos/react-logo.png"
    },
    {
        name: "NextJS",
        image: "/logos/nextjs-logo.png"
    },
    {
        name: "TailwindCSS",
        image: "/logos/tailwindcss-logo.jpg"
    },
    {
        name: "Git",
        image: "/logos/git-logo.png"
    },
    {
        name: "Github",
        image: "/logos/github-logo.webp"
    },
    {
        name: "Postmark",
        image: "/logos/postmark-logo.png"
    }
];

const MDXLayout = function Layout(props) {
    return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_apps_wrapper__WEBPACK_IMPORTED_MODULE_5__["default"], Object.assign({}, props, {
        appData: appData
    }));
};
function _createMdxContent(props) {
    const _components = Object.assign({
        h2: "h2",
        p: "p",
        ul: "ul",
        li: "li",
        div: "div",
        h4: "h4"
    }, (0,next_mdx_import_source_file__WEBPACK_IMPORTED_MODULE_1__/* .useMDXComponents */ .a)(), props.components);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_2__/* .Container */ .W2, {
        children: [
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_2__/* .Border */ .OC, {
                className: "my-8"
            }),
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_2__/* .Section */ .$0, {
                id: "challenge",
                children: [
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.h2, {
                        id: "challenge",
                        children: "Challenge"
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                        children: "Design & Develop a static website for a wood supplier company."
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.ul, {
                        children: [
                            "\n",
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.li, {
                                children: [
                                    "\n",
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                        children: "Display the products and services offered by the company."
                                    }),
                                    "\n"
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.li, {
                                children: [
                                    "\n",
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                        children: "Allow the user to contact the company."
                                    }),
                                    "\n"
                                ]
                            }),
                            "\n"
                        ]
                    })
                ]
            }),
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_2__/* .Border */ .OC, {
                className: "my-8"
            }),
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_2__/* .Section */ .$0, {
                id: "solution",
                children: [
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.h2, {
                        id: "solution",
                        children: "Solution"
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_2__/* .AppSolution */ .oD, {
                        href: appData.url
                    })
                ]
            }),
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_2__/* .Border */ .OC, {
                className: "my-8"
            }),
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_2__/* .Section */ .$0, {
                id: "technologies",
                children: [
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.h2, {
                        id: "technologies",
                        children: "Technologies"
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_2__/* .FadeInStagger */ .o$, {
                        className: "flex gap-4 mt-6 flex-wrap",
                        faster: true,
                        once: true,
                        children: technologies.map((tech)=>react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_2__/* .FadeIn */ .Uo, {
                                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.div, {
                                    className: "mt-auto",
                                    children: [
                                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {
                                            src: tech.image,
                                            className: "object-contain rounded-md m-auto",
                                            alt: "",
                                            height: 64,
                                            width: 64,
                                            style: {
                                                width: 64,
                                                height: 64
                                            }
                                        }),
                                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.h4, {
                                            className: "text-sm font-semibold tracking-tight text-[#525df3] text-center bg-white rounded-full w-min px-2 m-2 mx-auto",
                                            children: tech.name
                                        })
                                    ]
                                })
                            }, tech.name))
                    })
                ]
            })
        ]
    });
}
function MDXContent(props = {}) {
    return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MDXLayout, Object.assign({}, props, {
        children: react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_createMdxContent, props)
    }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MDXContent);


/***/ })

};
;