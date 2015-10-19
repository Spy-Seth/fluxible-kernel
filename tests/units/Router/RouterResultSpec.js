import { expect } from 'chai';
import sinon from 'sinon';
import RouterResult from './../../../src/Router/RouterResult';

describe('RouterResult', () => {
    it('could be valid', () => {
        var matchedRouteMock = sinon.mock();
        var sut = new RouterResult(matchedRouteMock, RouterResult.TRANSITION_DECISION_VALIDATE, {});

        expect(sut.isValidRoute()).to.be.true;
        expect(sut.isNotFoundRoute()).to.be.false;
        expect(sut.isUnauthorizedRoute()).to.be.false;
        expect(sut.isRedirectedRoute()).to.be.false;
        expect(() => {
            sut.getRedirectTo();
        }).to.throw(Error, 'Could not get the redirection target "to" if the result is not redirected. Actually: "validate".');
    });

    it('could be not found', () => {
        var matchedRouteMock = sinon.mock();
        var sut = new RouterResult(matchedRouteMock, RouterResult.TRANSITION_DECISION_NOT_FOUND, {});

        expect(sut.isValidRoute()).to.be.false;
        expect(sut.isNotFoundRoute()).to.be.true;
        expect(sut.isUnauthorizedRoute()).to.be.false;
        expect(sut.isRedirectedRoute()).to.be.false;
        expect(() => {
            sut.getRedirectTo();
        }).to.throw(Error, 'Could not get the redirection target "to" if the result is not redirected. Actually: "not_found".');
    });

    it('could be unauthorized', () => {
        var matchedRouteMock = sinon.mock();
        var sut = new RouterResult(matchedRouteMock, RouterResult.TRANSITION_DECISION_UNAUTHORIZE, {});

        expect(sut.isValidRoute()).to.be.false;
        expect(sut.isNotFoundRoute()).to.be.false;
        expect(sut.isUnauthorizedRoute()).to.be.true;
        expect(sut.isRedirectedRoute()).to.be.false;
        expect(() => {
            sut.getRedirectTo();
        }).to.throw(Error, 'Could not get the redirection target "to" if the result is not redirected. Actually: "unauthorize".');
    });

    it('could be redirected', () => {
        var matchedRouteMock = sinon.mock();
        var sut = new RouterResult(matchedRouteMock, RouterResult.TRANSITION_DECISION_REDIRECT, {to: '/foo'});

        expect(sut.isValidRoute()).to.be.false;
        expect(sut.isNotFoundRoute()).to.be.false;
        expect(sut.isUnauthorizedRoute()).to.be.false;
        expect(sut.isRedirectedRoute()).to.be.true;
        expect(sut.getRedirectTo()).to.equals('/foo');
    });
});
