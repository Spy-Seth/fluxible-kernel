'use scrict';

var expect = require('chai').expect;
var HttpRouteMatcher = require('./../../src/HttpRouteMatcher');

describe('HttpRouteMatcher', function () {
    var routeConfig = {
        foo_area: {
            method: 'GET',
            path: '/foo',
            roles: ['CUSTOMER', 'PRODUCT_MANAGER'] // Unused
        },

        foo_area_by_post: {
            method: 'POST',
            path: '/foo',
            roles: ['CUSTOMER'] // Unused
        }
    };

    it('should match the a path with an HTTP verbs', function () {
        var sut = new HttpRouteMatcher(routeConfig);

        expect(sut.match('GET', '/foo')).to.be.true;
        expect(sut.match('POST', '/foo')).to.be.true;
        expect(sut.match('OPTIONS', '/foo')).to.be.false;
    });

    it('should return witch route match a HTTP verbs and a path', function () {
        var sut = new HttpRouteMatcher(routeConfig);

        expect(sut.getDetails('GET', '/foo')).to.deep.equals({name: 'foo_area', params: {}});
        expect(sut.getDetails('POST', '/foo')).to.deep.equals({name: 'foo_area_by_post', params: {}});

        expect(function() {
            sut.getDetails('OPTIONS', '/foo');
        }).to.throw('No route match.');
    });
});
