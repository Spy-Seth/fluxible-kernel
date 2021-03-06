import uniloc from 'uniloc';
import HttpRequest from './../HttpRequest';


class HttpRessourceMatcher {
    /**
     * @param {Array} ressources
     */
    constructor(ressources) {
        const routesConfigurations = this._generateUnilocConfig(ressources || []);
        this.matcher = uniloc(routesConfigurations);
    }


    /**
     * @param {String} httpMethod
     * @param {String} path
     * @return {Boolean}
     */
    match(httpMethod, path) {
        const route = this.matcher.lookup(path, httpMethod);

        if (!route.name) {
            return false;
        }

        return true;
    }

    /**
     * @param {String} httpMethod
     * @param {String} path
     * @return {{name: String, params: {Object}}}
     */
    getDetails(httpMethod, path) {
        const route = this.matcher.lookup(path, httpMethod);

        if (!route.name) {
            throw new Error(`No rule match: "${httpMethod} ${path}".`);
        }

        return {
            name: route.name,
            params: route.options,
        };
    }

    /**
     * @private
     * @param {Object} routes
     * @return {Object}
     */
    _generateUnilocConfig(routes) {
        const routesConfigurations = {};
        for (const routeName in routes) {
            if (routes.hasOwnProperty(routeName)) {
                const route = routes[routeName];
                const path = route.path;

                let httpMethods = [HttpRequest.HTTP_METHOD_GET];
                if (route.method) {
                    httpMethods = [route.method];
                } else if (route.methods) {
                    httpMethods = route.methods;
                }

                httpMethods.forEach((httpMethod) => {
                    routesConfigurations[routeName] = httpMethod + ' ' + path;
                });
            }
        }

        return routesConfigurations;
    }
}

module.exports = HttpRessourceMatcher;
