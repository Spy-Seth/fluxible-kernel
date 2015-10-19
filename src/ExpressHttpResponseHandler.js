export default (httpResponse, res) => {
    if (httpResponse.isOk()) {
        res.status(httpResponse.getStatusCode()).send(httpResponse.getContent());
    } else if (httpResponse.isRedirect()) {
        res.redirect(httpResponse.getStatusCode(), httpResponse.getLocation());
    } else if (httpResponse.isUnautorized()) {
        res.status(httpResponse.getStatusCode()).send(httpResponse.getContent());
    } else if (httpResponse.isNotFound()) {
        res.status(httpResponse.getStatusCode()).send('Not found');
    } else if (httpResponse.isInternalServerError()) {
        throw httpResponse.getErrorMessage();
    } else {
        throw new Error('Unmanaged httpResponse');
    }
};
