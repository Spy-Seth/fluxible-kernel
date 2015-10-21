class AuthenticationManager {
    hasRole(role) {
        if (role === 'ADMINISTRATOR') {
            return false;
        }

        return true;
    }
}

export default AuthenticationManager;
