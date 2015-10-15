'use strict';

var uniloc = require('uniloc');

var HttpRouteMatcher = function HttpRouteMatcher(routes) {
    this.routes = routes || routes;

    var routesConfigurations = {};
    for (var routeIndex in this.routes) {
        var route = this.routes[routeIndex];

        var path = route.path;
        var httpMethods = ['GET'];
        if (route.method) {
            httpMethods = [route.method];
        } else if (route.methods) {
            httpMethods = route.methods;
        }

        for (var i in httpMethods) {
            routesConfigurations[routeIndex] = httpMethods[i] + ' ' + path;
        }
    }

    this.matcher = uniloc(routesConfigurations);
};

/**
 * @param {String} httpMethod
 * @param {String} path
 * @return {Boolean}
 */
HttpRouteMatcher.prototype.match = function match(httpMethod, path) {
    var route = this.matcher.lookup(path, httpMethod);

    if (!route.name) {
        return false;
    }

    return true;
};

HttpRouteMatcher.prototype.getDetails = function getMatchedRouteInfo(httpMethod, path) {
    var route = this.matcher.lookup(path, httpMethod);

    if (!route.name) {
        throw new Error('No route match.');
    }

    return {
        name: route.name,
        params: route.options
    };
};

module.exports = HttpRouteMatcher;
