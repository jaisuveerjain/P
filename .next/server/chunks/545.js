"use strict";
exports.id = 545;
exports.ids = [545];
exports.modules = {

/***/ 17545:
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
/*@jsxRuntime automatic @jsxImportSource react*/ /*<Section id="challenge">*/ /*## Challenge*/ /*Design & Develop a platform that desploys a premade template within minutes. This application needs to have multiple services coupled together:*/ /*1. Dedicated static image hosting service, Digital Ocean Spaces (S3 wrapper).*/ /*2. Dedicated mongodb database from Digital Ocean.*/ /*3. Mapbox api key for their tiles service.*/ /*4. Dedicated application hosting for a NextJS app in Digital Ocean's App Platform.*/ /*- All of this resources need to be provisioned automatically, and coupled together without any human interaction.*/ /*- User should be able to manage Admin users and access to the app's dashboard.*/ /*- User should be able to assign a custom domain for the application.*/ /*- Admin users, should be able to modify the static content of the website as well as dynamic content, such as property listings, realtors, images, etc.*/ /*</Section>*/ /*<Section id="solution">*/ /*## Solution*/ /*<AppSolution image='realtor-simplified.png' href={appData.url}>*/ /**/ /*Realtor Simplified Saas is split in 3 different systems. Each of this systems is hosted in their own server and they communicate through apis.*/ /*The first system 'Shop' is a NextJs application that faces the user. It is where a user can register, manage their subscription, and choose which template to deploy.*/ /*Once a template is deployed this is also where that user is able to change the template, add admin users that can access the application dasboard's and where they can add*/ /*a custom domain for the application.*/ /*The second system 'Server' is a small express server that serves as a connection between the 'Shop' and the 'Worker' system. It's job is to recieve orders from the 'Shop'*/ /*and initialize any of the 3 job sequences available:*/ /*<ul role="list" className="mt-6 space-y-8">*/ /*<li>*/ /*<span>*/ /*<strong className="font-semibold text-blue-100">Initial Deployment (user triggered):</strong> This sequence is executed when a newly subscribed user deploys an application for the first time.*/ /*The necessary resources previously mentioned will be provisioned from digital ocean.*/ /*</span>*/ /*</li>*/ /*<li>*/ /*<span>*/ /*<strong className="font-semibold text-blue-100">Redeployment (user triggered)</strong> This sequence is executed when a subscribed user with an active application wants to change the selected*/ /*template, or when they want to change the domain name of the application. Adding or deleting admin users can be achieved without redeploying.*/ /*</span>*/ /*</li>*/ /*<li>*/ /*<span>*/ /*<strong className="font-semibold text-blue-100">Delete Application (system triggered)</strong> Whenever a user deletes their subscription the system will start a delete sequence that will delete*/ /*all of their resources.*/ /*</span>*/ /*</li>*/ /*</ul>*/ /*The last system 'Worker' is a series of redis queues that execute in sequence depending on which queue they start at. It is important to note, that job error handling and job initialization is only done*/ /*by the 'Server' this is why the 'Worker' needs to notify the 'Server' whenever a job is finished correctly or incorrectly.*/ /*</AppSolution>*/ /*</Section>*/ 




const appData = {
    industry: "Portfolio",
    title: "Business Portfolio",
    description: "A compilation of academic and professional materials that exemplifies your beliefs, skills, qualifications, education, training, and experiences. It provides insight into your personality and work ethic",
    image: _public_projects__WEBPACK_IMPORTED_MODULE_4__/* .realtorSimplified */ .Ed,
    date: "2023-01",
    service: "Web application",
    url: "https://www.jaisuveerjain.com/",
    pathname: "/apps/realtor-simplified",
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
        name: "Stripe",
        image: "/logos/stripe-logo.png"
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
        div: "div",
        h4: "h4"
    }, (0,next_mdx_import_source_file__WEBPACK_IMPORTED_MODULE_1__/* .useMDXComponents */ .a)(), props.components);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_2__/* .Container */ .W2, {
        children: [
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_2__/* .Border */ .OC, {
                className: "my-8"
            }),
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_2__/* .Border */ .OC, {
                className: "my-8"
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