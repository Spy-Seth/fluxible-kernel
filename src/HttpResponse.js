class HttpResponse {
    constructor(statusCode, content, location, errorMessage) {
        this.statusCode = statusCode;
        this.content = content;
        this.location = location;
        this.errorMessage = errorMessage;
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


/**
 * @param {String} content
 * @return {HttpResponse}
 */
HttpResponse.ok = (content) => {
    return new HttpResponse(HttpResponse.HTTP_CODE_OK, content, null, null);
};

/**
 * @param {String} location
 * @return {HttpResponse}
 */
HttpResponse.redirect = (location) => {
    return new HttpResponse(HttpResponse.HTTP_CODE_REDIRECT, null, location, null);
};

/**
 * @param {String} content
 * @return {HttpResponse}
 */
HttpResponse.unauthorized = (content) => {
    return new HttpResponse(HttpResponse.HTTP_CODE_UNAUTHORIZED, content, null, null);
};

/**
 * @return {HttpResponse}
 */
HttpResponse.notFound = () => {
    return new HttpResponse(HttpResponse.HTTP_CODE_NOT_FOUND, null, null, null);
};

/**
 * @param {String} errorMessage
 * @return {HttpResponse}
 */
HttpResponse.internalServerError = (errorMessage) => {
    return new HttpResponse(HttpResponse.HTTP_CODE_INTERNAL_ERROR, null, null, errorMessage);
};

export default HttpResponse;
