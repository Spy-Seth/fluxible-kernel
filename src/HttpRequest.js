import url from 'url';

class HttpRequest {
    /**
     * @param {String} method
     * @param {String} ressource
     * @param {Array<Header>} headers
     * @param {Body} body
     */
    constructor(method, ressource, headers, body) {
        this.method = method;
        this.headers = headers || [];
        this.body = body;

        this.url = url.parse(ressource, true);
    }

    /**
     * @return {String}
     */
    getMethod() {
        return this.method.toUpperCase();
    }

    /**
     * @return {String}
     */
    getPathname() {
        return this.url.pathname;
    }

    /**
     * @return {String}
     */
    getPath() {
        return this.url.path;
    }

    /**
     * @return {Object}
     */
    getQuery() {
        return this.url.query;
    }

    getHeaders() {
        return this.headers;
    }

    getBody() {
        return this.body;
    }
}

HttpRequest.HTTP_METHOD_GET = 'GET';
HttpRequest.HTTP_METHOD_HEAD = 'HEAD';
HttpRequest.HTTP_METHOD_POST = 'POST';
HttpRequest.HTTP_METHOD_PUT = 'PUT';
HttpRequest.HTTP_METHOD_DELETE = 'DELETE';
HttpRequest.HTTP_METHOD_TRACE = 'TRACE';
HttpRequest.HTTP_METHOD_OPTIONS = 'OPTIONS';
HttpRequest.HTTP_METHOD_CONNECT = 'CONNECT';
HttpRequest.HTTP_METHOD_PATCH = 'PATCH';

module.exports = HttpRequest;
