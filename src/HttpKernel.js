import HttpFirewall from './Firewall/HttpFirewall';
import Promise from 'promise';

class HttpKernel {
    constructor(container, firewallConfig) {
        this.container = container;


        this.authenticationManager = container.getService('authentication.manager');
        this.firewall = new HttpFirewall(this.authenticationManager, firewallConfig);
    }

    handle(httpRequest) {
        let promise = Promise.resolve(httpRequest);

        // TODO: Is a promise to manage the firewall is the better solution?
        promise.then(this._thenApplyFirewall);

        return promise;
    }

    _thenApplyFirewall(httpRequest) {
        const hasAccessGranded = this.firewall.hasAccess(httpRequest.getMethod(), httpRequest.getRessource());

        if (!hasAccessGranded) {
            throw new Error('TODO: no acccess');
        }
    }
}

export default HttpKernel;
