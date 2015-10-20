import SkippyFactory from 'skippy';
import HttpKernel from './HttpKernel';
import HttpRequest from './HttpRequest';

const ExpressMiddleware = (app, containerServiceConfig, containerParameterConfig, firewallConfig, routerConfig, rendererConfig) => {
    return (req, res) => {
        const skippy = SkippyFactory.create(containerServiceConfig, containerParameterConfig);
        const httpKernel = new HttpKernel(app.getContext(), skippy, firewallConfig, routerConfig, rendererConfig);

        // TODO: Hydrate the HttpRequest with the express "req" headers
        // TODO: Hydrate the HttpRequest with the express "req" cookies
        const httpRequest = new HttpRequest(req.method, req.originalUrl, [], null);

        httpKernel
            .handle(httpRequest)
            .then((httpResponse) => {
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
                    throw new Error('Unmanaged HttpResponse');
                }
            }).catch((err) => {
                console.error(err);
            });
    }
};

export default ExpressMiddleware;
