"use strict";
exports.id = 822;
exports.ids = [822];
exports.modules = {

/***/ 81822:
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
/* harmony import */ var _public_projects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19057);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14178);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _app_apps_wrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42267);
/*@jsxRuntime automatic @jsxImportSource react*/ 




const appData = {
    industry: "Entertainment",
    title: "Loteria Monarca",
    description: 'Online platform to play the traditional Mexican game "Loteria Tradicional" & "Loteria de Pocitos" with friends and family.',
    image: _public_projects__WEBPACK_IMPORTED_MODULE_3__/* .loteriaMonarca */ .cY,
    date: "2020-02",
    service: "Web Application",
    url: "https://loteria-online.onrender.com/",
    pathname: "/apps/loteria-monarca",
    framework: "svelte"
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
        name: "JavaScript",
        image: "/logos/js-logo.png"
    },
    {
        name: "HTML5",
        image: "/logos/html5-logo.png"
    },
    {
        name: "CSS3",
        image: "/logos/css-logo.png"
    },
    {
        name: "TailwindCSS",
        image: "/logos/tailwindcss-logo.jpg"
    },
    {
        name: "JQuery",
        image: "/logos/jquery-logo.webp"
    },
    {
        name: "Svelte",
        image: "/logos/svelte-logo.png"
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
        name: "Git",
        image: "/logos/git-logo.png"
    },
    {
        name: "Github",
        image: "/logos/github-logo.webp"
    },
    {
        name: "Heroku",
        image: "/logos/heroku-logo.webp"
    },
    {
        name: "Paypal",
        image: "/logos/paypal-logo.png"
    },
    {
        name: "MercadoPago",
        image: "/logos/mercadopago-logo.webp"
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
        em: "em",
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
                        children: 'Design and develop an online platform that enables users to play "Loteria Tradicional" & "Loteria de Pocitos". Allow players to create their Loteria \'Tables\' and\nuse them on their games.'
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.ul, {
                        children: [
                            "\n",
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.li, {
                                children: [
                                    "\n",
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                        children: "Master Admin should be able to create and modify 'Events'."
                                    }),
                                    "\n"
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.li, {
                                children: [
                                    "\n",
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                        children: "Master Admin should be able to start and end 'Events'."
                                    }),
                                    "\n"
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.li, {
                                children: [
                                    "\n",
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                        children: "Allow users to buy credits through paypal and mercadopago."
                                    }),
                                    "\n"
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.li, {
                                children: [
                                    "\n",
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                        children: "Authenticate users through email and password, google, and facebook."
                                    }),
                                    "\n"
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.li, {
                                children: [
                                    "\n",
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                        children: "Account verification through phone sms."
                                    }),
                                    "\n"
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.li, {
                                children: [
                                    "\n",
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                        children: "Allow users to enter an 'Event' with their credits."
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
                        image: "loteria-monarca.png",
                        href: appData.url,
                        children: [
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                children: "Loteria Monarca's application is made up of 2 different express servers. Each of this servers is hosted on their own Heroku dyno."
                            }),
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                children: "Loteria Monarca's 'App' is the user facing interface. This is where users are able to do all of the actions that are available to them."
                            }),
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                children: "Loteria Monarca's 'Dashboard' is the admin's interface. Here the admin is able to create and modify 'Events', start and end 'Events', and view the 'Events' results."
                            }),
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                                children: "After 2/3 months of success and after reaching 15k unique users, 100s of concurrent users on game night, and 12k USD NRR, I made the decision to transition\nthe front end app over to SvelteJs and TailwindCSS for a better user experience and speed, and implemented Stripe and Paypal payment processing."
                            })
                        ]
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.p, {
                        children: [
                            "*",
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.em, {
                                children: "Initial load is around ~2 minutes due to free hosting."
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
                                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
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