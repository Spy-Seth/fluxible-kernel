class RouterResult {
    constructor(matchedRoute, transitionDecision, transitionParams = {}) {
        this.matchedRoute = matchedRoute;
        this.transitionDecision = transitionDecision;
        this.transitionParams = transitionParams;
    }

    isValidRoute() {
        return (this.transitionDecision === RouterResult.TRANSITION_DECISION_VALIDATE);
    }

    isNotFoundRoute() {
        return (this.transitionDecision === RouterResult.TRANSITION_DECISION_NOT_FOUND);
    }

    isUnauthorizedRoute() {
        return (this.transitionDecision === RouterResult.TRANSITION_DECISION_UNAUTHORIZE);
    }

    isRedirectedRoute() {
        return (this.transitionDecision === RouterResult.TRANSITION_DECISION_REDIRECT);
    }

    getRedirectTo() {
        if (!this.isRedirectedRoute()) {
            throw new Error(`Could not get the redirection target "to" if the result is not redirected. Actually: "${this.transitionDecision}".`);
        }

        return this.transitionParams.to;
    }
}

RouterResult.TRANSITION_DECISION_VALIDATE = 'validate';
RouterResult.TRANSITION_DECISION_REDIRECT = 'redirect';
RouterResult.TRANSITION_DECISION_NOT_FOUND = 'not_found';
RouterResult.TRANSITION_DECISION_UNAUTHORIZE = 'unauthorize';

export default RouterResult;
