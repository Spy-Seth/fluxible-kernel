import SkippyFactory from 'skippy';
import HttpKernel from './HttpKernel';
import HttpRequest from './HttpRequest';

import FluxibleApplicationFactory from './FluxibleApplicationFactory';
import KernelApplicationComponent from './Components/KernelApplication';

const KernelExpressMiddleware = (config) => {
    // TODO: Find a way to give the user a way to use is own ApplicationCompoment (as a child of this one)
    // TODO: Allow the user to add plugins to the Fluxible app.
    // TODO: Allow the user to add stores to the Fluxible app.
    const app = FluxibleApplicationFactory.generate(
        KernelApplicationComponent,
        config.plugins,
        config.stores,
        config.routes
    );

    return (req, res) => {
        const skippy = SkippyFactory.create(config.services, config.parameters);
        const context = app.createContext();

        const httpKernel = new HttpKernel(
            context,
            skippy,
            config.firewalls,
            config.routes,
            config.renderer
        );

        // TODO: Hydrate the HttpRequest with the express "req" headers
        // TODO: Hydrate the HttpRequest with the express "req" cookies
        const httpRequest = new HttpRequest(req.method, req.originalUrl, [], null);

        httpKernel
            .handleRequest(httpRequest)
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
                const errorMessage = (typeof err.getMessage === 'function' ? err.getMessage() : err);

                console.error(errorMessage);
            });
    };
};

export default KernelExpressMiddleware;
