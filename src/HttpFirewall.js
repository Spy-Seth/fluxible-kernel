'use strict';

var HttpRouteMatcher = require('./HttpRouteMatcher');

var HttpFirewall = function HttpFirewall(authenticationManager, config) {
    this.authenticationManager = authenticationManager;
    this.config = config || {};
    this.router = new HttpRouteMatcher(this.config);
};

/**
 * @param {String} httpMethod
 * @param {String} path
 * @return {Boolean|undefined}
 */
HttpFirewall.prototype.hasAccess = function hasAccess(httpMethod, path) {
    if (!this.router.match(httpMethod, path)) {
        return undefined;
    }

    var matchDetails = this.router.getDetails(httpMethod, path);
    var areaConfig = this.config[matchDetails.name];

    var neededRoles = areaConfig.roles || false;

    var isGranded = false;
    var self = this;
    neededRoles.forEach(function(role) {
        if (self.authenticationManager.hasRole(role)) {
            isGranded = true;

            return false;
        }
    });

    return isGranded;
};

module.exports = HttpFirewall;
