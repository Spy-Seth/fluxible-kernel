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

        this.authenticationManager = container.getService('authentication.manager');
        this.firewall = new HttpFirewall(this.authenticationManager, firewallConfig);

        this.router = new Router(this.routerConfig);
    }

    handle(httpRequest) {
        const promise = Promise.resolve(httpRequest);

        promise.then(this._thenApplyFirewall); // TODO: Is a promise to manage the firewall is the better solution?

        promise.then(this._thenGenerateResponse);

        promise.catch((err) => {
                console.error('An error occur durring the kernel loop:', err);
            });

        return promise;
    }

    _thenApplyFirewall(httpRequest) {
        const hasAccessGranded = this.firewall.hasAccess(httpRequest.getMethod(), httpRequest.getRessource());

        if (!hasAccessGranded) {
            throw new Error('TODO: no acccess');
        }
    }

    _thenGenerateResponse(httpRequest) {
        return HttpResponse.ok('ok');
    }

    _prepareUnauthorizedAccess() {

    }

    _renderUnthorizedAccess() {

    }
}

export default HttpKernel;
