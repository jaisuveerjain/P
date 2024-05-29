"use strict";
exports.id = 374;
exports.ids = [374];
exports.modules = {

/***/ 62374:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  POST: () => (/* binding */ POST)
});

// EXTERNAL MODULE: ./node_modules/postmark/dist/index.js
var dist = __webpack_require__(98659);
;// CONCATENATED MODULE: ./src/config/postmark.js
// File: config/postmark.ts

const client = new dist/* ServerClient */.hR(process.env.POSTMARK_API_TOKEN);
/* harmony default export */ const postmark = (client);

;// CONCATENATED MODULE: ./src/app/api/contact/route.ts

async function POST(request) {
    const body = await request.json();
    // Type assertion
    const fromEmail = process.env.EMAIL_FROM;
    const toEmail = process.env.EMAIL_TO;
    try {
        await postmark.sendEmail({
            From: fromEmail,
            To: toEmail,
            Subject: "Portfolio Contact Form",
            HtmlBody: `
        <h1>Portfolio Contact Form</h1>
        <p><strong>Name:</strong> ${body.person_name}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
            ReplyTo: body.email
        });
        return new Response("ok", {
            status: 200
        });
    } catch (e) {
        console.error("Error sending email:", e);
        return new Response("Internal Server Error", {
            status: 500
        });
    }
}


/***/ })

};
;