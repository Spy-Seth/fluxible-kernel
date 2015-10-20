import HttpRessourceMatcher from './HttpRessourceMatcher';

/**
 * @param {AuthenticationManager} authenticationManager
 * @param {Object} config
 */
const HttpFirewall = function HttpFirewall(authenticationManager, config) {
    this._guardAgainstInvalidAuthenticationManager(authenticationManager);

    this.authenticationManager = authenticationManager;
    this.config = config || {};
    this.ressourceMatcher = new HttpRessourceMatcher(this.config);
};

/**
 * @param {String} httpMethod
 * @param {String} ressource
 * @return {Boolean}
 */
HttpFirewall.prototype.hasAccess = function hasAccess(httpMethod, ressource) {
    if (!this.ressourceMatcher.match(httpMethod, ressource)) {
        return true;
    }

    const matchDetails = this.ressourceMatcher.getDetails(httpMethod, ressource);
    const areaConfig = this.config[matchDetails.name];

    const neededRoles = areaConfig.roles || false;

    const self = this;
    let isGranded = false;
    neededRoles.forEach((role) => {
        if (self.authenticationManager.hasRole(role)) {
            isGranded = true;

            return false;
        }
    });

    return isGranded;
};

/**
 * @private
 * @param {Object} authenticationManager
 */
HttpFirewall.prototype._guardAgainstInvalidAuthenticationManager = function guardAgainstInvalidAuthenticationManager(authenticationManager) {
    if (!authenticationManager.hasRole) {
        throw new Error(`The authentication manager should have a method "hasRole".`);
    }

    if (typeof authenticationManager.hasRole !== 'function') {
        throw new Error(`The authentication manager attribute "hasRole" should be a function. Actualy: "${typeof authenticationManager.hasRole}"`);
    }
};

module.exports = HttpFirewall;
