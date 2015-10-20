class HttpResponse {
    /**
     * @param {Number} statusCode
     * @param {String} content
     * @param {String} location
     * @param {String} errorMessage
     * @constructor
     */
    constructor(statusCode, content, location, errorMessage) {
        this.statusCode = statusCode;
        this.content = content;
        this.location = location;
        this.errorMessage = errorMessage;
    }

    /**
     * @param {String} content
     * @return {HttpResponse}
     */
    static ok(content) {
        return new HttpResponse(HttpResponse.HTTP_CODE_OK, content, null, null);
    }

    /**
     * @param {String} location
     * @return {HttpResponse}
     */
    static redirect(location) {
        return new HttpResponse(HttpResponse.HTTP_CODE_REDIRECT, null, location, null);
    }

    /**
     * @param {String} content
     * @return {HttpResponse}
     */
    static unauthorized(content) {
        return new HttpResponse(HttpResponse.HTTP_CODE_UNAUTHORIZED, content, null, null);
    }

    /**
     * @return {HttpResponse}
     */
    static notFound() {
        return new HttpResponse(HttpResponse.HTTP_CODE_NOT_FOUND, null, null, null);
    }

    /**
     * @param {String} errorMessage
     * @return {HttpResponse}
     */
    static internalServerError(errorMessage) {
        return new HttpResponse(HttpResponse.HTTP_CODE_INTERNAL_ERROR, null, null, errorMessage);
    }

    /**
     * @return {Number}
     */
    getStatusCode() {
        return this.statusCode;
    }

    /**
     * @return {String}
     */
    getContent() {
        return this.content;
    }

    /**
     * @return {String}
     */
    getLocation() {
        return this.location;
    }

    /**
     * @return {String}
     */
    getErrorMessage() {
        return this.errorMessage;
    }

    /**
     * @return {Boolean}
     */
    isOk() {
        return (this.statusCode === HttpResponse.HTTP_CODE_OK);
    }

    /**
     * @return {Boolean}
     */
    isRedirect() {
        return (this.statusCode === HttpResponse.HTTP_CODE_REDIRECT);
    }

    /**
     * @return {Boolean}
     */
    isUnautorized() {
        return (this.statusCode === HttpResponse.HTTP_CODE_UNAUTHORIZED);
    }

    /**
     * @return {Boolean}
     */
    isNotFound() {
        return (this.statusCode === HttpResponse.HTTP_CODE_NOT_FOUND);
    }

    /**
     * @return {Boolean}
     */
    isInternalServerError() {
        return (this.statusCode === HttpResponse.HTTP_CODE_INTERNAL_ERROR);
    }
}

HttpResponse.HTTP_CODE_OK = 200;
HttpResponse.HTTP_CODE_REDIRECT = 301;
HttpResponse.HTTP_CODE_UNAUTHORIZED = 401;
HttpResponse.HTTP_CODE_NOT_FOUND = 404;
HttpResponse.HTTP_CODE_INTERNAL_ERROR = 500;

export default HttpResponse;
