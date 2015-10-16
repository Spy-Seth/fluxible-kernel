'use scrict';

var expect = require('chai').expect;
var sinon = require('sinon');
var HttpFirewall = require('./../../src/Firewall/HttpFirewall');

describe('HttpFirewall', function () {
    var firewallConfigFixture = {
        foo_area: {
            method: 'GET',
            path: '/foo',
            roles: ['CUSTOMER', 'PRODUCT_MANAGER']
        },

        foo_area_by_post: {
            method: 'POST',
            path: '/foo',
            roles: ['CUSTOMER']
        }
    };

    it('should match the a path with an HTTP verbs', function () {
        var hasRoleStub = sinon.stub();
        hasRoleStub.throws(new Error('This role is not managed by the test.'));
        hasRoleStub.withArgs('PRODUCT_MANAGER').returns(true);
        hasRoleStub.withArgs('CUSTOMER').returns(false);

        var authenticationManagerMock = { hasRole: hasRoleStub };

        var sut = new HttpFirewall(authenticationManagerMock, firewallConfigFixture);

        expect(sut.hasAccess('GET', '/foo')).to.be.true;
        expect(sut.hasAccess('GET', '/foo/bar')).to.be.true;
        expect(sut.hasAccess('POST', '/foo')).to.be.false;
        expect(sut.hasAccess('OPTIONS', '/undefined-ressource')).to.be.true;
    });
});
