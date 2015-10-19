import { expect } from 'chai';
import sinon from 'sinon';
import Router from './../../../src/Router/Router';
import RouterResult from './../../../src/Router/RouterResult';

describe('Router', () => {
    const routerConfigFixture = {
        foo_view: {
            path: '/foo/:fooId',
            method: 'get',
            foo: {
                bar: 'baz'
            }
        },
        bar_post: {
            path: '/bar/:barId/baz/:bazId',
            method: 'post'
        },
        baz_redirected: {
            path: '/:lang/baz/:bazId',
            method: 'get',
            routeValidation: (context, route, transition) => {
                if (route.params.lang === 'it') {
                    transition.redirect('/fr/toto');
                } else if (route.params.lang === 'uk') {
                    transition.unauthorize();
                } else if (route.params.lang === 'usa') {
                    transition.notFound();
                } else {
                    transition.validate();
                }
            }
        },
        oups_validation_return_value: {
            path: '/oups',
            method: 'get',
            routeValidation: (context, route, transition) => {
                return 'Samantha!';
            }
        }
    };

    it('should pass null is a route is not found', function (testDone){
        var actionContextMock = {};
        var sut = new Router(routerConfigFixture, actionContextMock);

        var returnedValue = sut.match('GET', '/i-do-not-exist', '', (routerResult) => {
            expect(routerResult).to.be.instanceOf(RouterResult);
            expect(routerResult.matchedRoute).to.be.null;
            expect(routerResult.transitionDecision).to.equals(RouterResult.TRANSITION_DECISION_NOT_FOUND);

            testDone();
        });

        expect(returnedValue).to.be.undefined;
    });

    it('should use the HTTP method to match a route', function (testDone) {
        var actionContextMock = {};
        var sut = new Router(routerConfigFixture, actionContextMock);

        var returnedValue = sut.match('POST', '/foo/42', '', (routerResult) => {
            expect(routerResult).to.be.instanceOf(RouterResult);
            expect(routerResult.matchedRoute).to.be.null;
            expect(routerResult.transitionDecision).to.equals(RouterResult.TRANSITION_DECISION_NOT_FOUND);

            testDone();
        });

        expect(returnedValue).to.be.undefined;
    });

    it('should use the HTTP method to match route', function (testDone) {
        var actionContextMock = {};
        var sut = new Router(routerConfigFixture, actionContextMock);

        var returnedValue = sut.match('GET', '/foo/42', '', (routerResult) => {
            expect(routerResult).to.be.instanceOf(RouterResult);

            testDone();
        });

        expect(returnedValue).to.be.undefined;
    });


    it('should pass a RouterResult if a route is found', function (testDone) {
        var actionContextMock = {};
        var sut = new Router(routerConfigFixture, actionContextMock);

        var returnedValue = sut.match('GET', '/foo/13', '?page=3&items_by_page=42', (routerResult) => {
            expect(routerResult).to.be.instanceOf(RouterResult);
            expect(routerResult.matchedRoute).to.deep.equals({
                config: {
                    foo: {
                        bar: 'baz',
                    },
                    method: 'get',
                    path: '/foo/:fooId',
                },
                name: 'foo_view',
                navigate: {
                    'params': '?page=3&items_by_page=42',
                },
                params: {
                    fooId: '13',
                },
                url: '/foo/13',
            });
            expect(routerResult.transitionDecision).to.equals(RouterResult.TRANSITION_DECISION_VALIDATE);
            expect(routerResult.transitionParams).to.deep.equals({});

            testDone();
        });

        expect(returnedValue).to.be.undefined;
    });

    it('should allow the route validation to redirect to another route', function(testDone) {
        var actionContextMock = function actionContextMock() {};
        var sut = new Router(routerConfigFixture, actionContextMock);

        var returnedValue = sut.match('GET', '/it/baz/15', '?page=3&items_by_page=42', (routerResult) => {
            expect(routerResult).to.be.instanceOf(RouterResult);
            expect(routerResult.matchedRoute).to.deep.equals({
                config: {
                    method: 'get',
                    path: '/:lang/baz/:bazId',
                    routeValidation: routerConfigFixture.baz_redirected.routeValidation
                },
                name: 'baz_redirected',
                navigate: {
                    'params': '?page=3&items_by_page=42',
                },
                params: {
                    bazId: '15',
                    lang: 'it',
                },
                url: '/it/baz/15',
            });
            expect(routerResult.transitionDecision).to.equals(RouterResult.TRANSITION_DECISION_REDIRECT);
            expect(routerResult.transitionParams).to.deep.equals({to: '/fr/toto'});

            testDone();
        });

        expect(returnedValue).to.be.undefined;
    });

    it('should allow the route validation to disallow acces to a route', function(testDone) {
        var actionContextMock = function actionContextMock() {};
        var sut = new Router(routerConfigFixture, actionContextMock);

        var returnedValue = sut.match('GET', '/uk/baz/15', '?page=3&items_by_page=42', (routerResult) => {
            expect(routerResult).to.be.instanceOf(RouterResult);
            expect(routerResult.matchedRoute).to.deep.equals({
                config: {
                    method: 'get',
                    path: '/:lang/baz/:bazId',
                    routeValidation: routerConfigFixture.baz_redirected.routeValidation
                },
                name: 'baz_redirected',
                navigate: {
                    'params': '?page=3&items_by_page=42',
                },
                params: {
                    bazId: '15',
                    lang: 'uk',
                },
                url: '/uk/baz/15',
            });
            expect(routerResult.transitionDecision).to.equals(RouterResult.TRANSITION_DECISION_UNAUTHORIZE);
            expect(routerResult.transitionParams).to.deep.equals({});

            testDone();
        });

        expect(returnedValue).to.be.undefined;
    });

    it('should allow the route validation to refuse a match (not found)', function(testDone) {
        var actionContextMock = function actionContextMock() {};
        var sut = new Router(routerConfigFixture, actionContextMock);

        var returnedValue = sut.match('GET', '/usa/baz/15', '?page=3&items_by_page=42', (routerResult) => {
            expect(routerResult).to.be.instanceOf(RouterResult);
            expect(routerResult.matchedRoute).to.deep.equals({
                config: {
                    method: 'get',
                    path: '/:lang/baz/:bazId',
                    routeValidation: routerConfigFixture.baz_redirected.routeValidation
                },
                name: 'baz_redirected',
                navigate: {
                    'params': '?page=3&items_by_page=42',
                },
                params: {
                    bazId: '15',
                    lang: 'usa',
                },
                url: '/usa/baz/15',
            });
            expect(routerResult.transitionDecision).to.equals(RouterResult.TRANSITION_DECISION_NOT_FOUND);
            expect(routerResult.transitionParams).to.deep.equals({});

            testDone();
        });

        expect(returnedValue).to.be.undefined;
    });

    it('should check that the user use the transition callback', () => {
        var actionContextMock = function actionContextMock() {};
        var sut = new Router(routerConfigFixture, actionContextMock);

        expect(() => {
            sut.match('GET', '/oups', '', () => {});
        }).to.throw(Error, 'The route validation hook could not return value. It shoud use the "transition" callback parameter.');
    });
});
