import Promise from 'promise';
import HttpFirewall from './Firewall/HttpFirewall';
import HttpResponse from './HttpResponse';
import Router from './Router/Router';

class HttpKernel {
    constructor(context, container, firewallConfig, routerConfig, rendererConfig) {
        this.context = context;
        this.container = container;

        this.firewallConfig = firewallConfig;
        this.routerConfig = routerConfig;
        this.rendererConfig = rendererConfig;

        this.authenticationManager = this.container.getService('authentication.manager');
        this.firewall = new HttpFirewall(this.authenticationManager, firewallConfig);

        this.router = new Router(this.routerConfig);
    }

    handle(httpRequest) {
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

        return promise;
    }

    _processRessouce(hasAccessGranded, routerResult, resolve, reject) {
        if (!hasAccessGranded) {
            // TODO: add render of a configured route on unauthorized.
            resolve(HttpResponse.unauthorized('unauthorized'));
            return;
        }

        if (routerResult.isValidRoute()) {
            resolve(HttpResponse.ok('ok'));
        } else if (routerResult.isNotFoundRoute()) {
            resolve(HttpResponse.notFound('ok'));
        } else if (routerResult.isUnauthorizedRoute()) {
            resolve(HttpResponse.unauthorized('unauthorized'));
        } else if (routerResult.isRedirectedRoute()) {
            resolve(HttpResponse.redirect(routerResult.getRedirectTo()));
        } else {
            reject(new Error(`Unmanager RouterResult: ${routerResult}`));
        }
    }

}

export default HttpKernel;
