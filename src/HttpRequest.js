/**
 * @param {String} method
 * @param {String} ressource
 * @param {Array<Header>} headers
 * @param {Body} body
 */
const HttpRequest = function HttpRequest(method, ressource, headers, body) {
    this.method = method;
    this.ressource = ressource;
    this.headers = headers || [];
    this.body = body;
};

/**
 * @return {String}
 */
HttpRequest.prototype.getMethod = function getMethod() {
    return this.method;
};

/**
 * @return {String}
 */
HttpRequest.prototype.getRessource = function getRessource() {
    return this.ressource;
};

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
