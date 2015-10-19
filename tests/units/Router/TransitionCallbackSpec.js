import { expect } from 'chai';
import sinon from 'sinon';
import RouterResult from './../../../src/Router/RouterResult';
import TransitionCallback from './../../../src/Router/TransitionCallback';

describe('TransitionCallback', () => {
    it('shoud generate a RouterResult on valid state', function(testDone) {
        var routeMock = sinon.mock();
        var routrMock = sinon.mock();
        var callbackSpy = sinon.spy(function (routerResult) {
            expect(routerResult).to.be.instanceOf(RouterResult);
            expect(routerResult.isValidRoute()).to.be.true;

            testDone();
        });

        var sut = new TransitionCallback(routeMock, routrMock, callbackSpy);

        sut.validate();
    });

    it('shoud generate a RouterResult on unauthorized state', function(testDone) {
        var routeMock = sinon.mock();
        var routrMock = sinon.mock();
        var callbackSpy = sinon.spy(function (routerResult) {
            expect(routerResult).to.be.instanceOf(RouterResult);
            expect(routerResult.isUnauthorizedRoute()).to.be.true;

            testDone();
        });

        var sut = new TransitionCallback(routeMock, routrMock, callbackSpy);

        sut.unauthorize();
    });

    it('shoud generate a RouterResult on not found state', function(testDone) {
        var routeMock = sinon.mock();
        var routrMock = sinon.mock();
        var callbackSpy = sinon.spy(function (routerResult) {
            expect(routerResult).to.be.instanceOf(RouterResult);
            expect(routerResult.isNotFoundRoute()).to.be.true;

            testDone();
        });

        var sut = new TransitionCallback(routeMock, routrMock, callbackSpy);

        sut.notFound();
    });

    it('shoud generate a RouterResult on redirect state', function(testDone) {
        var routeMock = sinon.mock();
        var routrMock = sinon.mock();
        var callbackSpy = sinon.spy(function (routerResult) {
            expect(routerResult).to.be.instanceOf(RouterResult);
            expect(routerResult.isRedirectedRoute()).to.be.true;
            expect(routerResult.getRedirectTo()).to.equals('/bar');

            testDone();
        });

        var sut = new TransitionCallback(routeMock, routrMock, callbackSpy);

        sut.redirect('/bar');
    });
});
