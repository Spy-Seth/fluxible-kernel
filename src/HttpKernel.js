import Promise from 'promise';
import SkippyFactory from 'skippy';
import HttpFirewall from './Firewall/HttpFirewall';
import HttpResponse from './HttpResponse';
import Router from './Router/Router';
import ServerApplicationRenderer from './ApplicationRenderer/ServerApplicationRenderer';

class HttpKernel {
    constructor(app, serviceConfiguration, parametersConfiguration, firewallsConfiguration, routesConfiguration, rendererConfiguration) {
        this.container = SkippyFactory.create(serviceConfiguration, parametersConfiguration);

        this.context = app.createContext({
            container: this.container,
        });

        this.authenticationManager = this.container.getService('authentication.manager');
        this.firewall = new HttpFirewall(this.authenticationManager, firewallsConfiguration);

        this.router = new Router(routesConfiguration);

        this.renderer = new ServerApplicationRenderer(app, this.context, this.container, rendererConfiguration);
    }

    handleRequest(httpRequest) {
        const promise = new Promise((resolve, reject) => {
            const hasAccessGranded = this.firewall.hasAccess(httpRequest.getMethod(), httpRequest.getPathname());

            if (hasAccessGranded) {
                this.router.match(httpRequest.getMethod(), httpRequest.getPath(), httpRequest.getQuery(), (routerResult) => {
                    this._processRessouce(hasAccessGranded, routerResult, resolve, reject);
                });
            } else {
                this._processRessouce(hasAccessGranded, null, resolve, reject);
            }
        });

        promise.catch((err) => {
            return HttpResponse.internalServerError(err);
        });

        return promise;
    }

    // render(request) {
        // TODO: render on client side
    // }

    _processRessouce(hasAccessGranded, routerResult, resolve, reject) {
        if (!hasAccessGranded) {
            // TODO: add render of a configured route on unauthorized.
            resolve(HttpResponse.unauthorized('unauthorized'));
        } else if (routerResult.isValidRoute()) {
            const result = this.renderer.renderToStaticMarkup();

            resolve(HttpResponse.ok(result));
        } else if (routerResult.isNotFoundRoute()) {
            resolve(HttpResponse.notFound('ok'));
        } else if (routerResult.isUnauthorizedRoute()) {
            resolve(HttpResponse.unauthorized('unauthorized'));
        } else if (routerResult.isRedirectedRoute()) {
            resolve(HttpResponse.redirect(routerResult.getRedirectTo()));
        } else {
            reject(new Error(`Unmanager RouterResult: "${routerResult}"`));
        }
    }
}

export default HttpKernel;
