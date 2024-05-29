"use strict";
exports.id = 659;
exports.ids = [659];
exports.modules = {

/***/ 11113:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = __webpack_require__(20785);


/***/ }),

/***/ 44558:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
var settle = __webpack_require__(59946);
var buildFullPath = __webpack_require__(63456);
var buildURL = __webpack_require__(23909);
var http = __webpack_require__(13685);
var https = __webpack_require__(95687);
var httpFollow = (__webpack_require__(2725).http);
var httpsFollow = (__webpack_require__(2725).https);
var url = __webpack_require__(57310);
var zlib = __webpack_require__(59796);
var VERSION = (__webpack_require__(52947).version);
var createError = __webpack_require__(50218);
var enhanceError = __webpack_require__(96272);
var defaults = __webpack_require__(83865);
var Cancel = __webpack_require__(84227);
var isHttps = /https:?/;
/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */ function setProxy(options, proxy, location) {
    options.hostname = proxy.host;
    options.host = proxy.host;
    options.port = proxy.port;
    options.path = location;
    // Basic proxy authorization
    if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
        options.headers["Proxy-Authorization"] = "Basic " + base64;
    }
    // If a proxy is used, any redirects must also pass through the proxy
    options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
    };
}
/*eslint consistent-return:0*/ module.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var onCanceled;
        function done() {
            if (config.cancelToken) {
                config.cancelToken.unsubscribe(onCanceled);
            }
            if (config.signal) {
                config.signal.removeEventListener("abort", onCanceled);
            }
        }
        var resolve = function resolve(value) {
            done();
            resolvePromise(value);
        };
        var rejected = false;
        var reject = function reject(value) {
            done();
            rejected = true;
            rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        var headerNames = {};
        Object.keys(headers).forEach(function storeLowerName(name) {
            headerNames[name.toLowerCase()] = name;
        });
        // Set User-Agent (required by some servers)
        // See https://github.com/axios/axios/issues/69
        if ("user-agent" in headerNames) {
            // User-Agent is specified; handle case where no UA header is desired
            if (!headers[headerNames["user-agent"]]) {
                delete headers[headerNames["user-agent"]];
            }
        // Otherwise, use specified value
        } else {
            // Only set header if it hasn't been set in config
            headers["User-Agent"] = "axios/" + VERSION;
        }
        if (data && !utils.isStream(data)) {
            if (Buffer.isBuffer(data)) {
            // Nothing to do...
            } else if (utils.isArrayBuffer(data)) {
                data = Buffer.from(new Uint8Array(data));
            } else if (utils.isString(data)) {
                data = Buffer.from(data, "utf-8");
            } else {
                return reject(createError("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", config));
            }
            if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
                return reject(createError("Request body larger than maxBodyLength limit", config));
            }
            // Add Content-Length header if data exists
            if (!headerNames["content-length"]) {
                headers["Content-Length"] = data.length;
            }
        }
        // HTTP basic authentication
        var auth = undefined;
        if (config.auth) {
            var username = config.auth.username || "";
            var password = config.auth.password || "";
            auth = username + ":" + password;
        }
        // Parse url
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || "http:";
        if (!auth && parsed.auth) {
            var urlAuth = parsed.auth.split(":");
            var urlUsername = urlAuth[0] || "";
            var urlPassword = urlAuth[1] || "";
            auth = urlUsername + ":" + urlPassword;
        }
        if (auth && headerNames.authorization) {
            delete headers[headerNames.authorization];
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        var options = {
            path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
            method: config.method.toUpperCase(),
            headers: headers,
            agent: agent,
            agents: {
                http: config.httpAgent,
                https: config.httpsAgent
            },
            auth: auth
        };
        if (config.socketPath) {
            options.socketPath = config.socketPath;
        } else {
            options.hostname = parsed.hostname;
            options.port = parsed.port;
        }
        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
            var proxyEnv = protocol.slice(0, -1) + "_proxy";
            var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
            if (proxyUrl) {
                var parsedProxyUrl = url.parse(proxyUrl);
                var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
                var shouldProxy = true;
                if (noProxyEnv) {
                    var noProxy = noProxyEnv.split(",").map(function trim(s) {
                        return s.trim();
                    });
                    shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                        if (!proxyElement) {
                            return false;
                        }
                        if (proxyElement === "*") {
                            return true;
                        }
                        if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                            return true;
                        }
                        return parsed.hostname === proxyElement;
                    });
                }
                if (shouldProxy) {
                    proxy = {
                        host: parsedProxyUrl.hostname,
                        port: parsedProxyUrl.port,
                        protocol: parsedProxyUrl.protocol
                    };
                    if (parsedProxyUrl.auth) {
                        var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                        proxy.auth = {
                            username: proxyUrlAuth[0],
                            password: proxyUrlAuth[1]
                        };
                    }
                }
            }
        }
        if (proxy) {
            options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
            setProxy(options, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
            transport = config.transport;
        } else if (config.maxRedirects === 0) {
            transport = isHttpsProxy ? https : http;
        } else {
            if (config.maxRedirects) {
                options.maxRedirects = config.maxRedirects;
            }
            transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
            options.maxBodyLength = config.maxBodyLength;
        }
        if (config.insecureHTTPParser) {
            options.insecureHTTPParser = config.insecureHTTPParser;
        }
        // Create the request
        var req = transport.request(options, function handleResponse(res) {
            if (req.aborted) return;
            // uncompress the response body transparently if required
            var stream = res;
            // return the last request in case of redirects
            var lastRequest = res.req || req;
            // if no content, is HEAD request or decompress disabled we should not decompress
            if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config.decompress !== false) {
                switch(res.headers["content-encoding"]){
                    /*eslint default-case:0*/ case "gzip":
                    case "compress":
                    case "deflate":
                        // add the unzipper to the body stream processing pipeline
                        stream = stream.pipe(zlib.createUnzip());
                        // remove the content-encoding in order to not confuse downstream operations
                        delete res.headers["content-encoding"];
                        break;
                }
            }
            var response = {
                status: res.statusCode,
                statusText: res.statusMessage,
                headers: res.headers,
                config: config,
                request: lastRequest
            };
            if (config.responseType === "stream") {
                response.data = stream;
                settle(resolve, reject, response);
            } else {
                var responseBuffer = [];
                var totalResponseBytes = 0;
                stream.on("data", function handleStreamData(chunk) {
                    responseBuffer.push(chunk);
                    totalResponseBytes += chunk.length;
                    // make sure the content length is not over the maxContentLength if specified
                    if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                        // stream.destoy() emit aborted event before calling reject() on Node.js v16
                        rejected = true;
                        stream.destroy();
                        reject(createError("maxContentLength size of " + config.maxContentLength + " exceeded", config, null, lastRequest));
                    }
                });
                stream.on("aborted", function handlerStreamAborted() {
                    if (rejected) {
                        return;
                    }
                    stream.destroy();
                    reject(createError("error request aborted", config, "ERR_REQUEST_ABORTED", lastRequest));
                });
                stream.on("error", function handleStreamError(err) {
                    if (req.aborted) return;
                    reject(enhanceError(err, config, null, lastRequest));
                });
                stream.on("end", function handleStreamEnd() {
                    try {
                        var responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
                        if (config.responseType !== "arraybuffer") {
                            responseData = responseData.toString(config.responseEncoding);
                            if (!config.responseEncoding || config.responseEncoding === "utf8") {
                                responseData = utils.stripBOM(responseData);
                            }
                        }
                        response.data = responseData;
                    } catch (err) {
                        reject(enhanceError(err, config, err.code, response.request, response));
                    }
                    settle(resolve, reject, response);
                });
            }
        });
        // Handle errors
        req.on("error", function handleRequestError(err) {
            if (req.aborted && err.code !== "ERR_FR_TOO_MANY_REDIRECTS") return;
            reject(enhanceError(err, config, null, req));
        });
        // set tcp keep alive to prevent drop connection by peer
        req.on("socket", function handleRequestSocket(socket) {
            // default interval of sending ack packet is 1 minute
            socket.setKeepAlive(true, 1000 * 60);
        });
        // Handle request timeout
        if (config.timeout) {
            // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
            var timeout = parseInt(config.timeout, 10);
            if (isNaN(timeout)) {
                reject(createError("error trying to parse `config.timeout` to int", config, "ERR_PARSE_TIMEOUT", req));
                return;
            }
            // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
            // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
            // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
            // And then these socket which be hang up will devoring CPU little by little.
            // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
            req.setTimeout(timeout, function handleRequestTimeout() {
                req.abort();
                var transitional = config.transitional || defaults.transitional;
                reject(createError("timeout of " + timeout + "ms exceeded", config, transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", req));
            });
        }
        if (config.cancelToken || config.signal) {
            // Handle cancellation
            // eslint-disable-next-line func-names
            onCanceled = function(cancel) {
                if (req.aborted) return;
                req.abort();
                reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
            };
            config.cancelToken && config.cancelToken.subscribe(onCanceled);
            if (config.signal) {
                config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
            }
        }
        // Send the request
        if (utils.isStream(data)) {
            data.on("error", function handleStreamError(err) {
                reject(enhanceError(err, config, null, req));
            }).pipe(req);
        } else {
            req.end(data);
        }
    });
};


/***/ }),

/***/ 83240:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
var settle = __webpack_require__(59946);
var cookies = __webpack_require__(29379);
var buildURL = __webpack_require__(23909);
var buildFullPath = __webpack_require__(63456);
var parseHeaders = __webpack_require__(95209);
var isURLSameOrigin = __webpack_require__(57219);
var createError = __webpack_require__(50218);
var defaults = __webpack_require__(83865);
var Cancel = __webpack_require__(84227);
module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
            if (config.cancelToken) {
                config.cancelToken.unsubscribe(onCanceled);
            }
            if (config.signal) {
                config.signal.removeEventListener("abort", onCanceled);
            }
        }
        if (utils.isFormData(requestData)) {
            delete requestHeaders["Content-Type"]; // Let the browser set it
        }
        var request = new XMLHttpRequest();
        // HTTP basic authentication
        if (config.auth) {
            var username = config.auth.username || "";
            var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
            requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        // Set the request timeout in MS
        request.timeout = config.timeout;
        function onloadend() {
            if (!request) {
                return;
            }
            // Prepare the response
            var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
            var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            };
            settle(function _resolve(value) {
                resolve(value);
                done();
            }, function _reject(err) {
                reject(err);
                done();
            }, response);
            // Clean up request
            request = null;
        }
        if ("onloadend" in request) {
            // Use onloadend if available
            request.onloadend = onloadend;
        } else {
            // Listen for ready state to emulate onloadend
            request.onreadystatechange = function handleLoad() {
                if (!request || request.readyState !== 4) {
                    return;
                }
                // The request errored out and we didn't get a response, this will be
                // handled by onerror instead
                // With one exception: request that using file: protocol, most browsers
                // will return status as 0 even though it's a successful request
                if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
                    return;
                }
                // readystate handler is calling before onerror or ontimeout handlers,
                // so we should call onloadend on the next 'tick'
                setTimeout(onloadend);
            };
        }
        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
            if (!request) {
                return;
            }
            reject(createError("Request aborted", config, "ECONNABORTED", request));
            // Clean up request
            request = null;
        };
        // Handle low level network errors
        request.onerror = function handleError() {
            // Real errors are hidden from us by the browser
            // onerror should only fire if it's a network error
            reject(createError("Network Error", config, null, request));
            // Clean up request
            request = null;
        };
        // Handle timeout
        request.ontimeout = function handleTimeout() {
            var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
            var transitional = config.transitional || defaults.transitional;
            if (config.timeoutErrorMessage) {
                timeoutErrorMessage = config.timeoutErrorMessage;
            }
            reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", request));
            // Clean up request
            request = null;
        };
        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (utils.isStandardBrowserEnv()) {
            // Add xsrf header
            var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;
            if (xsrfValue) {
                requestHeaders[config.xsrfHeaderName] = xsrfValue;
            }
        }
        // Add headers to the request
        if ("setRequestHeader" in request) {
            utils.forEach(requestHeaders, function setRequestHeader(val, key) {
                if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
                    // Remove Content-Type if data is undefined
                    delete requestHeaders[key];
                } else {
                    // Otherwise add header to the request
                    request.setRequestHeader(key, val);
                }
            });
        }
        // Add withCredentials to request if needed
        if (!utils.isUndefined(config.withCredentials)) {
            request.withCredentials = !!config.withCredentials;
        }
        // Add responseType to request if needed
        if (responseType && responseType !== "json") {
            request.responseType = config.responseType;
        }
        // Handle progress if needed
        if (typeof config.onDownloadProgress === "function") {
            request.addEventListener("progress", config.onDownloadProgress);
        }
        // Not all browsers support upload events
        if (typeof config.onUploadProgress === "function" && request.upload) {
            request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
            // Handle cancellation
            // eslint-disable-next-line func-names
            onCanceled = function(cancel) {
                if (!request) {
                    return;
                }
                reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
                request.abort();
                request = null;
            };
            config.cancelToken && config.cancelToken.subscribe(onCanceled);
            if (config.signal) {
                config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
            }
        }
        if (!requestData) {
            requestData = null;
        }
        // Send the request
        request.send(requestData);
    });
};


/***/ }),

/***/ 20785:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
var bind = __webpack_require__(94131);
var Axios = __webpack_require__(22704);
var mergeConfig = __webpack_require__(53064);
var defaults = __webpack_require__(83865);
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */ function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind(Axios.prototype.request, context);
    // Copy axios.prototype to instance
    utils.extend(instance, Axios.prototype, context);
    // Copy context to instance
    utils.extend(instance, context);
    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
}
// Create the default instance to be exported
var axios = createInstance(defaults);
// Expose Axios class to allow class inheritance
axios.Axios = Axios;
// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(84227);
axios.CancelToken = __webpack_require__(56915);
axios.isCancel = __webpack_require__(83157);
axios.VERSION = (__webpack_require__(52947).version);
// Expose all/spread
axios.all = function all(promises) {
    return Promise.all(promises);
};
axios.spread = __webpack_require__(21979);
// Expose isAxiosError
axios.isAxiosError = __webpack_require__(58626);
module.exports = axios;
// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ 84227:
/***/ ((module) => {


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */ function Cancel(message) {
    this.message = message;
}
Cancel.prototype.toString = function toString() {
    return "Cancel" + (this.message ? ": " + this.message : "");
};
Cancel.prototype.__CANCEL__ = true;
module.exports = Cancel;


/***/ }),

/***/ 56915:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var Cancel = __webpack_require__(84227);
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */ function CancelToken(executor) {
    if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
    });
    var token = this;
    // eslint-disable-next-line func-names
    this.promise.then(function(cancel) {
        if (!token._listeners) return;
        var i;
        var l = token._listeners.length;
        for(i = 0; i < l; i++){
            token._listeners[i](cancel);
        }
        token._listeners = null;
    });
    // eslint-disable-next-line func-names
    this.promise.then = function(onfulfilled) {
        var _resolve;
        // eslint-disable-next-line func-names
        var promise = new Promise(function(resolve) {
            token.subscribe(resolve);
            _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
            token.unsubscribe(_resolve);
        };
        return promise;
    };
    executor(function cancel(message) {
        if (token.reason) {
            // Cancellation has already been requested
            return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
    });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */ CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
        throw this.reason;
    }
};
/**
 * Subscribe to the cancel signal
 */ CancelToken.prototype.subscribe = function subscribe(listener) {
    if (this.reason) {
        listener(this.reason);
        return;
    }
    if (this._listeners) {
        this._listeners.push(listener);
    } else {
        this._listeners = [
            listener
        ];
    }
};
/**
 * Unsubscribe from the cancel signal
 */ CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
        return;
    }
    var index = this._listeners.indexOf(listener);
    if (index !== -1) {
        this._listeners.splice(index, 1);
    }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */ CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
        cancel = c;
    });
    return {
        token: token,
        cancel: cancel
    };
};
module.exports = CancelToken;


/***/ }),

/***/ 83157:
/***/ ((module) => {


module.exports = function isCancel(value) {
    return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 22704:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
var buildURL = __webpack_require__(23909);
var InterceptorManager = __webpack_require__(67097);
var dispatchRequest = __webpack_require__(18660);
var mergeConfig = __webpack_require__(53064);
var validator = __webpack_require__(26923);
var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */ function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */ Axios.prototype.request = function request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/ // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
    } else {
        config = configOrUrl || {};
    }
    if (!config.url) {
        throw new Error("Provided config url is not valid");
    }
    config = mergeConfig(this.defaults, config);
    // Set config.method
    if (config.method) {
        config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
    } else {
        config.method = "get";
    }
    var transitional = config.transitional;
    if (transitional !== undefined) {
        validator.assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
    }
    // filter out skipped interceptors
    var requestInterceptorChain = [];
    var synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
            return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    var responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    var promise;
    if (!synchronousRequestInterceptors) {
        var chain = [
            dispatchRequest,
            undefined
        ];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while(chain.length){
            promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
    }
    var newConfig = config;
    while(requestInterceptorChain.length){
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
            newConfig = onFulfilled(newConfig);
        } catch (error) {
            onRejected(error);
            break;
        }
    }
    try {
        promise = dispatchRequest(newConfig);
    } catch (error) {
        return Promise.reject(error);
    }
    while(responseInterceptorChain.length){
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
    }
    return promise;
};
Axios.prototype.getUri = function getUri(config) {
    if (!config.url) {
        throw new Error("Provided config url is not valid");
    }
    config = mergeConfig(this.defaults, config);
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
};
// Provide aliases for supported request methods
utils.forEach([
    "delete",
    "get",
    "head",
    "options"
], function forEachMethodNoData(method) {
    /*eslint func-names:0*/ Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
            method: method,
            url: url,
            data: (config || {}).data
        }));
    };
});
utils.forEach([
    "post",
    "put",
    "patch"
], function forEachMethodWithData(method) {
    /*eslint func-names:0*/ Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
            method: method,
            url: url,
            data: data
        }));
    };
});
module.exports = Axios;


/***/ }),

/***/ 67097:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
function InterceptorManager() {
    this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */ InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
    this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */ InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
        this.handlers[id] = null;
    }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */ InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
            fn(h);
        }
    });
};
module.exports = InterceptorManager;


/***/ }),

/***/ 63456:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isAbsoluteURL = __webpack_require__(35826);
var combineURLs = __webpack_require__(76358);
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */ module.exports = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
};


/***/ }),

/***/ 50218:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var enhanceError = __webpack_require__(96272);
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */ module.exports = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ 18660:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
var transformData = __webpack_require__(76272);
var isCancel = __webpack_require__(83157);
var defaults = __webpack_require__(83865);
var Cancel = __webpack_require__(84227);
/**
 * Throws a `Cancel` if cancellation has been requested.
 */ function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
        throw new Cancel("canceled");
    }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */ module.exports = function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    // Ensure headers exist
    config.headers = config.headers || {};
    // Transform request data
    config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
    // Flatten headers
    config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
    utils.forEach([
        "delete",
        "get",
        "head",
        "post",
        "put",
        "patch",
        "common"
    ], function cleanHeaderConfig(method) {
        delete config.headers[method];
    });
    var adapter = config.adapter || defaults.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        // Transform response data
        response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
        return response;
    }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
            throwIfCancellationRequested(config);
            // Transform response data
            if (reason && reason.response) {
                reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
            }
        }
        return Promise.reject(reason);
    });
};


/***/ }),

/***/ 96272:
/***/ ((module) => {


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */ module.exports = function enhanceError(error, config, code, request, response) {
    error.config = config;
    if (code) {
        error.code = code;
    }
    error.request = request;
    error.response = response;
    error.isAxiosError = true;
    error.toJSON = function toJSON() {
        return {
            // Standard
            message: this.message,
            name: this.name,
            // Microsoft
            description: this.description,
            number: this.number,
            // Mozilla
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            // Axios
            config: this.config,
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null
        };
    };
    return error;
};


/***/ }),

/***/ 53064:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */ module.exports = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    var config = {};
    function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
            return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
            return utils.merge({}, source);
        } else if (utils.isArray(source)) {
            return source.slice();
        }
        return source;
    }
    // eslint-disable-next-line consistent-return
    function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
            return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
            return getMergedValue(undefined, config1[prop]);
        }
    }
    // eslint-disable-next-line consistent-return
    function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
            return getMergedValue(undefined, config2[prop]);
        }
    }
    // eslint-disable-next-line consistent-return
    function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
            return getMergedValue(undefined, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
            return getMergedValue(undefined, config1[prop]);
        }
    }
    // eslint-disable-next-line consistent-return
    function mergeDirectKeys(prop) {
        if (prop in config2) {
            return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
            return getMergedValue(undefined, config1[prop]);
        }
    }
    var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
    };
    utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
};


/***/ }),

/***/ 59946:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var createError = __webpack_require__(50218);
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */ module.exports = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
    } else {
        reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
    }
};


/***/ }),

/***/ 76272:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
var defaults = __webpack_require__(83865);
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */ module.exports = function transformData(data, headers, fns) {
    var context = this || defaults;
    /*eslint no-param-reassign:0*/ utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
    });
    return data;
};


/***/ }),

/***/ 83865:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
var normalizeHeaderName = __webpack_require__(93459);
var enhanceError = __webpack_require__(96272);
var DEFAULT_CONTENT_TYPE = {
    "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
    }
}
function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== "undefined") {
        // For browsers use XHR adapter
        adapter = __webpack_require__(83240);
    } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        // For node use HTTP adapter
        adapter = __webpack_require__(44558);
    }
    return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
    if (utils.isString(rawValue)) {
        try {
            (parser || JSON.parse)(rawValue);
            return utils.trim(rawValue);
        } catch (e) {
            if (e.name !== "SyntaxError") {
                throw e;
            }
        }
    }
    return (encoder || JSON.stringify)(rawValue);
}
var defaults = {
    transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
    },
    adapter: getDefaultAdapter(),
    transformRequest: [
        function transformRequest(data, headers) {
            normalizeHeaderName(headers, "Accept");
            normalizeHeaderName(headers, "Content-Type");
            if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
                return data;
            }
            if (utils.isArrayBufferView(data)) {
                return data.buffer;
            }
            if (utils.isURLSearchParams(data)) {
                setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
                return data.toString();
            }
            if (utils.isObject(data) || headers && headers["Content-Type"] === "application/json") {
                setContentTypeIfUnset(headers, "application/json");
                return stringifySafely(data);
            }
            return data;
        }
    ],
    transformResponse: [
        function transformResponse(data) {
            var transitional = this.transitional || defaults.transitional;
            var silentJSONParsing = transitional && transitional.silentJSONParsing;
            var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
            var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
            if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
                try {
                    return JSON.parse(data);
                } catch (e) {
                    if (strictJSONParsing) {
                        if (e.name === "SyntaxError") {
                            throw enhanceError(e, this, "E_JSON_PARSE");
                        }
                        throw e;
                    }
                }
            }
            return data;
        }
    ],
    /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */ timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
    },
    headers: {
        common: {
            "Accept": "application/json, text/plain, */*"
        }
    }
};
utils.forEach([
    "delete",
    "get",
    "head"
], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
});
utils.forEach([
    "post",
    "put",
    "patch"
], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;


/***/ }),

/***/ 52947:
/***/ ((module) => {


module.exports = {
    "version": "0.25.0"
};


/***/ }),

/***/ 94131:
/***/ ((module) => {


module.exports = function bind(fn, thisArg) {
    return function wrap() {
        var args = new Array(arguments.length);
        for(var i = 0; i < args.length; i++){
            args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
    };
};


/***/ }),

/***/ 23909:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */ module.exports = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/ if (!params) {
        return url;
    }
    var serializedParams;
    if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
    } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
            if (val === null || typeof val === "undefined") {
                return;
            }
            if (utils.isArray(val)) {
                key = key + "[]";
            } else {
                val = [
                    val
                ];
            }
            utils.forEach(val, function parseValue(v) {
                if (utils.isDate(v)) {
                    v = v.toISOString();
                } else if (utils.isObject(v)) {
                    v = JSON.stringify(v);
                }
                parts.push(encode(key) + "=" + encode(v));
            });
        });
        serializedParams = parts.join("&");
    }
    if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
            url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
};


/***/ }),

/***/ 76358:
/***/ ((module) => {


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */ module.exports = function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};


/***/ }),

/***/ 29379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
    return {
        write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + "=" + encodeURIComponent(value));
            if (utils.isNumber(expires)) {
                cookie.push("expires=" + new Date(expires).toGMTString());
            }
            if (utils.isString(path)) {
                cookie.push("path=" + path);
            }
            if (utils.isString(domain)) {
                cookie.push("domain=" + domain);
            }
            if (secure === true) {
                cookie.push("secure");
            }
            document.cookie = cookie.join("; ");
        },
        read: function read(name) {
            var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
            return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
            this.write(name, "", Date.now() - 86400000);
        }
    };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
    return {
        write: function write() {},
        read: function read() {
            return null;
        },
        remove: function remove() {}
    };
}();


/***/ }),

/***/ 35826:
/***/ ((module) => {


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */ module.exports = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 58626:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */ module.exports = function isAxiosError(payload) {
    return utils.isObject(payload) && payload.isAxiosError === true;
};


/***/ }),

/***/ 57219:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement("a");
    var originURL;
    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */ function resolveURL(url) {
        var href = url;
        if (msie) {
            // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
    }
    originURL = resolveURL(window.location.href);
    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */ return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
        return true;
    };
}();


/***/ }),

/***/ 93459:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
module.exports = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = value;
            delete headers[name];
        }
    });
};


/***/ }),

/***/ 95209:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(30521);
// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */ module.exports = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
        return parsed;
    }
    utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
            if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                return;
            }
            if (key === "set-cookie") {
                parsed[key] = (parsed[key] ? parsed[key] : []).concat([
                    val
                ]);
            } else {
                parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
            }
        }
    });
    return parsed;
};


/***/ }),

/***/ 21979:
/***/ ((module) => {


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */ module.exports = function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr);
    };
};


/***/ }),

/***/ 26923:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var VERSION = (__webpack_require__(52947).version);
var validators = {};
// eslint-disable-next-line func-names
[
    "object",
    "boolean",
    "number",
    "function",
    "string",
    "symbol"
].forEach(function(type, i) {
    validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
    };
});
var deprecatedWarnings = {};
/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */ validators.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    // eslint-disable-next-line func-names
    return function(value, opt, opts) {
        if (validator === false) {
            throw new Error(formatMessage(opt, " has been removed" + (version ? " in " + version : "")));
        }
        if (version && !deprecatedWarnings[opt]) {
            deprecatedWarnings[opt] = true;
            // eslint-disable-next-line no-console
            console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
        }
        return validator ? validator(value, opt, opts) : true;
    };
};
/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */ function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
        throw new TypeError("options must be an object");
    }
    var keys = Object.keys(options);
    var i = keys.length;
    while(i-- > 0){
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
            var value = options[opt];
            var result = value === undefined || validator(value, opt, options);
            if (result !== true) {
                throw new TypeError("option " + opt + " must be " + result);
            }
            continue;
        }
        if (allowUnknown !== true) {
            throw Error("Unknown option " + opt);
        }
    }
}
module.exports = {
    assertOptions: assertOptions,
    validators: validators
};


/***/ }),

/***/ 30521:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var bind = __webpack_require__(94131);
// utils is a library of generic helper functions non-specific to axios
var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */ function isArray(val) {
    return Array.isArray(val);
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */ function isUndefined(val) {
    return typeof val === "undefined";
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */ function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */ function isArrayBuffer(val) {
    return toString.call(val) === "[object ArrayBuffer]";
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */ function isFormData(val) {
    return toString.call(val) === "[object FormData]";
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */ function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
    } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */ function isString(val) {
    return typeof val === "string";
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */ function isNumber(val) {
    return typeof val === "number";
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */ function isObject(val) {
    return val !== null && typeof val === "object";
}
/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */ function isPlainObject(val) {
    if (toString.call(val) !== "[object Object]") {
        return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */ function isDate(val) {
    return toString.call(val) === "[object Date]";
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */ function isFile(val) {
    return toString.call(val) === "[object File]";
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */ function isBlob(val) {
    return toString.call(val) === "[object Blob]";
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */ function isFunction(val) {
    return toString.call(val) === "[object Function]";
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */ function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */ function isURLSearchParams(val) {
    return toString.call(val) === "[object URLSearchParams]";
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */ function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */ function isStandardBrowserEnv() {
    if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
    }
    return  false && 0;
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */ function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === "undefined") {
        return;
    }
    // Force an array if not already something iterable
    if (typeof obj !== "object") {
        /*eslint no-param-reassign:0*/ obj = [
            obj
        ];
    }
    if (isArray(obj)) {
        // Iterate over array values
        for(var i = 0, l = obj.length; i < l; i++){
            fn.call(null, obj[i], i, obj);
        }
    } else {
        // Iterate over object keys
        for(var key in obj){
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */ function merge() {
    var result = {};
    function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
            result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
            result[key] = merge({}, val);
        } else if (isArray(val)) {
            result[key] = val.slice();
        } else {
            result[key] = val;
        }
    }
    for(var i = 0, l = arguments.length; i < l; i++){
        forEach(arguments[i], assignValue);
    }
    return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */ function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
            a[key] = bind(val, thisArg);
        } else {
            a[key] = val;
        }
    });
    return a;
}
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */ function stripBOM(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }
    return content;
}
module.exports = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM
};


/***/ }),

/***/ 75737:
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ 
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (()=>{
    let warned = false;
    return ()=>{
        if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
    };
})();
/**
 * Colors.
 */ exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */ // eslint-disable-next-line complexity
function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (false) {}
    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
    }
    // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
     false && (0) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
    if (!this.useColors) {
        return;
    }
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match)=>{
        if (match === "%%") {
            return;
        }
        index++;
        if (match === "%c") {
            // We only are interested in the *last* %c
            // (the user may have provided their own)
            lastC = index;
        }
    });
    args.splice(lastC, 0, c);
}
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */ exports.log = console.debug || console.log || (()=>{});
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    try {
        if (namespaces) {
            exports.storage.setItem("debug", namespaces);
        } else {
            exports.storage.removeItem("debug");
        }
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    let r;
    try {
        r = exports.storage.getItem("debug");
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
    }
    return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */ function localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
module.exports = __webpack_require__(71006)(exports);
const { formatters } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
    }
};


/***/ }),

/***/ 71006:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ 
function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = __webpack_require__(6034);
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key)=>{
        createDebug[key] = env[key];
    });
    /**
	* The currently active debug mode names, and names to skip.
	*/ createDebug.names = [];
    createDebug.skips = [];
    /**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/ createDebug.formatters = {};
    /**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/ function selectColor(namespace) {
        let hash = 0;
        for(let i = 0; i < namespace.length; i++){
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    /**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/ function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
            // Disabled?
            if (!debug.enabled) {
                return;
            }
            const self = debug;
            // Set `diff` timestamp
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") {
                // Anything else let's inspect with %O
                args.unshift("%O");
            }
            // Apply any `formatters` transformations
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format)=>{
                // If we encounter an escaped % then don't increase the array index
                if (match === "%%") {
                    return "%";
                }
                index++;
                const formatter = createDebug.formatters[format];
                if (typeof formatter === "function") {
                    const val = args[index];
                    match = formatter.call(self, val);
                    // Now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                }
                return match;
            });
            // Apply env-specific formatting (colors, etc.)
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.
        Object.defineProperty(debug, "enabled", {
            enumerable: true,
            configurable: false,
            get: ()=>{
                if (enableOverride !== null) {
                    return enableOverride;
                }
                if (namespacesCache !== createDebug.namespaces) {
                    namespacesCache = createDebug.namespaces;
                    enabledCache = createDebug.enabled(namespace);
                }
                return enabledCache;
            },
            set: (v)=>{
                enableOverride = v;
            }
        });
        // Env-specific initialization logic for debug instances
        if (typeof createDebug.init === "function") {
            createDebug.init(debug);
        }
        return debug;
    }
    function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
    }
    /**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/ function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for(i = 0; i < len; i++){
            if (!split[i]) {
                continue;
            }
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") {
                createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
            } else {
                createDebug.names.push(new RegExp("^" + namespaces + "$"));
            }
        }
    }
    /**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/ function disable() {
        const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips.map(toNamespace).map((namespace)=>"-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
    }
    /**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/ function enabled(name) {
        if (name[name.length - 1] === "*") {
            return true;
        }
        let i;
        let len;
        for(i = 0, len = createDebug.skips.length; i < len; i++){
            if (createDebug.skips[i].test(name)) {
                return false;
            }
        }
        for(i = 0, len = createDebug.names.length; i < len; i++){
            if (createDebug.names[i].test(name)) {
                return true;
            }
        }
        return false;
    }
    /**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/ function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    /**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/ function coerce(val) {
        if (val instanceof Error) {
            return val.stack || val.message;
        }
        return val;
    }
    /**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/ function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
}
module.exports = setup;


/***/ }),

/***/ 63694:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */ 
if (typeof process === "undefined" || process.type === "renderer" || false === true || process.__nwjs) {
    module.exports = __webpack_require__(75737);
} else {
    module.exports = __webpack_require__(10056);
}


/***/ }),

/***/ 10056:
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */ 
const tty = __webpack_require__(76224);
const util = __webpack_require__(73837);
/**
 * This is the Node.js implementation of `debug()`.
 */ exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(()=>{}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
/**
 * Colors.
 */ exports.colors = [
    6,
    2,
    3,
    4,
    5,
    1
];
try {
    // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
    // eslint-disable-next-line import/no-extraneous-dependencies
    const supportsColor = __webpack_require__(12662);
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
            20,
            21,
            26,
            27,
            32,
            33,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            56,
            57,
            62,
            63,
            68,
            69,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            92,
            93,
            98,
            99,
            112,
            113,
            128,
            129,
            134,
            135,
            148,
            149,
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            178,
            179,
            184,
            185,
            196,
            197,
            198,
            199,
            200,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            214,
            215,
            220,
            221
        ];
    }
} catch (error) {
// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}
/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */ exports.inspectOpts = Object.keys(process.env).filter((key)=>{
    return /^debug_/i.test(key);
}).reduce((obj, key)=>{
    // Camel-case
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k)=>{
        return k.toUpperCase();
    });
    // Coerce string value into JS value
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
    } else if (val === "null") {
        val = null;
    } else {
        val = Number(val);
    }
    obj[prop] = val;
    return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */ function useColors() {
    return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    const { namespace: name, useColors } = this;
    if (useColors) {
        const c = this.color;
        const colorCode = "\x1b[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \u001B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1b[0m");
    } else {
        args[0] = getDate() + name + " " + args[0];
    }
}
function getDate() {
    if (exports.inspectOpts.hideDate) {
        return "";
    }
    return new Date().toISOString() + " ";
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */ function log(...args) {
    return process.stderr.write(util.format(...args) + "\n");
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    if (namespaces) {
        process.env.DEBUG = namespaces;
    } else {
        // If you set a process.env field to null or undefined, it gets cast to the
        // string 'null' or 'undefined'. Just delete instead.
        delete process.env.DEBUG;
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */ function init(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(exports.inspectOpts);
    for(let i = 0; i < keys.length; i++){
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
}
module.exports = __webpack_require__(71006)(exports);
const { formatters } = module.exports;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */ formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split("\n").map((str)=>str.trim()).join(" ");
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */ formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ 24686:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var debug;
module.exports = function() {
    if (!debug) {
        try {
            /* eslint global-require: off */ debug = __webpack_require__(63694)("follow-redirects");
        } catch (error) {}
        if (typeof debug !== "function") {
            debug = function() {};
        }
    }
    debug.apply(null, arguments);
};


/***/ }),

/***/ 2725:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var url = __webpack_require__(57310);
var URL = url.URL;
var http = __webpack_require__(13685);
var https = __webpack_require__(95687);
var Writable = (__webpack_require__(12781).Writable);
var assert = __webpack_require__(39491);
var debug = __webpack_require__(24686);
// Whether to use the native URL object or the legacy url module
var useNativeURL = false;
try {
    assert(new URL());
} catch (error) {
    useNativeURL = error.code === "ERR_INVALID_URL";
}
// URL fields to preserve in copy operations
var preservedUrlFields = [
    "auth",
    "host",
    "hostname",
    "href",
    "path",
    "pathname",
    "port",
    "protocol",
    "query",
    "search",
    "hash"
];
// Create handlers that pass events from native requests
var events = [
    "abort",
    "aborted",
    "connect",
    "error",
    "socket",
    "timeout"
];
var eventHandlers = Object.create(null);
events.forEach(function(event) {
    eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
    };
});
// Error types with codes
var InvalidUrlError = createErrorType("ERR_INVALID_URL", "Invalid URL", TypeError);
var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed");
var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded", RedirectionError);
var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
// istanbul ignore next
var destroy = Writable.prototype.destroy || noop;
// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
    // Initialize the request
    Writable.call(this);
    this._sanitizeOptions(options);
    this._options = options;
    this._ended = false;
    this._ending = false;
    this._redirectCount = 0;
    this._redirects = [];
    this._requestBodyLength = 0;
    this._requestBodyBuffers = [];
    // Attach a callback if passed
    if (responseCallback) {
        this.on("response", responseCallback);
    }
    // React to responses of native requests
    var self = this;
    this._onNativeResponse = function(response) {
        try {
            self._processResponse(response);
        } catch (cause) {
            self.emit("error", cause instanceof RedirectionError ? cause : new RedirectionError({
                cause: cause
            }));
        }
    };
    // Perform the first request
    this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);
RedirectableRequest.prototype.abort = function() {
    destroyRequest(this._currentRequest);
    this._currentRequest.abort();
    this.emit("abort");
};
RedirectableRequest.prototype.destroy = function(error) {
    destroyRequest(this._currentRequest, error);
    destroy.call(this, error);
    return this;
};
// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function(data, encoding, callback) {
    // Writing is not allowed if end has been called
    if (this._ending) {
        throw new WriteAfterEndError();
    }
    // Validate input and shift parameters if necessary
    if (!isString(data) && !isBuffer(data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
    }
    if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
    }
    // Ignore empty buffers, since writing them doesn't invoke the callback
    // https://github.com/nodejs/node/issues/22066
    if (data.length === 0) {
        if (callback) {
            callback();
        }
        return;
    }
    // Only write when we don't exceed the maximum body length
    if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({
            data: data,
            encoding: encoding
        });
        this._currentRequest.write(data, encoding, callback);
    } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
    }
};
// Ends the current native request
RedirectableRequest.prototype.end = function(data, encoding, callback) {
    // Shift parameters if necessary
    if (isFunction(data)) {
        callback = data;
        data = encoding = null;
    } else if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
    }
    // Write data if needed and end
    if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
    } else {
        var self = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
            self._ended = true;
            currentRequest.end(null, null, callback);
        });
        this._ending = true;
    }
};
// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function(name, value) {
    this._options.headers[name] = value;
    this._currentRequest.setHeader(name, value);
};
// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function(name) {
    delete this._options.headers[name];
    this._currentRequest.removeHeader(name);
};
// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
    var self = this;
    // Destroys the socket on timeout
    function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
    }
    // Sets up a timer to trigger a timeout event
    function startTimer(socket) {
        if (self._timeout) {
            clearTimeout(self._timeout);
        }
        self._timeout = setTimeout(function() {
            self.emit("timeout");
            clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
    }
    // Stops a timeout from triggering
    function clearTimer() {
        // Clear the timeout
        if (self._timeout) {
            clearTimeout(self._timeout);
            self._timeout = null;
        }
        // Clean up all attached listeners
        self.removeListener("abort", clearTimer);
        self.removeListener("error", clearTimer);
        self.removeListener("response", clearTimer);
        self.removeListener("close", clearTimer);
        if (callback) {
            self.removeListener("timeout", callback);
        }
        if (!self.socket) {
            self._currentRequest.removeListener("socket", startTimer);
        }
    }
    // Attach callback if passed
    if (callback) {
        this.on("timeout", callback);
    }
    // Start the timer if or when the socket is opened
    if (this.socket) {
        startTimer(this.socket);
    } else {
        this._currentRequest.once("socket", startTimer);
    }
    // Clean up on events
    this.on("socket", destroyOnTimeout);
    this.on("abort", clearTimer);
    this.on("error", clearTimer);
    this.on("response", clearTimer);
    this.on("close", clearTimer);
    return this;
};
// Proxy all other public ClientRequest methods
[
    "flushHeaders",
    "getHeader",
    "setNoDelay",
    "setSocketKeepAlive"
].forEach(function(method) {
    RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
    };
});
// Proxy all public ClientRequest properties
[
    "aborted",
    "connection",
    "socket"
].forEach(function(property) {
    Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
            return this._currentRequest[property];
        }
    });
});
RedirectableRequest.prototype._sanitizeOptions = function(options) {
    // Ensure headers are always present
    if (!options.headers) {
        options.headers = {};
    }
    // Since http.request treats host as an alias of hostname,
    // but the url module interprets host as hostname plus port,
    // eliminate the host property to avoid confusion.
    if (options.host) {
        // Use hostname if set, because it has precedence
        if (!options.hostname) {
            options.hostname = options.host;
        }
        delete options.host;
    }
    // Complete the URL object when necessary
    if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
            options.pathname = options.path;
        } else {
            options.pathname = options.path.substring(0, searchPos);
            options.search = options.path.substring(searchPos);
        }
    }
};
// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function() {
    // Load the native protocol
    var protocol = this._options.protocol;
    var nativeProtocol = this._options.nativeProtocols[protocol];
    if (!nativeProtocol) {
        throw new TypeError("Unsupported protocol " + protocol);
    }
    // If specified, use the agent corresponding to the protocol
    // (HTTP and HTTPS use different types of agents)
    if (this._options.agents) {
        var scheme = protocol.slice(0, -1);
        this._options.agent = this._options.agents[scheme];
    }
    // Create the native request and set up its event handlers
    var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
    request._redirectable = this;
    for (var event of events){
        request.on(event, eventHandlers[event]);
    }
    // RFC7230§5.3.1: When making a request directly to an origin server, […]
    // a client MUST send only the absolute path […] as the request-target.
    this._currentUrl = /^\//.test(this._options.path) ? url.format(this._options) : // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._options.path;
    // End a redirected request
    // (The first request must be ended explicitly with RedirectableRequest#end)
    if (this._isRedirect) {
        // Write the request entity and end
        var i = 0;
        var self = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
            // Only write if this request has not been redirected yet
            /* istanbul ignore else */ if (request === self._currentRequest) {
                // Report any write errors
                /* istanbul ignore if */ if (error) {
                    self.emit("error", error);
                } else if (i < buffers.length) {
                    var buffer = buffers[i++];
                    /* istanbul ignore else */ if (!request.finished) {
                        request.write(buffer.data, buffer.encoding, writeNext);
                    }
                } else if (self._ended) {
                    request.end();
                }
            }
        })();
    }
};
// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function(response) {
    // Store the redirected response
    var statusCode = response.statusCode;
    if (this._options.trackRedirects) {
        this._redirects.push({
            url: this._currentUrl,
            headers: response.headers,
            statusCode: statusCode
        });
    }
    // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
    // that further action needs to be taken by the user agent in order to
    // fulfill the request. If a Location header field is provided,
    // the user agent MAY automatically redirect its request to the URI
    // referenced by the Location field value,
    // even if the specific status code is not understood.
    // If the response is not a redirect; return it as-is
    var location = response.headers.location;
    if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        // Clean up
        this._requestBodyBuffers = [];
        return;
    }
    // The response is a redirect, so abort the current request
    destroyRequest(this._currentRequest);
    // Discard the remainder of the response to avoid waiting for data
    response.destroy();
    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
        throw new TooManyRedirectsError();
    }
    // Store the request headers if applicable
    var requestHeaders;
    var beforeRedirect = this._options.beforeRedirect;
    if (beforeRedirect) {
        requestHeaders = Object.assign({
            // The Host header was set by nativeProtocol.request
            Host: response.req.getHeader("host")
        }, this._options.headers);
    }
    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.
    var method = this._options.method;
    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
    // the server is redirecting the user agent to a different resource […]
    // A user agent can perform a retrieval request targeting that URI
    // (a GET or HEAD request if using HTTP) […]
    statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        // Drop a possible entity and headers related to it
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
    }
    // Drop the Host header, as the redirect might lead to a different host
    var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
    // If the redirect is relative, carry over the host of the last request
    var currentUrlParts = parseUrl(this._currentUrl);
    var currentHost = currentHostHeader || currentUrlParts.host;
    var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, {
        host: currentHost
    }));
    // Create the redirected request
    var redirectUrl = resolveUrl(location, currentUrl);
    debug("redirecting to", redirectUrl.href);
    this._isRedirect = true;
    spreadUrlObject(redirectUrl, this._options);
    // Drop confidential headers when redirecting to a less secure protocol
    // or to a different domain that is not a superdomain
    if (redirectUrl.protocol !== currentUrlParts.protocol && redirectUrl.protocol !== "https:" || redirectUrl.host !== currentHost && !isSubdomain(redirectUrl.host, currentHost)) {
        removeMatchingHeaders(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers);
    }
    // Evaluate the beforeRedirect callback
    if (isFunction(beforeRedirect)) {
        var responseDetails = {
            headers: response.headers,
            statusCode: statusCode
        };
        var requestDetails = {
            url: currentUrl,
            method: method,
            headers: requestHeaders
        };
        beforeRedirect(this._options, responseDetails, requestDetails);
        this._sanitizeOptions(this._options);
    }
    // Perform the redirected request
    this._performRequest();
};
// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
    // Default settings
    var exports = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
    };
    // Wrap each protocol
    var nativeProtocols = {};
    Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);
        // Executes a request, following redirects
        function request(input, options, callback) {
            // Parse parameters, ensuring that input is an object
            if (isURL(input)) {
                input = spreadUrlObject(input);
            } else if (isString(input)) {
                input = spreadUrlObject(parseUrl(input));
            } else {
                callback = options;
                options = validateUrl(input);
                input = {
                    protocol: protocol
                };
            }
            if (isFunction(options)) {
                callback = options;
                options = null;
            }
            // Set defaults
            options = Object.assign({
                maxRedirects: exports.maxRedirects,
                maxBodyLength: exports.maxBodyLength
            }, input, options);
            options.nativeProtocols = nativeProtocols;
            if (!isString(options.host) && !isString(options.hostname)) {
                options.hostname = "::1";
            }
            assert.equal(options.protocol, protocol, "protocol mismatch");
            debug("options", options);
            return new RedirectableRequest(options, callback);
        }
        // Executes a GET request, following redirects
        function get(input, options, callback) {
            var wrappedRequest = wrappedProtocol.request(input, options, callback);
            wrappedRequest.end();
            return wrappedRequest;
        }
        // Expose the properties on the wrapped protocol
        Object.defineProperties(wrappedProtocol, {
            request: {
                value: request,
                configurable: true,
                enumerable: true,
                writable: true
            },
            get: {
                value: get,
                configurable: true,
                enumerable: true,
                writable: true
            }
        });
    });
    return exports;
}
function noop() {}
function parseUrl(input) {
    var parsed;
    /* istanbul ignore else */ if (useNativeURL) {
        parsed = new URL(input);
    } else {
        // Ensure the URL is valid and absolute
        parsed = validateUrl(url.parse(input));
        if (!isString(parsed.protocol)) {
            throw new InvalidUrlError({
                input
            });
        }
    }
    return parsed;
}
function resolveUrl(relative, base) {
    /* istanbul ignore next */ return useNativeURL ? new URL(relative, base) : parseUrl(url.resolve(base, relative));
}
function validateUrl(input) {
    if (/^\[/.test(input.hostname) && !/^\[[:0-9a-f]+\]$/i.test(input.hostname)) {
        throw new InvalidUrlError({
            input: input.href || input
        });
    }
    if (/^\[/.test(input.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(input.host)) {
        throw new InvalidUrlError({
            input: input.href || input
        });
    }
    return input;
}
function spreadUrlObject(urlObject, target) {
    var spread = target || {};
    for (var key of preservedUrlFields){
        spread[key] = urlObject[key];
    }
    // Fix IPv6 hostname
    if (spread.hostname.startsWith("[")) {
        spread.hostname = spread.hostname.slice(1, -1);
    }
    // Ensure port is a number
    if (spread.port !== "") {
        spread.port = Number(spread.port);
    }
    // Concatenate path
    spread.path = spread.search ? spread.pathname + spread.search : spread.pathname;
    return spread;
}
function removeMatchingHeaders(regex, headers) {
    var lastValue;
    for(var header in headers){
        if (regex.test(header)) {
            lastValue = headers[header];
            delete headers[header];
        }
    }
    return lastValue === null || typeof lastValue === "undefined" ? undefined : String(lastValue).trim();
}
function createErrorType(code, message, baseClass) {
    // Create constructor
    function CustomError(properties) {
        Error.captureStackTrace(this, this.constructor);
        Object.assign(this, properties || {});
        this.code = code;
        this.message = this.cause ? message + ": " + this.cause.message : message;
    }
    // Attach constructor and set default properties
    CustomError.prototype = new (baseClass || Error)();
    Object.defineProperties(CustomError.prototype, {
        constructor: {
            value: CustomError,
            enumerable: false
        },
        name: {
            value: "Error [" + code + "]",
            enumerable: false
        }
    });
    return CustomError;
}
function destroyRequest(request, error) {
    for (var event of events){
        request.removeListener(event, eventHandlers[event]);
    }
    request.on("error", noop);
    request.destroy(error);
}
function isSubdomain(subdomain, domain) {
    assert(isString(subdomain) && isString(domain));
    var dot = subdomain.length - domain.length - 1;
    return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
}
function isString(value) {
    return typeof value === "string" || value instanceof String;
}
function isFunction(value) {
    return typeof value === "function";
}
function isBuffer(value) {
    return typeof value === "object" && "length" in value;
}
function isURL(value) {
    return URL && value instanceof URL;
}
// Exports
module.exports = wrap({
    http: http,
    https: https
});
module.exports.wrap = wrap;


/***/ }),

/***/ 29864:
/***/ ((module) => {


module.exports = (flag, argv = process.argv)=>{
    const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
    const position = argv.indexOf(prefix + flag);
    const terminatorPosition = argv.indexOf("--");
    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};


/***/ }),

/***/ 6034:
/***/ ((module) => {

/**
 * Helpers.
 */ 
var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
        return parse(val);
    } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function parse(str) {
    str = String(str);
    if (str.length > 100) {
        return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
        return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch(type){
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
            return n * y;
        case "weeks":
        case "week":
        case "w":
            return n * w;
        case "days":
        case "day":
        case "d":
            return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return Math.round(ms / d) + "d";
    }
    if (msAbs >= h) {
        return Math.round(ms / h) + "h";
    }
    if (msAbs >= m) {
        return Math.round(ms / m) + "m";
    }
    if (msAbs >= s) {
        return Math.round(ms / s) + "s";
    }
    return ms + "ms";
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
    }
    if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
    }
    if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
    }
    if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
    }
    return ms + " ms";
}
/**
 * Pluralization helper.
 */ function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}


/***/ }),

/***/ 26171:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __extends = (void 0) && (void 0).__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var BaseClient_1 = __webpack_require__(68391);
var models_1 = __webpack_require__(11659);
var models_2 = __webpack_require__(11659);
var AccountClient = /** @class */ function(_super) {
    __extends(AccountClient, _super);
    /**
     * Create a new AccountClient
     * @param accountToken The account token that should be used with requests.
     * @param configOptions Various options to customize client behavior.
     */ function AccountClient(accountToken, configOptions) {
        return _super.call(this, accountToken, models_1.ClientOptions.AuthHeaderNames.ACCOUNT_TOKEN, configOptions) || this;
    }
    /**
     * Retrieve a list of Servers.
     *
     * @param filter - An optional filter for which data is retrieved.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.getServers = function(filter, callback) {
        if (filter === void 0) {
            filter = new models_2.ServerFilteringParameters();
        }
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.GET, "/servers", filter, callback);
    };
    /**
     * Retrieve a single server by ID.
     *
     * @param id - The ID of the Server for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.getServer = function(id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.GET, "/servers/".concat(id), {}, callback);
    };
    /**
     * Create a new Server.
     *
     * @param options - The options to be used to create new Server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.createServer = function(options, callback) {
        return this.processRequestWithBody(models_1.ClientOptions.HttpMethod.POST, "/servers", options, callback);
    };
    /**
     * Modify the Server associated with this Client.
     *
     * @param id - The ID of the Server you wish to update.
     * @param options - The options to be used to create new Server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.editServer = function(id, options, callback) {
        return this.processRequestWithBody(models_1.ClientOptions.HttpMethod.PUT, "/servers/".concat(id), options, callback);
    };
    /**
     * Modify the Server associated with this Client.
     *
     * @param id - The ID of the Domain you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.deleteServer = function(id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.DELETE, "/servers/".concat(id), {}, callback);
    };
    /**
     * Retrieve a batch of Domains.
     *
     * @param filter - An optional filter for which data is retrieved.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.getDomains = function(filter, callback) {
        if (filter === void 0) {
            filter = new models_1.FilteringParameters();
        }
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.GET, "/domains", filter, callback);
    };
    /**
     * Retrieve a single Domain by ID.
     *
     * @param id - The ID of the Domain for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.getDomain = function(id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.GET, "/domains/".concat(id), {}, callback);
    };
    /**
     * Create a new Domain.
     *
     * @param options - The options to be used to create new Domain.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.createDomain = function(options, callback) {
        return this.processRequestWithBody(models_1.ClientOptions.HttpMethod.POST, "/domains/", options, callback);
    };
    /**
     * Update a Domain.
     *
     * @param id - The ID of the Domain you wish to update.
     * @param domain - The values on the Domain you wish to update.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.editDomain = function(id, options, callback) {
        return this.processRequestWithBody(models_1.ClientOptions.HttpMethod.PUT, "/domains/".concat(id), options, callback);
    };
    /**
     * Delete a Domain.
     *
     * @param id - The ID of the Domain you wish to delete.
     * @param options - The options to be used in create Domain.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.deleteDomain = function(id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.DELETE, "/domains/".concat(id), {}, callback);
    };
    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.verifyDomainDKIM = function(id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.PUT, "/domains/".concat(id, "/verifyDKIM"), {}, callback);
    };
    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.verifyDomainReturnPath = function(id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.PUT, "/domains/".concat(id, "/verifyReturnPath"), {}, callback);
    };
    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.verifyDomainSPF = function(id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.POST, "/domains/".concat(id, "/verifySPF"), {}, callback);
    };
    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.rotateDomainDKIM = function(id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.POST, "/domains/".concat(id, "/rotateDKIM"), {}, callback);
    };
    /**
     * Retrieve a single Sender Signature by ID.
     *
     * @param id - The ID of the Sender Signature for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.getSenderSignature = function(id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.GET, "/senders/".concat(id), {}, callback);
    };
    /**
     * Retrieve a batch of Sender Signatures.
     *
     * @param filter - An optional filter for which data is retrieved.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.getSenderSignatures = function(filter, callback) {
        if (filter === void 0) {
            filter = new models_1.FilteringParameters();
        }
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.GET, "/senders", filter, callback);
    };
    /**
     * Create a new Sender Signature.
     *
     * @param options - The options to be used to create new Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.createSenderSignature = function(options, callback) {
        return this.processRequestWithBody(models_1.ClientOptions.HttpMethod.POST, "/senders/", options, callback);
    };
    /**
     * Update a Sender Signature.
     *
     * @param id - The ID of the Sender Signature for which you wish to update.
     * @param options - The values on the Sender Signature you wish to update.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.editSenderSignature = function(id, options, callback) {
        return this.processRequestWithBody(models_1.ClientOptions.HttpMethod.PUT, "/senders/".concat(id), options, callback);
    };
    /**
     * Delete a Domain.
     *
     * @param id - The ID of the Domain you wish to delete.
     * @param options - The options to be used in create Domain.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.deleteSenderSignature = function(id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.DELETE, "/senders/".concat(id), {}, callback);
    };
    /**
     * Request a new confirmation email to be sent to the email address associated with a Sender Signature.
     *
     * @param id - The ID of the Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.resendSenderSignatureConfirmation = function(id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.POST, "/senders/".concat(id, "/resend"), {}, callback);
    };
    /**
     * Request that the SPF records for Sender Signature be verified.
     *
     * @param id - The ID of the Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.verifySenderSignatureSPF = function(id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.POST, "/senders/".concat(id, "/verifySpf"), {}, callback);
    };
    /**
     * Request that the SPF records for Sender Signature be verified.
     *
     * @param id - The ID of the Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.requestNewDKIMForSenderSignature = function(id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.POST, "/senders/".concat(id, "/requestNewDkim"), {}, callback);
    };
    /**
     * Request a push of templates from one server to another.
     *
     * @param options - details for pushing templates from one place to another.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.pushTemplates = function(options, callback) {
        return this.processRequestWithBody(models_1.ClientOptions.HttpMethod.PUT, "/templates/push", options, callback);
    };
    /**
     * Request a data removal.
     *
     * @param options - details for creating data removal request
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.requestDataRemoval = function(options, callback) {
        return this.processRequestWithBody(models_1.ClientOptions.HttpMethod.POST, "/data-removals", options, callback);
    };
    /**
     * Retrieve a single data removal status by ID.
     *
     * @param id - The ID of the DataRemoval for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ AccountClient.prototype.getDataRemovalStatus = function(id, callback) {
        return this.processRequestWithoutBody(models_1.ClientOptions.HttpMethod.GET, "/data-removals/".concat(id), {}, callback);
    };
    return AccountClient;
}(BaseClient_1.default);
exports["default"] = AccountClient; //# sourceMappingURL=AccountClient.js.map


/***/ }),

/***/ 68391:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var ErrorHandler_1 = __webpack_require__(65199);
var HttpClient_1 = __webpack_require__(57691);
var packageJson = __webpack_require__(54055);
var CLIENT_VERSION = packageJson.version;
/**
 * Base client class from which client classes can be implemented, in our case, AccountClient and ServerClient classes.
 * This class is NOT intended to be instantiated directly.
 */ var BaseClient = /** @class */ function() {
    function BaseClient(token, authHeader, configOptions) {
        this.errorHandler = new ErrorHandler_1.ErrorHandler();
        this.verifyToken(token);
        this.token = token.trim();
        this.authHeader = authHeader;
        this.clientVersion = CLIENT_VERSION;
        this.httpClient = new HttpClient_1.AxiosHttpClient(configOptions);
    }
    BaseClient.prototype.setClientOptions = function(configOptions) {
        this.httpClient.initHttpClient(configOptions);
    };
    BaseClient.prototype.getClientOptions = function() {
        return this.httpClient.clientOptions;
    };
    /**
     * Process http request with sending body - data.
     *
     * @see processRequest for more details.
     */ BaseClient.prototype.processRequestWithBody = function(method, path, body, callback) {
        return this.processRequest(method, path, {}, body, callback);
    };
    /**
     * Process http request without sending body - data.
     *
     * @see processRequest for more details.
     */ BaseClient.prototype.processRequestWithoutBody = function(method, path, queryParameters, callback) {
        if (queryParameters === void 0) {
            queryParameters = {};
        }
        return this.processRequest(method, path, queryParameters, null, callback);
    };
    /**
     * Process request for Postmark ClientOptions.
     *
     * @param method - see processHttpRequest for details
     * @param path - see processHttpRequest for details
     * @param queryParameters - see processHttpRequest for details
     * @param body - see processHttpRequest for details
     * @param callback - callback function to be executed.
     *
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ BaseClient.prototype.processRequest = function(method, path, queryParameters, body, callback) {
        var httpRequest = this.processHttpRequest(method, path, queryParameters, body);
        this.processCallbackRequest(httpRequest, callback);
        return httpRequest;
    };
    /**
     * Process HTTP request.
     *
     * @param method - Which type of http request will be executed.
     * @param path - API URL endpoint.
     * @param queryParameters - Querystring parameters used for http request.
     * @param body - Data sent with http request.
     *
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ BaseClient.prototype.processHttpRequest = function(method, path, queryParameters, body) {
        return this.httpClient.httpRequest(method, path, queryParameters, body, this.getComposedHttpRequestHeaders()).then(function(response) {
            return response;
        }).catch(function(error) {
            return Promise.reject(error);
        });
    };
    /**
     * Process callback function for HTTP request.
     *
     * @param httpRequest - HTTP request for which callback will be executed
     * @param callback - callback function to be executed.
     */ BaseClient.prototype.processCallbackRequest = function(httpRequest, callback) {
        if (callback) {
            httpRequest.then(function(response) {
                return callback(null, response);
            }).catch(function(error) {
                return callback(error, null);
            });
        }
    };
    /**
     * JSON object with default headers sent by HTTP request.
     */ BaseClient.prototype.getComposedHttpRequestHeaders = function() {
        var _a;
        return _a = {}, _a[this.authHeader] = this.token, _a["Accept"] = "application/json", _a["Content-Type"] = "application/json", _a["User-Agent"] = "Postmark.JS - ".concat(this.clientVersion), _a;
    };
    /**
     * Token can't be empty.
     *
     * @param {string} token - HTTP request token
     */ BaseClient.prototype.verifyToken = function(token) {
        if (!token || token.trim() === "") {
            throw this.errorHandler.buildError("A valid API token must be provided.");
        }
    };
    /**
     * Set default values for count and offset when doing filtering with API requests if they are not specified by filter.
     */ BaseClient.prototype.setDefaultPaginationValues = function(filter) {
        filter.count = filter.count || 100;
        filter.offset = filter.offset || 0;
    };
    return BaseClient;
}();
exports["default"] = BaseClient; //# sourceMappingURL=BaseClient.js.map


/***/ }),

/***/ 57691:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __extends = (void 0) && (void 0).__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = (void 0) && (void 0).__assign || function() {
    __assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.AxiosHttpClient = void 0;
var axios_1 = __webpack_require__(11113);
var models_1 = __webpack_require__(11659);
var index_1 = __webpack_require__(28133);
var AxiosHttpClient = /** @class */ function(_super) {
    __extends(AxiosHttpClient, _super);
    function AxiosHttpClient(configOptions) {
        var _this = _super.call(this, configOptions) || this;
        _this.errorHandler = new index_1.ErrorHandler();
        return _this;
    }
    /**
     * Create http client instance with default settings.
     *
     * @return {AxiosInstance}
     */ AxiosHttpClient.prototype.initHttpClient = function(configOptions) {
        this.clientOptions = __assign(__assign({}, models_1.HttpClient.DefaultOptions), configOptions);
        var httpClient = axios_1.default.create({
            baseURL: this.getBaseHttpRequestURL(),
            timeout: this.getRequestTimeoutInMilliseconds(),
            responseType: "json",
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            validateStatus: function(status) {
                return status >= 200 && status < 300;
            }
        });
        httpClient.interceptors.response.use(function(response) {
            return response.data;
        });
        this.client = httpClient;
    };
    /**
     * Process http request.
     *
     * @param method - Which type of http request will be executed.
     * @param path - API URL endpoint.
     * @param queryParameters - Querystring parameters used for http request.
     * @param body - Data sent with http request.
     */ AxiosHttpClient.prototype.httpRequest = function(method, path, queryParameters, body, requestHeaders) {
        var _this = this;
        return this.client.request({
            method: method,
            url: path,
            data: body,
            headers: requestHeaders,
            params: queryParameters
        }).catch(function(errorThrown) {
            return Promise.reject(_this.transformError(errorThrown));
        });
    };
    /**
     * Process callback function for HTTP request.
     *
     * @param error - request error that needs to be transformed to proper Postmark error.
     *
     * @return {PostmarkError} - formatted Postmark error
     */ AxiosHttpClient.prototype.transformError = function(errorThrown) {
        var response = errorThrown.response;
        if (response !== undefined) {
            var status_1 = this.adjustValue(0, response.status);
            var errorCode = this.adjustValue(0, response.data.ErrorCode);
            var message = this.adjustValue(errorThrown.message, response.data.Message);
            return this.errorHandler.buildError(message, errorCode, status_1);
        } else if (errorThrown.message !== undefined) {
            return this.errorHandler.buildError(errorThrown.message);
        } else {
            return this.errorHandler.buildError(JSON.stringify(errorThrown, Object.getOwnPropertyNames(errorThrown)));
        }
    };
    /**
     * Timeout in seconds is adjusted to Axios format.
     *
     * @private
     */ AxiosHttpClient.prototype.getRequestTimeoutInMilliseconds = function() {
        return (this.clientOptions.timeout || 60) * 1000;
    };
    AxiosHttpClient.prototype.adjustValue = function(defaultValue, data) {
        return data === undefined ? defaultValue : data;
    };
    return AxiosHttpClient;
}(models_1.HttpClient);
exports.AxiosHttpClient = AxiosHttpClient; //# sourceMappingURL=HttpClient.js.map


/***/ }),

/***/ 51947:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __extends = (void 0) && (void 0).__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var BaseClient_1 = __webpack_require__(68391);
var index_1 = __webpack_require__(11659);
var index_2 = __webpack_require__(11659);
/**
 * Server client class that can be used to interact with an individual Postmark Server.
 */ var ServerClient = /** @class */ function(_super) {
    __extends(ServerClient, _super);
    /**
     * Create a client.
     *
     * @param serverToken - The token for the server that you wish to interact with.
     * @param configOptions - Options to customize the behavior of the this client.
     */ function ServerClient(serverToken, configOptions) {
        return _super.call(this, serverToken, index_1.ClientOptions.AuthHeaderNames.SERVER_TOKEN, configOptions) || this;
    }
    /** Send a single email message.
     *
     * @param email - Email message to send.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.sendEmail = function(email, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, "/email", email, callback);
    };
    /**
     * Send a batch of email messages.
     *
     * @param emails - An array of messages to send.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.sendEmailBatch = function(emails, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, "/email/batch", emails, callback);
    };
    /**
     * Send a message using a template.
     *
     * @param template - Message you wish to send.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.sendEmailWithTemplate = function(template, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, "/email/withTemplate", template, callback);
    };
    /**
     * Send a batch of template email messages.
     *
     * @param templates - An array of templated messages you wish to send using this Client.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.sendEmailBatchWithTemplates = function(templates, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, "/email/batchWithTemplates", {
            Messages: templates
        }, callback);
    };
    /**
     * Get bounce statistic information for the associated Server.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getDeliveryStatistics = function(callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/deliveryStats", {}, callback);
    };
    /**
     * Get a batch of bounces.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getBounces = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.BounceFilteringParameters();
        }
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/bounces", filter, callback);
    };
    /**
     * Get details for a specific Bounce.
     *
     * @param id - The ID of the Bounce you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getBounce = function(id, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/bounces/".concat(id), {}, callback);
    };
    /**
     * Get a Bounce Dump for a specific Bounce.
     *
     * @param id - The ID of the Bounce for which you wish to retrieve Bounce Dump.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getBounceDump = function(id, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/bounces/".concat(id, "/dump"), {}, callback);
    };
    /**
     * Activate email address that was deactivated due to a Bounce.
     *
     * @param id - The ID of the Bounce for which you wish to activate the associated email.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.activateBounce = function(id, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.PUT, "/bounces/".concat(id, "/activate"), {}, callback);
    };
    /**
     * Get the list of templates associated with this server.
     *
     * @param filter - Optional filtering options.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getTemplates = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.TemplateFilteringParameters();
        }
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/templates", filter, callback);
    };
    /**
     * Get the a specific template associated with this server.
     *
     * @param idOrAlias - ID or alias for the template you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getTemplate = function(idOrAlias, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/templates/".concat(idOrAlias), {}, callback);
    };
    /**
     * Delete a template associated with this server.
     *
     * @param idOrAlias - ID or template alias you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.deleteTemplate = function(idOrAlias, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.DELETE, "/templates/".concat(idOrAlias), {}, callback);
    };
    /**
     * Create a new template on the associated server.
     *
     * @param options - Configuration options to be used to create the Template.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.createTemplate = function(options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, "/templates/", options, callback);
    };
    /**
     * Update a template on the associated server.
     *
     * @param idOrAlias - Id or alias of the template you wish to update.
     * @param options - Template options you wish to update.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.editTemplate = function(idOrAlias, options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.PUT, "/templates/".concat(idOrAlias), options, callback);
    };
    /**
     * Validate template markup to verify that it will be parsed. Also provides a recommended template
     * model to be used when sending using the specified template content.
     *
     * @param options - The template content you wish to validate.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.validateTemplate = function(options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, "/templates/validate", options, callback);
    };
    /**
     * Get the information for the Server associated with this Client.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getServer = function(callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/server", {}, callback);
    };
    /**
     * Modify the Server associated with this Client.
     *
     * @param options - The options you wish to modify.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.editServer = function(options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.PUT, "/server", options, callback);
    };
    /**
     * Get a batch of Outbound Messages.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getOutboundMessages = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.OutboundMessagesFilteringParameters();
        }
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/messages/outbound", filter, callback);
    };
    /**
     * Get details for a specific Outbound Message.
     *
     * @param messageId - The ID of the OutboundMessage you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getOutboundMessageDetails = function(messageId, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/messages/outbound/".concat(messageId), {}, callback);
    };
    /**
     * Get details for a specific Outbound Message.
     *
     * @param messageId - The ID of the OutboundMessage you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getOutboundMessageDump = function(messageId, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/messages/outbound/".concat(messageId, "/dump"), {}, callback);
    };
    /**
     * Get a batch of Inbound Messages.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getInboundMessages = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.InboundMessagesFilteringParameters();
        }
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/messages/inbound", filter, callback);
    };
    /**
     * Get details for a specific Inbound Message.
     *
     * @param messageId - The ID of the Inbound Message you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getInboundMessageDetails = function(messageId, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/messages/inbound/".concat(messageId, "/details"), {}, callback);
    };
    /**
     * Cause an Inbound Message to bypass filtering rules defined on this Client's associated Server.
     *
     * @param messageId - The ID of the Inbound Message for which you wish to bypass the filtering rules.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.bypassBlockedInboundMessage = function(messageId, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.PUT, "/messages/inbound/".concat(messageId, "/bypass"), {}, callback);
    };
    /**
     * Request that Postmark retry POSTing to the Inbound Hook for the specified message.
     *
     * @param messageId - The ID of the Inbound Message for which you wish to retry the inbound hook.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.retryInboundHookForMessage = function(messageId, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.PUT, "/messages/inbound/".concat(messageId, "/retry"), {}, callback);
    };
    /**
     * Get the Opens for Outbound Messages.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getMessageOpens = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.OutboundMessageOpensFilteringParameters();
        }
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/messages/outbound/opens", filter, callback);
    };
    /**
     * Get details of Opens for specific Outbound Message.
     *
     * @param messageId - Message ID of the message for which you wish to retrieve Opens.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getMessageOpensForSingleMessage = function(messageId, filter, callback) {
        if (filter === void 0) {
            filter = new index_2.OutboundMessageOpensFilteringParameters(50, 0);
        }
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/messages/outbound/opens/".concat(messageId), filter, callback);
    };
    /**
     * Get the Clicks for Outbound Messages.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getMessageClicks = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.OutboundMessageClicksFilteringParameters();
        }
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/messages/outbound/clicks", filter, callback);
    };
    /**
     * Get Click information for a single Outbound Message.
     *
     * @param messageId - The MessageID for which clicks should be retrieved.
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getMessageClicksForSingleMessage = function(messageId, filter, callback) {
        if (filter === void 0) {
            filter = new index_2.OutboundMessageClicksFilteringParameters();
        }
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/messages/outbound/clicks/".concat(messageId), filter, callback);
    };
    /**
     * Get overview statistics on Outbound Messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getOutboundOverview = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.StatisticsFilteringParameters();
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/stats/outbound", filter, callback);
    };
    /**
     * Get statistics on email sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getSentCounts = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.StatisticsFilteringParameters();
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/stats/outbound/sends", filter, callback);
    };
    /**
     * Get statistiscs on emails that bounced after being sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getBounceCounts = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.StatisticsFilteringParameters();
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/stats/outbound/bounces", filter, callback);
    };
    /**
     * Get SPAM complaint statistics for email sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getSpamComplaintsCounts = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.StatisticsFilteringParameters();
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/stats/outbound/spam", filter, callback);
    };
    /**
     * Get email tracking statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getTrackedEmailCounts = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.StatisticsFilteringParameters();
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/stats/outbound/tracked", filter, callback);
    };
    /**
     * Get Open statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getEmailOpenCounts = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.StatisticsFilteringParameters();
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/stats/outbound/opens", filter, callback);
    };
    /**
     * Get Email Client Platform statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getEmailOpenPlatformUsage = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.StatisticsFilteringParameters();
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/stats/outbound/opens/platforms", filter, callback);
    };
    /**
     * Get statistics on which Email Clients were used to open messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getEmailOpenClientUsage = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.StatisticsFilteringParameters();
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/stats/outbound/opens/emailClients", filter, callback);
    };
    /**
     * Get Read Time statistics for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getEmailOpenReadTimes = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.StatisticsFilteringParameters();
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/stats/outbound/opens/readTimes", filter, callback);
    };
    /**
     * Get total clicks statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getClickCounts = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.StatisticsFilteringParameters();
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/stats/outbound/clicks", filter, callback);
    };
    /**
     * Get browser family statistics for tracked links for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getClickBrowserUsage = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.StatisticsFilteringParameters();
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/stats/outbound/clicks/browserFamilies", filter, callback);
    };
    /**
     * Get browser platform statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getClickPlatformUsage = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.StatisticsFilteringParameters();
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/stats/outbound/clicks/platforms", filter, callback);
    };
    /**
     * Get click location (in HTML or Text body of the email) statistics for tracked links for messages sent
     * from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getClickLocation = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_2.StatisticsFilteringParameters();
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/stats/outbound/clicks/location", filter, callback);
    };
    /**
     * Create an Inbound Rule Trigger.
     *
     * @param options - Configuration options to be used when creating this Trigger.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.createInboundRuleTrigger = function(options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, "/triggers/inboundRules", options, callback);
    };
    /**
     * Delete an Inbound Rule Trigger.
     *
     * @param id - The ID of the Inbound Rule Trigger you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.deleteInboundRuleTrigger = function(id, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.DELETE, "/triggers/inboundRules/".concat(id), {}, callback);
    };
    /**
     * Get a list of Inbound Rule Triggers.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getInboundRuleTriggers = function(filter, callback) {
        if (filter === void 0) {
            filter = new index_1.FilteringParameters();
        }
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/triggers/inboundRules", filter, callback);
    };
    /**
     * Get the list of Webhooks for specific server.
     *
     * @param filter - Optional filtering parameters
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getWebhooks = function(filter, callback) {
        if (filter === void 0) {
            filter = {};
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/webhooks", filter, callback);
    };
    /**
     * Get details for a specific Webhook.
     *
     * @param id - The ID of the Webhook you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getWebhook = function(id, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/webhooks/".concat(id), {}, callback);
    };
    /**
     * Create a Webhook on the associated server.
     *
     * @param options - Configuration options to be used when creating Webhook trigger.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.createWebhook = function(options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, "/webhooks", options, callback);
    };
    /**
     * Update Webhook on the associated server.
     *
     * @param id - Id of the webhook you wish to update.
     * @param options - Webhook options you wish to update.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.editWebhook = function(id, options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.PUT, "/webhooks/".concat(id), options, callback);
    };
    /**
     * Delete an existing Webhook.
     *
     * @param id - The ID of the Webhook you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.deleteWebhook = function(id, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.DELETE, "/webhooks/".concat(id), {}, callback);
    };
    /**
     * Get the list of message streams on a server.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getMessageStreams = function(filter, callback) {
        if (filter === void 0) {
            filter = {};
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/message-streams", filter, callback);
    };
    /**
     * Get details for a specific message stream on a server.
     *
     * @param id - The ID of the message stream you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getMessageStream = function(id, callback) {
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/message-streams/".concat(id), {}, callback);
    };
    /**
     * Update message stream on the associated server.
     *
     * @param id - Id of the webhook you wish to update.
     * @param options - Webhook options you wish to update.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.editMessageStream = function(id, options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.PATCH, "/message-streams/".concat(id), options, callback);
    };
    /**
     * Create a message stream on the associated server.
     *
     * @param options - Configuration options to be used when creating message stream on the server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.createMessageStream = function(options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, "/message-streams", options, callback);
    };
    /**
     * Archive a message stream on the associated server.
     *
     * @param options - Configuration options to be used when creating message stream on the server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.archiveMessageStream = function(id, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, "/message-streams/".concat(id, "/archive"), {}, callback);
    };
    /**
     * Unarchive a message stream on the associated server.
     *
     * @param options - Configuration options to be used when creating message stream on the server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.unarchiveMessageStream = function(id, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, "/message-streams/".concat(id, "/unarchive"), {}, callback);
    };
    /**
     * Get the list of suppressions for a message stream on a server.
     *
     * @param messageStream - Select message stream
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.getSuppressions = function(messageStream, filter, callback) {
        if (filter === void 0) {
            filter = new index_2.SuppressionFilteringParameters();
        }
        return this.processRequestWithoutBody(index_1.ClientOptions.HttpMethod.GET, "/message-streams/".concat(messageStream, "/suppressions/dump"), filter, callback);
    };
    /**
     * Add email addresses to a suppressions list on a message stream on a server.
     *
     * @param messageStream - Select message stream
     * @param options - Suppressions you wish to add.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.createSuppressions = function(messageStream, options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, "/message-streams/".concat(messageStream, "/suppressions"), options, callback);
    };
    /**
     * Delete email addresses from a suppressions list on a message stream on a server.
     *
     * @param messageStream - Select message stream
     * @param options - Suppressions you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */ ServerClient.prototype.deleteSuppressions = function(messageStream, options, callback) {
        return this.processRequestWithBody(index_1.ClientOptions.HttpMethod.POST, "/message-streams/".concat(messageStream, "/suppressions/delete"), options, callback);
    };
    return ServerClient;
}(BaseClient_1.default);
exports["default"] = ServerClient; //# sourceMappingURL=ServerClient.js.map


/***/ }),

/***/ 65199:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ErrorHandler = void 0;
var Errors = __webpack_require__(21429);
/**
 * Handles general errors and all client request errors.
 * Client response errors are classified so that proper response error is generated.
 */ var ErrorHandler = /** @class */ function() {
    function ErrorHandler() {}
    /**
     * Build general Postmark error.
     *
     * @param errorMessage - error message that needs to be identified and transformed to proper Postmark error.
     *
     * @returns properly formatted Postmark error.
     */ ErrorHandler.prototype.buildError = function(errorMessage, code, statusCode) {
        if (code === void 0) {
            code = 0;
        }
        if (statusCode === void 0) {
            statusCode = 0;
        }
        if (statusCode === 0 && code === 0) {
            return new Errors.PostmarkError(errorMessage);
        } else {
            return this.buildErrorByHttpStatusCode(errorMessage, code, statusCode);
        }
    };
    /**
     * Build Postmark error based on HTTP request status.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */ ErrorHandler.prototype.buildErrorByHttpStatusCode = function(errorMessage, errorCode, errorStatusCode) {
        switch(errorStatusCode){
            case 401:
                return new Errors.InvalidAPIKeyError(errorMessage, errorCode, errorStatusCode);
            case 404:
                return new Errors.PostmarkError(errorMessage, errorCode, errorStatusCode);
            case 422:
                return Errors.ApiInputError.buildSpecificError(errorMessage, errorCode, errorStatusCode);
            case 429:
                return new Errors.RateLimitExceededError(errorMessage, errorCode, errorStatusCode);
            case 500:
                return new Errors.InternalServerError(errorMessage, errorCode, errorStatusCode);
            case 503:
                return new Errors.ServiceUnavailablerError(errorMessage, errorCode, errorStatusCode);
            default:
                return new Errors.UnknownError(errorMessage, errorCode, errorStatusCode);
        }
    };
    return ErrorHandler;
}();
exports.ErrorHandler = ErrorHandler; //# sourceMappingURL=ErrorHandler.js.map


/***/ }),

/***/ 21429:
/***/ ((__unused_webpack_module, exports) => {


var __extends = (void 0) && (void 0).__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.InvalidEmailRequestError = exports.InactiveRecipientsError = exports.ApiInputError = exports.UnknownError = exports.RateLimitExceededError = exports.ServiceUnavailablerError = exports.InternalServerError = exports.InvalidAPIKeyError = exports.HttpError = exports.PostmarkError = void 0;
/**
 * Standard Postmark error on which all sub-errors are based.
 */ var PostmarkError = /** @class */ function(_super) {
    __extends(PostmarkError, _super);
    function PostmarkError(message, code, statusCode) {
        if (code === void 0) {
            code = 0;
        }
        if (statusCode === void 0) {
            statusCode = 0;
        }
        var _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.code = code;
        // this is mandatory due:
        // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(_this, PostmarkError.prototype);
        _this.setUpStackTrace();
        return _this;
    }
    PostmarkError.prototype.setUpStackTrace = function() {
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    };
    return PostmarkError;
}(Error);
exports.PostmarkError = PostmarkError;
var HttpError = /** @class */ function(_super) {
    __extends(HttpError, _super);
    function HttpError(message, code, statusCode) {
        var _this = _super.call(this, message, code, statusCode) || this;
        Object.setPrototypeOf(_this, HttpError.prototype);
        _this.setUpStackTrace();
        return _this;
    }
    return HttpError;
}(PostmarkError);
exports.HttpError = HttpError;
var InvalidAPIKeyError = /** @class */ function(_super) {
    __extends(InvalidAPIKeyError, _super);
    function InvalidAPIKeyError(message, code, statusCode) {
        var _this = _super.call(this, message, code, statusCode) || this;
        Object.setPrototypeOf(_this, InvalidAPIKeyError.prototype);
        _this.setUpStackTrace();
        return _this;
    }
    return InvalidAPIKeyError;
}(HttpError);
exports.InvalidAPIKeyError = InvalidAPIKeyError;
var InternalServerError = /** @class */ function(_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message, code, statusCode) {
        var _this = _super.call(this, message, code, statusCode) || this;
        Object.setPrototypeOf(_this, InternalServerError.prototype);
        _this.setUpStackTrace();
        return _this;
    }
    return InternalServerError;
}(HttpError);
exports.InternalServerError = InternalServerError;
var ServiceUnavailablerError = /** @class */ function(_super) {
    __extends(ServiceUnavailablerError, _super);
    function ServiceUnavailablerError(message, code, statusCode) {
        var _this = _super.call(this, message, code, statusCode) || this;
        Object.setPrototypeOf(_this, ServiceUnavailablerError.prototype);
        _this.setUpStackTrace();
        return _this;
    }
    return ServiceUnavailablerError;
}(HttpError);
exports.ServiceUnavailablerError = ServiceUnavailablerError;
var RateLimitExceededError = /** @class */ function(_super) {
    __extends(RateLimitExceededError, _super);
    function RateLimitExceededError(message, code, statusCode) {
        var _this = _super.call(this, message, code, statusCode) || this;
        Object.setPrototypeOf(_this, RateLimitExceededError.prototype);
        _this.setUpStackTrace();
        return _this;
    }
    return RateLimitExceededError;
}(HttpError);
exports.RateLimitExceededError = RateLimitExceededError;
var UnknownError = /** @class */ function(_super) {
    __extends(UnknownError, _super);
    function UnknownError(message, code, statusCode) {
        var _this = _super.call(this, message, code, statusCode) || this;
        Object.setPrototypeOf(_this, UnknownError.prototype);
        _this.setUpStackTrace();
        return _this;
    }
    return UnknownError;
}(HttpError);
exports.UnknownError = UnknownError;
var ApiInputError = /** @class */ function(_super) {
    __extends(ApiInputError, _super);
    function ApiInputError(message, code, statusCode) {
        var _this = _super.call(this, message, code, statusCode) || this;
        Object.setPrototypeOf(_this, ApiInputError.prototype);
        _this.setUpStackTrace();
        return _this;
    }
    ApiInputError.buildSpecificError = function(message, code, statusCode) {
        switch(code){
            case this.ERROR_CODES.inactiveRecipient:
                return new InactiveRecipientsError(message, code, statusCode);
            case this.ERROR_CODES.invalidEmailRequest:
                return new InvalidEmailRequestError(message, code, statusCode);
            default:
                return new ApiInputError(message, code, statusCode);
        }
    };
    ApiInputError.ERROR_CODES = {
        inactiveRecipient: 406,
        invalidEmailRequest: 300
    };
    return ApiInputError;
}(HttpError);
exports.ApiInputError = ApiInputError;
var InactiveRecipientsError = /** @class */ function(_super) {
    __extends(InactiveRecipientsError, _super);
    function InactiveRecipientsError(message, code, statusCode) {
        var _this = _super.call(this, message, code, statusCode) || this;
        Object.setPrototypeOf(_this, InactiveRecipientsError.prototype);
        _this.setUpStackTrace();
        _this.recipients = InactiveRecipientsError.parseInactiveRecipients(message);
        return _this;
    }
    InactiveRecipientsError.parseInactiveRecipients = function(message) {
        var result = [];
        this.inactiveRecipientsPatterns.some(function(pattern) {
            var regexResult = message.match(pattern);
            if (regexResult !== null) {
                result = regexResult[1].split(",").map(function(element) {
                    return element.trim();
                });
                return result;
            } else {
                result = [];
            }
        });
        return result;
    };
    InactiveRecipientsError.inactiveRecipientsPatterns = [
        /Found inactive addresses: (.+?)\.? Inactive/,
        /these inactive addresses: (.+?)\.?$/
    ];
    return InactiveRecipientsError;
}(ApiInputError);
exports.InactiveRecipientsError = InactiveRecipientsError;
var InvalidEmailRequestError = /** @class */ function(_super) {
    __extends(InvalidEmailRequestError, _super);
    function InvalidEmailRequestError(message, code, statusCode) {
        var _this = _super.call(this, message, code, statusCode) || this;
        Object.setPrototypeOf(_this, InvalidEmailRequestError.prototype);
        _this.setUpStackTrace();
        return _this;
    }
    return InvalidEmailRequestError;
}(ApiInputError);
exports.InvalidEmailRequestError = InvalidEmailRequestError; //# sourceMappingURL=Errors.js.map


/***/ }),

/***/ 28133:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __createBinding = (void 0) && (void 0).__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = (void 0) && (void 0).__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
__exportStar(__webpack_require__(65199), exports);
__exportStar(__webpack_require__(21429), exports); //# sourceMappingURL=index.js.map


/***/ }),

/***/ 22717:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=Bounce.js.map


/***/ }),

/***/ 29208:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __extends = (void 0) && (void 0).__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.BounceFilteringParameters = exports.BounceType = void 0;
var FilteringParameters_1 = __webpack_require__(35210);
var BounceType;
(function(BounceType) {
    BounceType["HardBounce"] = "HardBounce";
    BounceType["Transient"] = "Transient";
    BounceType["Unsubscribe"] = "Unsubscribe";
    BounceType["Subscribe"] = "Subscribe";
    BounceType["AutoResponder"] = "AutoResponder";
    BounceType["AddressChange"] = "AddressChange";
    BounceType["DnsError"] = "DnsError";
    BounceType["SpamNotification"] = "SpamNotification";
    BounceType["OpenRelayTest"] = "OpenRelayTest";
    BounceType["Unknown"] = "Unknown";
    BounceType["SoftBounce"] = "SoftBounce";
    BounceType["VirusNotification"] = "VirusNotification";
    BounceType["ChallengeVerification"] = "ChallengeVerification";
    BounceType["BadEmailAddress"] = "BadEmailAddress";
    BounceType["SpamComplaint"] = "SpamComplaint";
    BounceType["ManuallyDeactivated"] = "ManuallyDeactivated";
    BounceType["Unconfirmed"] = "Unconfirmed";
    BounceType["Blocked"] = "Blocked";
    BounceType["SMTPApiError"] = "SMTPApiError";
    BounceType["InboundError"] = "InboundError";
    BounceType["DMARCPolicy"] = "DMARCPolicy";
    BounceType["TemplateRenderingFailed"] = "TemplateRenderingFailed";
})(BounceType = exports.BounceType || (exports.BounceType = {}));
/**
 * Describes filtering parameters that can be used when retrieving bounces.
 * When pagination parameters are not specified, default values are set.
 */ var BounceFilteringParameters = /** @class */ function(_super) {
    __extends(BounceFilteringParameters, _super);
    function BounceFilteringParameters(count, offset, type, inactive, emailFilter, tag, messageID, fromDate, toDate, messageStream) {
        if (count === void 0) {
            count = 100;
        }
        if (offset === void 0) {
            offset = 0;
        }
        var _this = _super.call(this, count, offset) || this;
        _this.type = type;
        _this.inactive = inactive;
        _this.emailFilter = emailFilter;
        _this.tag = tag;
        _this.messageID = messageID;
        _this.fromDate = fromDate;
        _this.toDate = toDate;
        _this.messageStream = messageStream;
        return _this;
    }
    return BounceFilteringParameters;
}(FilteringParameters_1.FilteringParameters);
exports.BounceFilteringParameters = BounceFilteringParameters; //# sourceMappingURL=BounceFilteringParameters.js.map


/***/ }),

/***/ 41190:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=Callback.js.map


/***/ }),

/***/ 40051:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ClientOptions = void 0;
var ClientOptions;
(function(ClientOptions) {
    var Configuration = /** @class */ function() {
        function Configuration(useHttps, requestHost, timeout) {
            this.useHttps = useHttps;
            this.requestHost = requestHost;
            this.timeout = timeout;
        }
        return Configuration;
    }();
    ClientOptions.Configuration = Configuration;
    var HttpMethod;
    (function(HttpMethod) {
        HttpMethod["GET"] = "GET";
        HttpMethod["POST"] = "POST";
        HttpMethod["DELETE"] = "DELETE";
        HttpMethod["PUT"] = "PUT";
        HttpMethod["OPTIONS"] = "OPTIONS";
        HttpMethod["HEAD"] = "HEAD";
        HttpMethod["PATCH"] = "PATCH";
    })(HttpMethod = ClientOptions.HttpMethod || (ClientOptions.HttpMethod = {}));
    var AuthHeaderNames;
    (function(AuthHeaderNames) {
        AuthHeaderNames["SERVER_TOKEN"] = "X-Postmark-Server-Token";
        AuthHeaderNames["ACCOUNT_TOKEN"] = "X-Postmark-Account-Token";
    })(AuthHeaderNames = ClientOptions.AuthHeaderNames || (ClientOptions.AuthHeaderNames = {}));
})(ClientOptions = exports.ClientOptions || (exports.ClientOptions = {})); //# sourceMappingURL=ClientOptions.js.map


/***/ }),

/***/ 14727:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=DefaultResponse.js.map


/***/ }),

/***/ 35210:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.FilteringParameters = void 0;
/**
 * Describes default filtering parameters that can be used.
 * When pagination parameters are not specified, default values are set.
 */ var FilteringParameters = /** @class */ function() {
    function FilteringParameters(count, offset) {
        if (count === void 0) {
            count = 100;
        }
        if (offset === void 0) {
            offset = 0;
        }
        this.count = count;
        this.offset = offset;
    }
    return FilteringParameters;
}();
exports.FilteringParameters = FilteringParameters; //# sourceMappingURL=FilteringParameters.js.map


/***/ }),

/***/ 54251:
/***/ ((__unused_webpack_module, exports) => {


var __assign = (void 0) && (void 0).__assign || function() {
    __assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.HttpClient = void 0;
var HttpClient = /** @class */ function() {
    function HttpClient(configOptions) {
        this.clientOptions = __assign(__assign({}, HttpClient.DefaultOptions), configOptions);
        this.initHttpClient(this.clientOptions);
    }
    HttpClient.prototype.getBaseHttpRequestURL = function() {
        var scheme = this.clientOptions.useHttps ? "https" : "http";
        return "".concat(scheme, "://").concat(this.clientOptions.requestHost);
    };
    /**
     * Http Client connection configuration options.
     * You may modify these values and new clients will use them.
     * Any values provided to a Client constructor will override default options.
     */ HttpClient.DefaultOptions = {
        useHttps: true,
        requestHost: "api.postmarkapp.com",
        timeout: 180
    };
    return HttpClient;
}();
exports.HttpClient = HttpClient; //# sourceMappingURL=HttpClient.js.map


/***/ }),

/***/ 53092:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=SupportingTypes.js.map


/***/ }),

/***/ 53756:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.DataRemovalRequest = exports.DataRemovalStatusTypes = void 0;
var DataRemovalStatusTypes;
(function(DataRemovalStatusTypes) {
    DataRemovalStatusTypes["Pending"] = "Pending";
    DataRemovalStatusTypes["Done"] = "Done";
})(DataRemovalStatusTypes = exports.DataRemovalStatusTypes || (exports.DataRemovalStatusTypes = {}));
var DataRemovalRequest = /** @class */ function() {
    function DataRemovalRequest(requestedBy, requestedFor, notifyWhenCompleted) {
        this.RequestedBy = requestedBy;
        this.RequestedFor = requestedFor;
        this.NotifyWhenCompleted = notifyWhenCompleted;
    }
    return DataRemovalRequest;
}();
exports.DataRemovalRequest = DataRemovalRequest; //# sourceMappingURL=DataRemovals.js.map


/***/ }),

/***/ 64246:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.UpdateDomainRequest = exports.CreateDomainRequest = void 0;
var CreateDomainRequest = /** @class */ function() {
    function CreateDomainRequest(Name, ReturnPathDomain) {
        this.Name = Name;
        this.ReturnPathDomain = ReturnPathDomain;
    }
    return CreateDomainRequest;
}();
exports.CreateDomainRequest = CreateDomainRequest;
var UpdateDomainRequest = /** @class */ function() {
    function UpdateDomainRequest(ReturnPathDomain) {
        this.ReturnPathDomain = ReturnPathDomain;
    }
    return UpdateDomainRequest;
}();
exports.UpdateDomainRequest = UpdateDomainRequest; //# sourceMappingURL=Domain.js.map


/***/ }),

/***/ 11659:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __createBinding = (void 0) && (void 0).__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = (void 0) && (void 0).__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
__exportStar(__webpack_require__(40051), exports);
__exportStar(__webpack_require__(53092), exports);
__exportStar(__webpack_require__(54251), exports);
__exportStar(__webpack_require__(41190), exports);
__exportStar(__webpack_require__(14727), exports);
__exportStar(__webpack_require__(35210), exports);
__exportStar(__webpack_require__(22717), exports);
__exportStar(__webpack_require__(29208), exports);
__exportStar(__webpack_require__(76275), exports);
__exportStar(__webpack_require__(42589), exports);
__exportStar(__webpack_require__(41598), exports);
__exportStar(__webpack_require__(3702), exports);
__exportStar(__webpack_require__(94763), exports);
__exportStar(__webpack_require__(45970), exports);
__exportStar(__webpack_require__(93367), exports);
__exportStar(__webpack_require__(43426), exports);
__exportStar(__webpack_require__(17251), exports);
__exportStar(__webpack_require__(76649), exports);
__exportStar(__webpack_require__(64804), exports);
__exportStar(__webpack_require__(64246), exports);
__exportStar(__webpack_require__(25280), exports);
__exportStar(__webpack_require__(5149), exports);
__exportStar(__webpack_require__(6182), exports);
__exportStar(__webpack_require__(78991), exports);
__exportStar(__webpack_require__(13037), exports);
__exportStar(__webpack_require__(94214), exports);
__exportStar(__webpack_require__(82288), exports);
__exportStar(__webpack_require__(15525), exports);
__exportStar(__webpack_require__(2027), exports);
__exportStar(__webpack_require__(32324), exports);
__exportStar(__webpack_require__(81413), exports);
__exportStar(__webpack_require__(74549), exports);
__exportStar(__webpack_require__(40055), exports);
__exportStar(__webpack_require__(34124), exports);
__exportStar(__webpack_require__(5149), exports);
__exportStar(__webpack_require__(25213), exports);
__exportStar(__webpack_require__(44641), exports);
__exportStar(__webpack_require__(98519), exports);
__exportStar(__webpack_require__(53756), exports); //# sourceMappingURL=index.js.map


/***/ }),

/***/ 76275:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.Message = void 0;
var Message = /** @class */ function() {
    function Message(From, Subject, HtmlBody, TextBody, To, Cc, Bcc, ReplyTo, Tag, TrackOpens, TrackLinks, Headers, Attachments, Metadata) {
        this.From = From;
        this.To = To;
        this.Cc = Cc;
        this.Bcc = Bcc;
        this.Subject = Subject;
        this.ReplyTo = ReplyTo;
        this.HtmlBody = HtmlBody;
        this.TextBody = TextBody;
        this.Tag = Tag;
        this.TrackOpens = TrackOpens;
        this.TrackLinks = TrackLinks;
        this.Headers = Headers;
        this.Attachments = Attachments;
        this.Metadata = Metadata;
    }
    return Message;
}();
exports.Message = Message; //# sourceMappingURL=Message.js.map


/***/ }),

/***/ 42589:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.Attachment = exports.Header = exports.ServerDeliveryTypes = exports.LinkClickLocation = exports.LinkTrackingOptions = void 0;
var LinkTrackingOptions;
(function(LinkTrackingOptions) {
    LinkTrackingOptions["TextOnly"] = "TextOnly";
    LinkTrackingOptions["HtmlOnly"] = "HtmlOnly";
    LinkTrackingOptions["HtmlAndText"] = "HtmlAndText";
    LinkTrackingOptions["None"] = "None";
})(LinkTrackingOptions = exports.LinkTrackingOptions || (exports.LinkTrackingOptions = {}));
var LinkClickLocation;
(function(LinkClickLocation) {
    LinkClickLocation["HTML"] = "HTML";
    LinkClickLocation["Text"] = "Text";
})(LinkClickLocation = exports.LinkClickLocation || (exports.LinkClickLocation = {}));
var ServerDeliveryTypes;
(function(ServerDeliveryTypes) {
    ServerDeliveryTypes["Live"] = "Live";
    ServerDeliveryTypes["Sandbox"] = "Sandbox";
})(ServerDeliveryTypes = exports.ServerDeliveryTypes || (exports.ServerDeliveryTypes = {}));
var Header = /** @class */ function() {
    function Header(Name, Value) {
        this.Name = Name;
        this.Value = Value;
    }
    return Header;
}();
exports.Header = Header;
/**
 * Attachment content
 *
 * @param Name - name of the attachment, for example book.pdf
 * @param Content - Base64 encoded content, for example: fs.readFileSync('/Folder/book.pdf').toString('base64')
 * @param ContentID - id of the attachment, in case we are referencing it, for example: cid:123book.pdf
 * @param ContentType - content type (json, image, etc)
 * @param ContentLength - length of the message
 */ var Attachment = /** @class */ function() {
    function Attachment(Name, Content, ContentType, ContentID, ContentLength) {
        if (ContentID === void 0) {
            ContentID = null;
        }
        this.Name = Name;
        this.Content = Content;
        this.ContentType = ContentType;
        this.ContentID = ContentID;
        this.ContentLength = ContentLength;
    }
    return Attachment;
}();
exports.Attachment = Attachment; //# sourceMappingURL=SupportingTypes.js.map


/***/ }),

/***/ 45970:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=InboundMessage.js.map


/***/ }),

/***/ 93367:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __extends = (void 0) && (void 0).__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.OutboundMessageClicksFilteringParameters = exports.OutboundMessageOpensFilteringParameters = exports.OutboundMessageTrackingFilteringParameters = exports.InboundMessagesFilteringParameters = exports.OutboundMessagesFilteringParameters = exports.InboundMessageStatus = exports.OutboundMessageStatus = void 0;
var FilteringParameters_1 = __webpack_require__(35210);
var OutboundMessageStatus;
(function(OutboundMessageStatus) {
    OutboundMessageStatus["Queued"] = "queued";
    OutboundMessageStatus["Sent"] = "sent";
    OutboundMessageStatus["Processed"] = "processed";
})(OutboundMessageStatus = exports.OutboundMessageStatus || (exports.OutboundMessageStatus = {}));
var InboundMessageStatus;
(function(InboundMessageStatus) {
    InboundMessageStatus["Queued"] = "queued";
    InboundMessageStatus["Sent"] = "sent";
    InboundMessageStatus["Processed"] = "processed";
    InboundMessageStatus["Blocked"] = "blocked";
    InboundMessageStatus["Failed"] = "failed";
    InboundMessageStatus["Scheduled"] = "scheduled";
})(InboundMessageStatus = exports.InboundMessageStatus || (exports.InboundMessageStatus = {}));
/**
 * Describes filtering parameters that can be used when retrieving outbound messages.
 * When pagination parameters are not specified, default values are set.
 */ var OutboundMessagesFilteringParameters = /** @class */ function(_super) {
    __extends(OutboundMessagesFilteringParameters, _super);
    function OutboundMessagesFilteringParameters(count, offset, recipient, fromEmail, tag, status, fromDate, toDate, subject, messageStream) {
        if (count === void 0) {
            count = 100;
        }
        if (offset === void 0) {
            offset = 0;
        }
        var _this = _super.call(this, count, offset) || this;
        _this.recipient = recipient;
        _this.fromEmail = fromEmail;
        _this.tag = tag;
        _this.status = status;
        _this.fromDate = fromDate;
        _this.toDate = toDate;
        _this.subject = subject;
        _this.messageStream = messageStream;
        return _this;
    }
    return OutboundMessagesFilteringParameters;
}(FilteringParameters_1.FilteringParameters);
exports.OutboundMessagesFilteringParameters = OutboundMessagesFilteringParameters;
/**
 * Describes filtering parameters that can be used when retrieving inbound messages.
 * When pagination parameters are not specified, default values are set.
 */ var InboundMessagesFilteringParameters = /** @class */ function(_super) {
    __extends(InboundMessagesFilteringParameters, _super);
    function InboundMessagesFilteringParameters(count, offset, mailboxHash, recipient, fromEmail, tag, status, fromDate, toDate, subject) {
        if (count === void 0) {
            count = 100;
        }
        if (offset === void 0) {
            offset = 0;
        }
        var _this = _super.call(this, count, offset) || this;
        _this.status = status;
        _this.mailboxHash = mailboxHash;
        _this.recipient = recipient;
        _this.fromEmail = fromEmail;
        _this.tag = tag;
        _this.fromDate = fromDate;
        _this.toDate = toDate;
        _this.subject = subject;
        return _this;
    }
    return InboundMessagesFilteringParameters;
}(FilteringParameters_1.FilteringParameters);
exports.InboundMessagesFilteringParameters = InboundMessagesFilteringParameters;
/**
 * Describes filtering parameters that can be used when retrieving tracked outbound messages.
 * When pagination parameters are not specified, default values are set.
 */ var OutboundMessageTrackingFilteringParameters = /** @class */ function(_super) {
    __extends(OutboundMessageTrackingFilteringParameters, _super);
    function OutboundMessageTrackingFilteringParameters(count, offset, recipient, tag, client_name, client_company, client_family, os_name, os_family, os_company, platform, country, region, city, messageStream) {
        if (count === void 0) {
            count = 100;
        }
        if (offset === void 0) {
            offset = 0;
        }
        var _this = _super.call(this, count, offset) || this;
        _this.recipient = recipient;
        _this.tag = tag;
        _this.client_name = client_name;
        _this.client_company = client_company;
        _this.client_family = client_family;
        _this.os_name = os_name;
        _this.os_family = os_family;
        _this.os_company = os_company;
        _this.platform = platform;
        _this.country = country;
        _this.region = region;
        _this.city = city;
        _this.messageStream = messageStream;
        return _this;
    }
    return OutboundMessageTrackingFilteringParameters;
}(FilteringParameters_1.FilteringParameters);
exports.OutboundMessageTrackingFilteringParameters = OutboundMessageTrackingFilteringParameters;
var OutboundMessageOpensFilteringParameters = /** @class */ function(_super) {
    __extends(OutboundMessageOpensFilteringParameters, _super);
    function OutboundMessageOpensFilteringParameters() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return OutboundMessageOpensFilteringParameters;
}(OutboundMessageTrackingFilteringParameters);
exports.OutboundMessageOpensFilteringParameters = OutboundMessageOpensFilteringParameters;
var OutboundMessageClicksFilteringParameters = /** @class */ function(_super) {
    __extends(OutboundMessageClicksFilteringParameters, _super);
    function OutboundMessageClicksFilteringParameters() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return OutboundMessageClicksFilteringParameters;
}(OutboundMessageTrackingFilteringParameters);
exports.OutboundMessageClicksFilteringParameters = OutboundMessageClicksFilteringParameters; //# sourceMappingURL=MessageFilteringParameters.js.map


/***/ }),

/***/ 41598:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=OutboundMessage.js.map


/***/ }),

/***/ 94763:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=OutboundMessageClick.js.map


/***/ }),

/***/ 3702:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=OutboundMessageOpen.js.map


/***/ }),

/***/ 25280:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.CreateSignatureRequest = exports.UpdateSignatureRequest = void 0;
var UpdateSignatureRequest = /** @class */ function() {
    function UpdateSignatureRequest(Name, ReplyToEmail, ReturnPathDomain, ConfirmationPersonalNote) {
        this.Name = Name;
        this.ReplyToEmail = ReplyToEmail;
        this.ReturnPathDomain = ReturnPathDomain;
        this.ConfirmationPersonalNote = ConfirmationPersonalNote;
    }
    return UpdateSignatureRequest;
}();
exports.UpdateSignatureRequest = UpdateSignatureRequest;
var CreateSignatureRequest = /** @class */ function() {
    function CreateSignatureRequest(Name, FromEmail, ReplyToEmail, ReturnPathDomain, ConfirmationPersonalNote) {
        this.Name = Name;
        this.ReplyToEmail = ReplyToEmail;
        this.ReturnPathDomain = ReturnPathDomain;
        this.FromEmail = FromEmail;
        this.ConfirmationPersonalNote = ConfirmationPersonalNote;
    }
    return CreateSignatureRequest;
}();
exports.CreateSignatureRequest = CreateSignatureRequest; //# sourceMappingURL=Signature.js.map


/***/ }),

/***/ 17251:
/***/ ((__unused_webpack_module, exports) => {


var __extends = (void 0) && (void 0).__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.CreateServerRequest = exports.UpdateServerRequest = void 0;
var UpdateServerRequest = /** @class */ function() {
    function UpdateServerRequest(Name, Color, SmtpApiActivated, RawEmailEnabled, InboundHookUrl, BounceHookUrl, OpenHookUrl, DeliveryHookUrl, ClickHookUrl, PostFirstOpenOnly, InboundSpamThreshold, TrackOpens, TrackLinks, IncludeBounceContentInHook, EnableSmtpApiErrorHooks, InboundDomain) {
        this.Name = Name;
        this.Color = Color;
        this.SmtpApiActivated = SmtpApiActivated;
        this.RawEmailEnabled = RawEmailEnabled;
        this.InboundHookUrl = InboundHookUrl;
        this.BounceHookUrl = BounceHookUrl;
        this.OpenHookUrl = OpenHookUrl;
        this.DeliveryHookUrl = DeliveryHookUrl;
        this.ClickHookUrl = ClickHookUrl;
        this.PostFirstOpenOnly = PostFirstOpenOnly;
        this.InboundSpamThreshold = InboundSpamThreshold;
        this.InboundDomain = InboundDomain;
        this.TrackOpens = TrackOpens;
        this.TrackLinks = TrackLinks;
        this.IncludeBounceContentInHook = IncludeBounceContentInHook;
        this.EnableSmtpApiErrorHooks = EnableSmtpApiErrorHooks;
    }
    return UpdateServerRequest;
}();
exports.UpdateServerRequest = UpdateServerRequest;
var CreateServerRequest = /** @class */ function(_super) {
    __extends(CreateServerRequest, _super);
    function CreateServerRequest(Name, Color, SmtpApiActivated, RawEmailEnabled, InboundHookUrl, BounceHookUrl, OpenHookUrl, DeliveryHookUrl, ClickHookUrl, PostFirstOpenOnly, InboundSpamThreshold, TrackOpens, TrackLinks, IncludeBounceContentInHook, EnableSmtpApiErrorHooks, InboundDomain, DeliveryType) {
        var _this = _super.call(this, Name, Color, SmtpApiActivated, RawEmailEnabled, InboundHookUrl, BounceHookUrl, OpenHookUrl, DeliveryHookUrl, ClickHookUrl, PostFirstOpenOnly, InboundSpamThreshold, TrackOpens, TrackLinks, IncludeBounceContentInHook, EnableSmtpApiErrorHooks, InboundDomain) || this;
        _this.DeliveryType = DeliveryType;
        return _this;
    }
    return CreateServerRequest;
}(UpdateServerRequest);
exports.CreateServerRequest = CreateServerRequest; //# sourceMappingURL=Server.js.map


/***/ }),

/***/ 64804:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __extends = (void 0) && (void 0).__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ServerFilteringParameters = void 0;
var FilteringParameters_1 = __webpack_require__(35210);
/**
 * Describes filtering parameters that can be used when retrieving servers.
 * When pagination parameters are not specified, default values are set.
 */ var ServerFilteringParameters = /** @class */ function(_super) {
    __extends(ServerFilteringParameters, _super);
    function ServerFilteringParameters(count, offset, name) {
        if (count === void 0) {
            count = 100;
        }
        if (offset === void 0) {
            offset = 0;
        }
        var _this = _super.call(this, count, offset) || this;
        _this.name = name;
        return _this;
    }
    return ServerFilteringParameters;
}(FilteringParameters_1.FilteringParameters);
exports.ServerFilteringParameters = ServerFilteringParameters; //# sourceMappingURL=ServerFilteringParameters.js.map


/***/ }),

/***/ 76649:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=Servers.js.map


/***/ }),

/***/ 6182:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=Stats.js.map


/***/ }),

/***/ 78991:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.StatisticsFilteringParameters = void 0;
var StatisticsFilteringParameters = /** @class */ function() {
    function StatisticsFilteringParameters(tag, fromDate, toDate, messageStream) {
        this.tag = tag;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.messageStream = messageStream;
    }
    return StatisticsFilteringParameters;
}();
exports.StatisticsFilteringParameters = StatisticsFilteringParameters; //# sourceMappingURL=StatsFilteringParameters.js.map


/***/ }),

/***/ 44641:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.CreateMessageStreamRequest = exports.UpdateMessageStreamRequest = exports.UnsubscribeHandlingTypes = void 0;
var UnsubscribeHandlingTypes;
(function(UnsubscribeHandlingTypes) {
    UnsubscribeHandlingTypes["None"] = "None";
    UnsubscribeHandlingTypes["Postmark"] = "Postmark";
    UnsubscribeHandlingTypes["Custom"] = "Custom";
})(UnsubscribeHandlingTypes = exports.UnsubscribeHandlingTypes || (exports.UnsubscribeHandlingTypes = {}));
var UpdateMessageStreamRequest = /** @class */ function() {
    function UpdateMessageStreamRequest(name, description, subscriptionManagementConfiguration) {
        this.Name = name;
        this.Description = description;
        this.SubscriptionManagementConfiguration = subscriptionManagementConfiguration;
    }
    return UpdateMessageStreamRequest;
}();
exports.UpdateMessageStreamRequest = UpdateMessageStreamRequest;
var CreateMessageStreamRequest = /** @class */ function() {
    function CreateMessageStreamRequest(id, name, messageStreamType, description, subscriptionManagementConfiguration) {
        this.Name = name;
        this.Description = description;
        this.ID = id;
        this.MessageStreamType = messageStreamType;
        this.SubscriptionManagementConfiguration = subscriptionManagementConfiguration;
    }
    return CreateMessageStreamRequest;
}();
exports.CreateMessageStreamRequest = CreateMessageStreamRequest; //# sourceMappingURL=MessageStream.js.map


/***/ }),

/***/ 98519:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.MessageStreamsFilteringParameters = void 0;
/**
 * Describes filtering parameters that can be used when retrieving message streams.
 */ var MessageStreamsFilteringParameters = /** @class */ function() {
    function MessageStreamsFilteringParameters(messageStreamType, includeArchivedStreams) {
        this.messageStreamType = messageStreamType;
        this.includeArchivedStreams = includeArchivedStreams;
    }
    return MessageStreamsFilteringParameters;
}();
exports.MessageStreamsFilteringParameters = MessageStreamsFilteringParameters; //# sourceMappingURL=MessageStreamsFilteringParameters.js.map


/***/ }),

/***/ 5149:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=Suppression.js.map


/***/ }),

/***/ 25213:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __extends = (void 0) && (void 0).__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.SuppressionFilteringParameters = exports.SuppressionOrigin = exports.SuppressionReason = void 0;
var FilteringParameters_1 = __webpack_require__(35210);
var SuppressionReason;
(function(SuppressionReason) {
    SuppressionReason["HardBounce"] = "HardBounce";
    SuppressionReason["SpamComplaint"] = "SpamComplaint";
    SuppressionReason["ManualSuppression"] = "ManualSuppression";
})(SuppressionReason = exports.SuppressionReason || (exports.SuppressionReason = {}));
var SuppressionOrigin;
(function(SuppressionOrigin) {
    SuppressionOrigin["Recipient"] = "Recipient";
    SuppressionOrigin["Customer"] = "Customer";
    SuppressionOrigin["Admin"] = "Admin";
})(SuppressionOrigin = exports.SuppressionOrigin || (exports.SuppressionOrigin = {}));
/**
 * Describes filtering parameters that can be used when retrieving bounces.
 * When pagination parameters are not specified, default values are set.
 */ var SuppressionFilteringParameters = /** @class */ function(_super) {
    __extends(SuppressionFilteringParameters, _super);
    function SuppressionFilteringParameters(count, offset, suppressionReason, origin, emailAddress, fromDate, toDate) {
        if (count === void 0) {
            count = 100;
        }
        if (offset === void 0) {
            offset = 0;
        }
        var _this = _super.call(this, count, offset) || this;
        _this.suppressionReason = suppressionReason;
        _this.origin = origin;
        _this.emailAddress = emailAddress;
        _this.fromDate = fromDate;
        _this.toDate = toDate;
        return _this;
    }
    return SuppressionFilteringParameters;
}(FilteringParameters_1.FilteringParameters);
exports.SuppressionFilteringParameters = SuppressionFilteringParameters; //# sourceMappingURL=SuppressionFilteringParameters.js.map


/***/ }),

/***/ 43426:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __extends = (void 0) && (void 0).__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.TemplateFilteringParameters = exports.TemplatedMessage = exports.TemplatesPushRequest = exports.TemplateTypes = exports.TemplateValidationOptions = exports.CreateTemplateRequest = exports.UpdateTemplateRequest = void 0;
var FilteringParameters_1 = __webpack_require__(35210);
var UpdateTemplateRequest = /** @class */ function() {
    function UpdateTemplateRequest(Name, Subject, HtmlBody, TextBody, Alias, TemplateType, LayoutTemplate) {
        this.Name = Name;
        this.Subject = Subject;
        this.HtmlBody = HtmlBody;
        this.TextBody = TextBody;
        this.Alias = Alias;
        this.LayoutTemplate = LayoutTemplate;
        this.TemplateType = TemplateType;
    }
    return UpdateTemplateRequest;
}();
exports.UpdateTemplateRequest = UpdateTemplateRequest;
var CreateTemplateRequest = /** @class */ function(_super) {
    __extends(CreateTemplateRequest, _super);
    function CreateTemplateRequest(Name, Subject, HtmlBody, TextBody, Alias, TemplateType, LayoutTemplate) {
        return _super.call(this, Name, Subject, HtmlBody, TextBody, Alias, TemplateType, LayoutTemplate) || this;
    }
    return CreateTemplateRequest;
}(UpdateTemplateRequest);
exports.CreateTemplateRequest = CreateTemplateRequest;
var TemplateValidationOptions = /** @class */ function() {
    function TemplateValidationOptions(Subject, HtmlBody, TextBody, TestRenderModel, TemplateType, LayoutTemplate, InlineCssForHtmlTestRender) {
        this.Subject = Subject;
        this.HtmlBody = HtmlBody;
        this.TextBody = TextBody;
        this.TestRenderModel = TestRenderModel;
        this.TemplateType = TemplateType;
        this.LayoutTemplate = LayoutTemplate;
        this.InlineCssForHtmlTestRender = InlineCssForHtmlTestRender;
    }
    return TemplateValidationOptions;
}();
exports.TemplateValidationOptions = TemplateValidationOptions;
var TemplateTypes;
(function(TemplateTypes) {
    TemplateTypes["Standard"] = "Standard";
    TemplateTypes["Layout"] = "Layout";
})(TemplateTypes = exports.TemplateTypes || (exports.TemplateTypes = {}));
var TemplatesPushRequest = /** @class */ function() {
    function TemplatesPushRequest(SourceServerID, DestinationServerID, PerformChanges) {
        this.SourceServerID = SourceServerID;
        this.DestinationServerID = DestinationServerID;
        this.PerformChanges = PerformChanges;
    }
    return TemplatesPushRequest;
}();
exports.TemplatesPushRequest = TemplatesPushRequest;
var TemplatedMessage = /** @class */ function() {
    function TemplatedMessage(from, templateIdOrAlias, templateModel, to, cc, bcc, replyTo, tag, trackOpens, trackLinks, headers, attachments) {
        this.From = from;
        this.TemplateModel = templateModel;
        if (typeof templateIdOrAlias === "number") {
            this.TemplateId = templateIdOrAlias;
        } else {
            this.TemplateAlias = templateIdOrAlias;
        }
        this.To = to;
        this.Cc = cc;
        this.Bcc = bcc;
        this.ReplyTo = replyTo;
        this.Tag = tag;
        this.TrackOpens = trackOpens;
        this.TrackLinks = trackLinks;
        this.Headers = headers;
        this.Attachments = attachments;
    }
    return TemplatedMessage;
}();
exports.TemplatedMessage = TemplatedMessage;
/**
 * Describes filtering parameters that can be used when retrieving templates.
 * When pagination parameters are not specified, default values are set.
 */ var TemplateFilteringParameters = /** @class */ function(_super) {
    __extends(TemplateFilteringParameters, _super);
    function TemplateFilteringParameters(count, offset, templateType, layoutTemplate) {
        if (count === void 0) {
            count = 100;
        }
        if (offset === void 0) {
            offset = 0;
        }
        var _this = _super.call(this, count, offset) || this;
        _this.templateType = templateType;
        _this.layoutTemplate = layoutTemplate;
        return _this;
    }
    return TemplateFilteringParameters;
}(FilteringParameters_1.FilteringParameters);
exports.TemplateFilteringParameters = TemplateFilteringParameters; //# sourceMappingURL=Template.js.map


/***/ }),

/***/ 13037:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.CreateInboundRuleRequest = void 0;
var CreateInboundRuleRequest = /** @class */ function() {
    function CreateInboundRuleRequest(Rule) {
        this.Rule = Rule;
    }
    return CreateInboundRuleRequest;
}();
exports.CreateInboundRuleRequest = CreateInboundRuleRequest; //# sourceMappingURL=InboundRule.js.map


/***/ }),

/***/ 82288:
/***/ ((__unused_webpack_module, exports) => {


var __extends = (void 0) && (void 0).__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.CreateWebhookRequest = exports.UpdateWebhookRequest = void 0;
var UpdateWebhookRequest = /** @class */ function() {
    function UpdateWebhookRequest(url, triggers, httpAuth, httpHeaders) {
        this.Url = url;
        this.HttpAuth = httpAuth;
        this.HttpHeaders = httpHeaders;
        this.Triggers = triggers;
    }
    return UpdateWebhookRequest;
}();
exports.UpdateWebhookRequest = UpdateWebhookRequest;
var CreateWebhookRequest = /** @class */ function(_super) {
    __extends(CreateWebhookRequest, _super);
    function CreateWebhookRequest(url, triggers, httpAuth, httpHeaders, messageStream) {
        var _this = _super.call(this, url, triggers, httpAuth, httpHeaders) || this;
        _this.MessageStream = messageStream;
        return _this;
    }
    return CreateWebhookRequest;
}(UpdateWebhookRequest);
exports.CreateWebhookRequest = CreateWebhookRequest; //# sourceMappingURL=Webhook.js.map


/***/ }),

/***/ 15525:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.WebhookFilteringParameters = void 0;
/**
 * Describes filtering parameters that can be used when retrieving webhooks.
 */ var WebhookFilteringParameters = /** @class */ function() {
    function WebhookFilteringParameters(messageStream) {
        this.messageStream = messageStream;
    }
    return WebhookFilteringParameters;
}();
exports.WebhookFilteringParameters = WebhookFilteringParameters; //# sourceMappingURL=WebhookFilteringParameters.js.map


/***/ }),

/***/ 94214:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=Webhooks.js.map


/***/ }),

/***/ 2027:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=BounceWebhook.js.map


/***/ }),

/***/ 81413:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=ClickWebhook.js.map


/***/ }),

/***/ 32324:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=DeliveryWebhook.js.map


/***/ }),

/***/ 34124:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=InboundWebhook.js.map


/***/ }),

/***/ 74549:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=OpenWebhook.js.map


/***/ }),

/***/ 40055:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
})); //# sourceMappingURL=SubscriptionChangeWebhook.js.map


/***/ }),

/***/ 98659:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
__webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = exports.hR = void 0;
var AccountClient_1 = __webpack_require__(26171);
__webpack_unused_export__ = AccountClient_1.default;
__webpack_unused_export__ = AccountClient_1.default;
var ServerClient_1 = __webpack_require__(51947);
exports.hR = ServerClient_1.default;
__webpack_unused_export__ = ServerClient_1.default;
var Models = __webpack_require__(11659);
__webpack_unused_export__ = Models;
var Errors = __webpack_require__(21429);
__webpack_unused_export__ = Errors;
// Essential types are exposed directly
// to make working with common requests simpler.
var models_1 = __webpack_require__(11659);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return models_1.Message;
    }
});
var models_2 = __webpack_require__(11659);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return models_2.TemplatedMessage;
    }
});
var models_3 = __webpack_require__(11659);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return models_3.Attachment;
    }
});
var models_4 = __webpack_require__(11659);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return models_4.Header;
    }
}); //# sourceMappingURL=index.js.map


/***/ }),

/***/ 12662:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const os = __webpack_require__(22037);
const tty = __webpack_require__(76224);
const hasFlag = __webpack_require__(29864);
const { env } = process;
let forceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
    forceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
    forceColor = 1;
}
if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
        forceColor = 1;
    } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
    } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
    }
}
function translateLevel(level) {
    if (level === 0) {
        return false;
    }
    return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
    };
}
function supportsColor(haveStream, streamIsTTY) {
    if (forceColor === 0) {
        return 0;
    }
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
    }
    if (hasFlag("color=256")) {
        return 2;
    }
    if (haveStream && !streamIsTTY && forceColor === undefined) {
        return 0;
    }
    const min = forceColor || 0;
    if (env.TERM === "dumb") {
        return min;
    }
    if (process.platform === "win32") {
        // Windows 10 build 10586 is the first Windows release that supports 256 colors.
        // Windows 10 build 14931 is the first release that supports 16m/TrueColor.
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
            return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
    }
    if ("CI" in env) {
        if ([
            "TRAVIS",
            "CIRCLECI",
            "APPVEYOR",
            "GITLAB_CI",
            "GITHUB_ACTIONS",
            "BUILDKITE"
        ].some((sign)=>sign in env) || env.CI_NAME === "codeship") {
            return 1;
        }
        return min;
    }
    if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
    }
    if (env.COLORTERM === "truecolor") {
        return 3;
    }
    if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch(env.TERM_PROGRAM){
            case "iTerm.app":
                return version >= 3 ? 3 : 2;
            case "Apple_Terminal":
                return 2;
        }
    }
    if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
    }
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
    }
    if ("COLORTERM" in env) {
        return 1;
    }
    return min;
}
function getSupportLevel(stream) {
    const level = supportsColor(stream, stream && stream.isTTY);
    return translateLevel(level);
}
module.exports = {
    supportsColor: getSupportLevel,
    stdout: translateLevel(supportsColor(true, tty.isatty(1))),
    stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};


/***/ }),

/***/ 54055:
/***/ ((module) => {

module.exports = JSON.parse('{"name":"postmark","description":"Official Node.js client library for the Postmark HTTP API - https://www.postmarkapp.com","license":"MIT","tags":["email","utility","postmark","sending","transactional"],"version":"3.11.0","author":"Igor Balos","contributors":["Igor Balos","Andrew Theken","Aaron Blum","Aleksey Aleksandrov","Alex Shepard","Antony Jones","Ben Burwell","Ben Williamson","Chris Williams","Jakub Borys","Mark Nguyen","Matt","Matthew Blackshaw","Matthew Conlen","Ryan Kirkman","Scott Anderson","Sebastien Chopin","Theophane RUPIN","codesplicer","francescoRubini"],"main":"./dist/index.js","types":"./dist/index.d.ts","directories":{"lib":"./dist/index.js"},"scripts":{"compile":"rm -r -f ./dist && node_modules/.bin/tsc","test":"node_modules/mocha/bin/mocha --timeout 30000 --retries 1 -r ts-node/register test/**/*test.ts","unittest":"node_modules/mocha/bin/mocha --timeout 30000 --retries 1 -r ts-node/register test/unit/**/*test.ts","watchtests":"node_modules/.bin/mocha --timeout 30000 --retries 1 -r ts-node/register -R list -w --recursive -G test/**/*test.ts","lint":"tslint -c tslint.json \'src/**/*.ts\'","lintfix":"tslint -c tslint.json \'src/**/*.ts\' --fix","compile-docs":"echo \'Generating docs...\' && mkdir -p ./docs && rm -r ./docs && node_modules/.bin/typedoc --options typedoc.json && git add -A ./docs && echo \'Generated docs!\'"},"homepage":"http://ActiveCampaign.github.io/postmark.js","repository":{"type":"git","url":"https://github.com/ActiveCampaign/postmark.js.git"},"bugs":{"url":"https://github.com/ActiveCampaign/postmark.js/issues"},"precommit":["compile","lint","test","compile-docs"],"devDependencies":{"@types/chai":"4.3.1","@types/mocha":"^5.2.5","@types/dotenv":"^4.0.3","@types/node":"^4.0.29","@types/sinon":"^7.5.0","chai":"4.3.1","mocha":"5.2.0","dotenv":"^4.0.0","sinon":"^7.5.0","pre-commit":"1.2.2","ts-node":"^7.0.1","tslint":"^6.1.3","typedoc":"^0.22.11","typescript":"4.5.5"},"dependencies":{"axios":"^0.25.0"}}');

/***/ })

};
;