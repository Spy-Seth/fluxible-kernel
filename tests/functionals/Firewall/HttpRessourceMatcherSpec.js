'use scrict';

var expect = require('chai').expect;
var HttpRessourceMatcher = require('./../../../src/Firewall/HttpRessourceMatcher');

describe('HttpRessourceMatcher', function () {
    var routeConfigFixture = {
        foo_area: {
            method: 'GET',
            path: '/foo'
        },

        bar_area: {
            method: 'GET',
            path: '/bar/:barId'
        },

        foo_area_by_post: {
            method: 'POST',
            path: '/foo'
        }
    };

    it('should match the a path with an HTTP verbs', function () {
        var sut = new HttpRessourceMatcher(routeConfigFixture);

        expect(sut.match('GET', '/foo')).to.be.true;
        expect(sut.match('POST', '/foo')).to.be.true;
        expect(sut.match('OPTIONS', '/foo')).to.be.false;
    });

    it('should return witch route match a HTTP verbs and a path', function () {
        var sut = new HttpRessourceMatcher(routeConfigFixture);

        expect(sut.getDetails('GET', '/foo')).to.deep.equals({name: 'foo_area', params: {}});
        expect(sut.getDetails('GET', '/bar/51')).to.deep.equals({name: 'bar_area', params: {barid: '51'}});
        expect(sut.getDetails('POST', '/foo')).to.deep.equals({name: 'foo_area_by_post', params: {}});

        expect(function() {
            sut.getDetails('OPTIONS', '/foo');
        }).to.throw('No rule match: "OPTIONS /foo".');
    });
});
