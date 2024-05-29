"use strict";
exports.id = 566;
exports.ids = [566,524];
exports.modules = {

/***/ 50261:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppsLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44759);
/* harmony import */ var _lib_mdx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18030);



async function AppsLayout({ leetData, children }) {
    const allLeetCode = await (0,_lib_mdx__WEBPACK_IMPORTED_MODULE_2__/* .loadLeetcode */ .$)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "w-full overflow-y-auto overflow-x-hidden @container",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("article", {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("header", {}),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_1__/* .FadeIn */ .Uo, {
                    children: children
                })
            ]
        })
    });
}


/***/ }),

/***/ 53566:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   leetData: () => (/* binding */ leetData),
/* harmony export */   metadata: () => (/* binding */ metadata),
/* harmony export */   sections: () => (/* binding */ sections)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_mdx_import_source_file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(69915);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44759);
/* harmony import */ var _app_leetcode_wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(50261);
/*@jsxRuntime automatic @jsxImportSource react*/ // SectionsStart
// SectionsEnd
/*<iframe className='w-full aspect-video mt-12'*/ /*title='Youtube player'*/ /*sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'*/ /*src={`https://youtube.com/embed/${leetData.videoId}?autoplay=0&t=13`}>*/ /*</iframe>*/ 


const leetData = {
    title: "Hassan Foodies",
    description: "Food Blogging Platform.",
    pathname: "/leetcode/two-pointers",
    framework: "leetcode",
    videoId: "xZ4AfXHQ1VQ"
};
const sections = [
    {
        index: 0,
        title: "Description",
        id: "about"
    },
    {
        // SectionsStart
        index: 1,
        title: "Valid Palindrome",
        id: "valid-palindrome.easy"
    }
];
const metadata = {
    title: `${leetData.title}`,
    description: leetData.description
};

const MDXLayout = function Layout(props) {
    return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_leetcode_wrapper__WEBPACK_IMPORTED_MODULE_3__["default"], Object.assign({}, props, {
        leetData: leetData
    }));
};
function _createMdxContent(props) {
    const _components = Object.assign({
        h1: "h1",
        p: "p",
        h3: "h3",
        h4: "h4",
        ul: "ul",
        li: "li",
        code: "code",
        pre: "pre",
        ol: "ol"
    }, (0,next_mdx_import_source_file__WEBPACK_IMPORTED_MODULE_1__/* .useMDXComponents */ .a)(), props.components);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_2__/* .Container */ .W2, {
        children: [
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_2__/* .Section */ .$0, {
                id: sections[0].id,
                children: [
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.h1, {
                        children: "Hassan Foodies"
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                        children: "At Hassan Foodies, I am passionate about exploring the culinary delights that make life flavorful and exciting.\nFrom mouthwatering recipes to hidden food gems, we're here to guide you on a delicious journey.."
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_2__/* .Border */ .OC, {
                        className: "mt-6"
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.h3, {
                        children: "\uD83C\uDF54 Feast Your Eyes:"
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                        children: "Our Instagram page is a visual feast, showcasing vibrant food photography and enticing dishes that will leave you craving for more.\nWhether it's homemade recipes or culinary adventures from around the globe, we've got you covered."
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_2__/* .Border */ .OC, {
                        className: "mt-6"
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.h3, {
                        children: "\uD83C\uDFAC Culinary Adventures:"
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                        children: "Dive deeper into the world of food with our YouTube channel. Join us as we explore the hottest food spots, share cooking tips, and bring you along on our gastronomic adventures.\nFrom street food escapades to gourmet experiences, there's always something new to discover."
                    })
                ]
            }),
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_2__/* .Section */ .$0, {
                id: sections[1].id,
                className: "pt-2",
                children: [
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_2__/* .Border */ .OC, {
                        className: "translate-y-5"
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.h3, {
                        children: "Valid Palindrome"
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                        children: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers."
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                        children: "Given a string s, return true if it is a palindrome, or false otherwise."
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.h4, {
                        children: "Example 1:"
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.p, {
                        children: [
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                children: "Input"
                            }),
                            ': s = "A man, a plan, a canal: Panama"\n',
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                children: "Output"
                            }),
                            ": true\n",
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                children: "Explanation"
                            }),
                            ': "amanaplanacanalpanama" is a palindrome.'
                        ]
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.h4, {
                        children: "Example 2:"
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.p, {
                        children: [
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                children: "Input"
                            }),
                            ': s = "race a car"\n',
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                children: "Output"
                            }),
                            ": false\n",
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                children: "Explanation"
                            }),
                            ': "raceacar" is not a palindrome.'
                        ]
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.h4, {
                        children: "Example 3:"
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.p, {
                        children: [
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                children: "Input"
                            }),
                            ': s = " "\n',
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                children: "Output"
                            }),
                            ": true\n",
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                children: "Explanation"
                            }),
                            ': s is an empty string "" after removing non-alphanumeric characters.\nSince an empty string reads the same forward and backward, it is a palindrome.'
                        ]
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.h4, {
                        children: "Constraints:"
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.ul, {
                        children: [
                            "\n",
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.li, {
                                children: react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.code, {
                                    children: "1 <= s.length <= 2 * 105"
                                })
                            }),
                            "\n",
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.li, {
                                children: "s consists only of printable ASCII characters."
                            }),
                            "\n"
                        ]
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_2__/* .CodeGroup */ .P3, {
                        slug: "valid-palindrome",
                        children: react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.pre, {
                            language: "js",
                            code: "  const isPalindrome = function(s) {\n\n    // turn string to lowercase and use regex to remove non-alphanumeric\n    s = s.replace(/[^p{L}p{N}]/giu, '');\n    s = s.toLowerCase()\n\n    let a = 0, b = s.length - 1\n    \n    while(a < b){\n      if(s[a] !== s[b]) return false\n      a++\n      b--\n    }\n    return true\n  };\n",
                            children: react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.code, {
                                className: "language-js",
                                children: '<span><span style="color: var(--shiki-color-text)">  </span><span style="color: var(--shiki-token-keyword)">const</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-function)">isPalindrome</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-keyword)">=</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-keyword)">function</span><span style="color: var(--shiki-color-text)">(s) {</span></span>\n<span></span>\n<span><span style="color: var(--shiki-color-text)">    </span><span style="color: var(--shiki-token-comment)">// turn string to lowercase and use regex to remove non-alphanumeric</span></span>\n<span><span style="color: var(--shiki-color-text)">    s </span><span style="color: var(--shiki-token-keyword)">=</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-constant)">s</span><span style="color: var(--shiki-token-function)">.replace</span><span style="color: var(--shiki-color-text)">(</span><span style="color: var(--shiki-token-string-expression)">/[</span><span style="color: var(--shiki-token-keyword)">^</span><span style="color: var(--shiki-token-string-expression)">p{L}p{N}]/</span><span style="color: var(--shiki-token-keyword)">giu</span><span style="color: var(--shiki-token-punctuation)">,</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-string-expression)">&#39;&#39;</span><span style="color: var(--shiki-color-text)">);</span></span>\n<span><span style="color: var(--shiki-color-text)">    s </span><span style="color: var(--shiki-token-keyword)">=</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-constant)">s</span><span style="color: var(--shiki-token-function)">.toLowerCase</span><span style="color: var(--shiki-color-text)">()</span></span>\n<span></span>\n<span><span style="color: var(--shiki-color-text)">    </span><span style="color: var(--shiki-token-keyword)">let</span><span style="color: var(--shiki-color-text)"> a </span><span style="color: var(--shiki-token-keyword)">=</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-constant)">0</span><span style="color: var(--shiki-token-punctuation)">,</span><span style="color: var(--shiki-color-text)"> b </span><span style="color: var(--shiki-token-keyword)">=</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-constant)">s</span><span style="color: var(--shiki-color-text)">.</span><span style="color: var(--shiki-token-constant)">length</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-keyword)">-</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-constant)">1</span></span>\n<span><span style="color: var(--shiki-color-text)">    </span></span>\n<span><span style="color: var(--shiki-color-text)">    </span><span style="color: var(--shiki-token-keyword)">while</span><span style="color: var(--shiki-color-text)">(a </span><span style="color: var(--shiki-token-keyword)">&lt;</span><span style="color: var(--shiki-color-text)"> b){</span></span>\n<span><span style="color: var(--shiki-color-text)">      </span><span style="color: var(--shiki-token-keyword)">if</span><span style="color: var(--shiki-color-text)">(s[a] </span><span style="color: var(--shiki-token-keyword)">!==</span><span style="color: var(--shiki-color-text)"> s[b]) </span><span style="color: var(--shiki-token-keyword)">return</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-constant)">false</span></span>\n<span><span style="color: var(--shiki-color-text)">      a</span><span style="color: var(--shiki-token-keyword)">++</span></span>\n<span><span style="color: var(--shiki-color-text)">      b</span><span style="color: var(--shiki-token-keyword)">--</span></span>\n<span><span style="color: var(--shiki-color-text)">    }</span></span>\n<span><span style="color: var(--shiki-color-text)">    </span><span style="color: var(--shiki-token-keyword)">return</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-constant)">true</span></span>\n<span><span style="color: var(--shiki-color-text)">  };</span></span>\n<span></span>'
                            })
                        })
                    }),
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.h4, {
                        children: "Explanation:"
                    }),
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.ol, {
                        children: [
                            "\n",
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.li, {
                                children: "Get rid of non alphanumeric values and turn string to lowercase"
                            }),
                            "\n",
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.li, {
                                children: "Pointer 'a' points at the beginning of the string and pointer 'b' points at the end of the string"
                            }),
                            "\n",
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.li, {
                                children: "While 'a' is less than 'b', if the values at 'a' and 'b' are not equal, return false"
                            }),
                            "\n",
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.li, {
                                children: "If the values at 'a' and 'b' are equal, increment 'a' and decrement 'b'"
                            }),
                            "\n",
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.li, {
                                children: "If the loop finishes, return true"
                            }),
                            "\n"
                        ]
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