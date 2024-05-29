"use strict";
exports.id = 695;
exports.ids = [695];
exports.modules = {

/***/ 87695:
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
    industry: "Real Estate",
    title: "Template 1",
    description: "Template available for deployment at the realtor simplified platform.",
    image: _public_projects__WEBPACK_IMPORTED_MODULE_4__/* .template1 */ .Cj,
    date: "2022-10",
    service: "Web application",
    url: "https://template-1.realtorsimplified.com/",
    pathname: "/apps/realtor-template-1",
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
        name: "NodeJS",
        image: "/logos/nodejs-logo.png"
    },
    {
        name: "ExpressJS",
        image: "/logos/express-logo.png"
    },
    {
        name: "MongoDB",
        image: "/logos/mongodb-logo.webp"
    },
    {
        name: "DigitalOcean",
        image: "/logos/digital-ocean-logo.svg"
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
        name: "Docker",
        image: "/logos/docker-logo.png"
    },
    {
        name: "Postmark",
        image: "/logos/postmark-logo.png"
    },
    {
        name: "LeafletJS",
        image: "/logos/leaflet-logo.jpg"
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
                        children: "Design & Develop a template that can be deployed by a user in the realtor simplified platform. This template should be a reusable skeleton that can be\nre-skinned with different colors and images."
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                        children: "The template should display a list of properties, a list of realtors, and a contact form. It also needs to display a map with the location of the properties,\nand have a dashboard where admin users can manage the content of the website."
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.ul, {
                        children: [
                            "\n",
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.li, {
                                children: [
                                    "\n",
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                        children: "Dashboard should only be accessible to admin users."
                                    }),
                                    "\n"
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.li, {
                                children: [
                                    "\n",
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                        children: "Add/Modify/Delete property listings."
                                    }),
                                    "\n"
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.li, {
                                children: [
                                    "\n",
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                        children: "Add/Modify/Delete realtors."
                                    }),
                                    "\n"
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.li, {
                                children: [
                                    "\n",
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                        children: "Change static content of the website."
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
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_2__/* .AppSolution */ .oD, {
                        image: "realtor-template-1.png",
                        href: appData.url,
                        children: [
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                children: "Template built to be deployed in the realtor simplified platform. Something that was taken into considaration was that the site had to be easy to use and maintain."
                            }),
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                children: "This initial template is geared towards small real estate companies or agents that want to have a web presence."
                            }),
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                children: "The Front-End is built with ReactJS and NextJS, the database used is MongoDB, for the static images a Digital OCean Spaces is used, and for the map a Mapbox API and Leaflet is used."
                            }),
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                children: "The most importat components in this template are the Map, since it can be used in pretty much any other template, and the Dashboard, since it allows the user to manage the content of the website."
                            })
                        ]
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