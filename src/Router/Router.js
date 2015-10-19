import Routr from 'routr';
import RouterResult from './RouterResult';
import TransitionCallback from './TransitionCallback';

class Router {
    constructor(config, context) {
        this.config = config;
        this.context = context;

        this.routr = new Routr(this.config);
    }

    /**
     * @param {String} method
     * @param {Sring} path
     * @param {Object} query
     * @param {Function} done
     */
    match(method, path, query, done) {
        const matchedRoute = this.routr.getRoute(path, {
            method: (method || 'GET'),
            navigate: {
                params: query || {},
            },
        });

        if (!matchedRoute) {
            done(new RouterResult(null, RouterResult.TRANSITION_DECISION_NOT_FOUND, {}));
            return;
        }

        if (matchedRoute.config.routeValidation) {
            const transitionCallback = new TransitionCallback(matchedRoute, this.routr, done);
            const returnedValue = matchedRoute.config.routeValidation(this.context, matchedRoute, transitionCallback);

            if (returnedValue) {
                throw new Error('The route validation hook could not return value. It shoud use the "transition" callback parameter.');
            }
        } else {
            done(new RouterResult(matchedRoute, RouterResult.TRANSITION_DECISION_VALIDATE, {}));
        }
    }
}

export default Router;
