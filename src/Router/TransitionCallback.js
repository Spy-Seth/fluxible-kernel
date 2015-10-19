import RouterResult from './RouterResult';

class TransitionCallback {
    constructor(route, routr, cb) {
        this.route = route;
        this.routr = routr;
        this.cb = cb;
    }

    validate() {
        this.cb(new RouterResult(this.route, RouterResult.TRANSITION_DECISION_VALIDATE, {}));
    }

    redirect(to, params) {
        let redirectPath = to;
        if (!!params) {
            redirectPath = this.routr.makePath(to, params);
        }

        this.cb(new RouterResult(this.route, RouterResult.TRANSITION_DECISION_REDIRECT, {to: redirectPath}));
    }

    notFound() {
        this.cb(new RouterResult(this.route, RouterResult.TRANSITION_DECISION_NOT_FOUND, {}));
    }

    unauthorize() {
        this.cb(new RouterResult(this.route, RouterResult.TRANSITION_DECISION_UNAUTHORIZE, {}));
    }
}

export default TransitionCallback;
