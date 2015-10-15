'use strict';

var AuthenticationManager = function AuthenticationManager() {

};

/**
 * @param {String} role
 * @return {Boolean}
 */
AuthenticationManager.prototype.hasRole = function hasRole(role) {
    return true;
};

module.exports = AuthenticationManager;
