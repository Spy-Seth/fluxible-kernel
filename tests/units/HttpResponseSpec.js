import { expect } from 'chai';
import sinon from 'sinon';
import HttpResponse from './../../src/HttpResponse';

describe('HttpResponse', () => {
    it('could be build as succesfull response', () => {
        let sut = HttpResponse.ok('foo');

        expect(sut).to.be.instanceOf(HttpResponse);
        expect(sut.getStatusCode()).to.equals(200);
        expect(sut.getContent()).to.equals('foo');
        expect(sut.getLocation()).to.equals(null);
        expect(sut.getErrorMessage()).to.equals(null);

        expect(sut.isOk()).to.be.true;
        expect(sut.isRedirect()).to.be.false;
        expect(sut.isUnautorized()).to.be.false;
        expect(sut.isNotFound()).to.be.false;
        expect(sut.isInternalServerError()).to.be.false;
    });

    it('could be build as a redirected response', () => {
        let sut = HttpResponse.redirect('/go/there');

        expect(sut).to.be.instanceOf(HttpResponse);
        expect(sut.getStatusCode()).to.equals(301);
        expect(sut.getContent()).to.equals(null);
        expect(sut.getLocation()).to.equals('/go/there');
        expect(sut.getErrorMessage()).to.equals(null);

        expect(sut.isOk()).to.be.false;
        expect(sut.isRedirect()).to.be.true;
        expect(sut.isUnautorized()).to.be.false;
        expect(sut.isNotFound()).to.be.false;
        expect(sut.isInternalServerError()).to.be.false;
    });

    it('could be build as an unauthorized response', () => {
        let sut = HttpResponse.unauthorized('foo');

        expect(sut).to.be.instanceOf(HttpResponse);
        expect(sut.getStatusCode()).to.equals(401);
        expect(sut.getContent()).to.equals('foo');
        expect(sut.getLocation()).to.equals(null);
        expect(sut.getErrorMessage()).to.equals(null);

        expect(sut.isOk()).to.be.false;
        expect(sut.isRedirect()).to.be.false;
        expect(sut.isUnautorized()).to.be.true;
        expect(sut.isNotFound()).to.be.false;
        expect(sut.isInternalServerError()).to.be.false;
    });

    it('could be build as not found response', () => {
        let sut = HttpResponse.notFound();

        expect(sut).to.be.instanceOf(HttpResponse);
        expect(sut.getStatusCode()).to.equals(404);
        expect(sut.getContent()).to.equals(null);
        expect(sut.getLocation()).to.equals(null);
        expect(sut.getErrorMessage()).to.equals(null);

        expect(sut.isOk()).to.be.false;
        expect(sut.isRedirect()).to.be.false;
        expect(sut.isUnautorized()).to.be.false;
        expect(sut.isNotFound()).to.be.true;
        expect(sut.isInternalServerError()).to.be.false;
    });

    it('could be build as an internal server error response', () => {
        let sut = HttpResponse.internalServerError('pwouet');

        expect(sut).to.be.instanceOf(HttpResponse);
        expect(sut.getStatusCode()).to.equals(500);
        expect(sut.getContent()).to.equals(null);
        expect(sut.getLocation()).to.equals(null);
        expect(sut.getErrorMessage()).to.equals('pwouet');

        expect(sut.isOk()).to.be.false;
        expect(sut.isRedirect()).to.be.false;
        expect(sut.isUnautorized()).to.be.false;
        expect(sut.isNotFound()).to.be.false;
        expect(sut.isInternalServerError()).to.be.true;
    });
});
