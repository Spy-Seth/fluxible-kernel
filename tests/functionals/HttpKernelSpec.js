import { expect } from 'chai';
import sinon from 'sinon';
import HttpKernel from './../../src/HttpKernel';
import HttpRequest from './../../src/HttpRequest';
import HttpResponse from './../../src/HttpResponse';

describe('HttpKernel', () => {
    const firewallConfigFixture = {
        foo_endpoint: {
            method: 'GET',
            path: '/foo/:id',
            roles: ['ADMINISTRATOR', 'PRODUCT_MANAGER']
        }
    };

    const routerConfigFixture = {
        foo_view: {
            path: '/foo/:fooId',
            method: 'get'
        },
        bar_will_be_ok_by_transition_decision_view: {
            path: '/bar/:barId/ok/',
            method: 'get',
            routeValidation: (context, route, transition) => {
                transition.validate();
            }
        },
        bar_will_be_unauthorized_by_transition_decision_view: {
            path: '/bar/:barId/unauthorized/',
            method: 'get',
            routeValidation: (context, route, transition) => {
                transition.unauthorize();
            }
        },
        bar_will_be_redirected_by_transition_decision_view: {
            path: '/bar/:barId/redirected/',
            method: 'get',
            routeValidation: (context, route, transition) => {
                transition.redirect(`/fr/toto/${route.params.barId}`);
            }
        },
        bar_will_be_not_found_by_transition_decision_view: {
            path: '/bar/:barId/not-found/',
            method: 'get',
            routeValidation: (context, route, transition) => {
                transition.notFound();
            }
        },

        login_view: {
            path: '/bar/:barId',
            method: 'get'
        }
    };

    const rendererConfigFixture = {
        unauthorized_route_to_render: 'login_view',
    };


    it('should return an unauthorized HttpResponse if the firewall reject the pass', () => {
        let contextMock = sinon.mock();

        let FakeContainer = function () {};
        FakeContainer.prototype.getService = function(serviceName) {
            return {
                hasRole: function() {
                    return false;
                }
            }
        }

        const fakeContainerInstance = new FakeContainer();

        let sut = new HttpKernel(contextMock, fakeContainerInstance, firewallConfigFixture, routerConfigFixture, rendererConfigFixture);

        let httpRequest = new HttpRequest('GET', '/foo/42');
        let handlePromise = sut.handleRequest(httpRequest);

        let expectedHttpReponse = new HttpResponse(401, 'unauthorized', null, null);

        return handlePromise.should.become(expectedHttpReponse);
    });

    it('should return an authorized HttpResponse if the firewall allow the request and the router find it', () => {
        let contextMock = sinon.mock();

        let FakeContainer = function () {};
        FakeContainer.prototype.getService = function(serviceName) {
            return {
                hasRole: function() {
                    return true;
                }
            }
        }

        const fakeContainerInstance = new FakeContainer();

        let sut = new HttpKernel(contextMock, fakeContainerInstance, firewallConfigFixture, routerConfigFixture, rendererConfigFixture);

        let httpRequest = new HttpRequest('GET', '/foo/42');
        let handlePromise = sut.handleRequest(httpRequest);

        let expectedHttpReponse = new HttpResponse(200, 'ok', null, null);

        return handlePromise.should.become(expectedHttpReponse);
    });

    it('should return an authorized HttpResponse if the firewall allow the request and the router transition hook allow it', () => {
        let contextMock = sinon.mock();

        let FakeContainer = function () {};
        FakeContainer.prototype.getService = function(serviceName) {
            return {
                hasRole: function() {
                    return true;
                }
            }
        }

        const fakeContainerInstance = new FakeContainer();

        let sut = new HttpKernel(contextMock, fakeContainerInstance, firewallConfigFixture, routerConfigFixture, rendererConfigFixture);

        let httpRequest = new HttpRequest('GET', '/bar/51/ok');
        let handlePromise = sut.handleRequest(httpRequest);

        let expectedHttpReponse = new HttpResponse(200, 'ok', null, null);

        return handlePromise.should.become(expectedHttpReponse);
    });

    it('should return a route not found HttpResponse if the firewall allow the request and the router do not find match', () => {
        let contextMock = sinon.mock();

        let FakeContainer = function () {};
        FakeContainer.prototype.getService = function(serviceName) {
            return {
                hasRole: function() {
                    return true;
                }
            }
        }

        const fakeContainerInstance = new FakeContainer();

        let sut = new HttpKernel(contextMock, fakeContainerInstance, firewallConfigFixture, routerConfigFixture, rendererConfigFixture);

        let httpRequest = new HttpRequest('GET', '/i-do-not-exist');
        let handlePromise = sut.handleRequest(httpRequest);

        let expectedHttpReponse = new HttpResponse(404, null, null, null);

        return handlePromise.should.become(expectedHttpReponse);
    });

    it('should return a route not found HttpResponse if the firewall allow the request and the router transition mark it has not found', () => {
        let contextMock = sinon.mock();

        let FakeContainer = function () {};
        FakeContainer.prototype.getService = function(serviceName) {
            return {
                hasRole: function() {
                    return true;
                }
            }
        }

        const fakeContainerInstance = new FakeContainer();

        let sut = new HttpKernel(contextMock, fakeContainerInstance, firewallConfigFixture, routerConfigFixture, rendererConfigFixture);

        let httpRequest = new HttpRequest('GET', '/bar/26/not-found');
        let handlePromise = sut.handleRequest(httpRequest);

        let expectedHttpReponse = new HttpResponse(404, null, null, null);

        return handlePromise.should.become(expectedHttpReponse);
    });

    it('should return a redirected HttpResponse if the firewall allow the request and the router trigger a redirect', () => {
        let contextMock = sinon.mock();

        let FakeContainer = function () {};
        FakeContainer.prototype.getService = function(serviceName) {
            return {
                hasRole: function() {
                    return true;
                }
            }
        }

        const fakeContainerInstance = new FakeContainer();

        let sut = new HttpKernel(contextMock, fakeContainerInstance, firewallConfigFixture, routerConfigFixture, rendererConfigFixture);

        let httpRequest = new HttpRequest('GET', '/bar/32/redirected');
        let handlePromise = sut.handleRequest(httpRequest);

        let expectedHttpReponse = new HttpResponse(301, null, '/fr/toto/32', null);

        return handlePromise.should.become(expectedHttpReponse);
    });
});
