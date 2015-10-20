import { expect } from 'chai';
import sinon from 'sinon';
import HttpRequest from './../../src/HttpRequest';

describe('HttpRequest', () => {
    it('should parse the ressource path', () => {
        var headerStub = sinon.stub();
        var bodyStub = sinon.stub();
        var sut = new HttpRequest('TOTO', '/foo/bar', headerStub, bodyStub);

        expect(sut.getMethod()).to.equals('TOTO');
        expect(sut.getPathname()).to.equals('/foo/bar');
        expect(sut.getPath()).to.equals('/foo/bar');
        expect(sut.getQuery()).to.deep.equals({});
        expect(sut.getHeaders()).to.equals(headerStub);
        expect(sut.getBody()).to.equals(bodyStub);
    });

    it('should parse the ressource path (with a query string)', () => {
        var headerStub = sinon.stub();
        var bodyStub = sinon.stub();
        var sut = new HttpRequest('POST', '/foo/bar?page=3&filter=asc', headerStub, bodyStub);

        expect(sut.getMethod()).to.equals('POST');
        expect(sut.getPathname()).to.equals('/foo/bar');
        expect(sut.getPath()).to.equals('/foo/bar?page=3&filter=asc');
        expect(sut.getQuery()).to.deep.equals({
            page: '3',
            filter: 'asc'
        });
        expect(sut.getHeaders()).to.equals(headerStub);
        expect(sut.getBody()).to.equals(bodyStub);
    });

    it('should ignore the hash part of a ressource path', () => {
        var headerStub = sinon.stub();
        var bodyStub = sinon.stub();
        var sut = new HttpRequest('POST', '/foo/bar#coucou', headerStub, bodyStub);

        expect(sut.getMethod()).to.equals('POST');
        expect(sut.getPathname()).to.equals('/foo/bar');
        expect(sut.getPath()).to.equals('/foo/bar');
        expect(sut.getQuery()).to.deep.equals({});
        expect(sut.getHeaders()).to.equals(headerStub);
        expect(sut.getBody()).to.equals(bodyStub);
    });
});
