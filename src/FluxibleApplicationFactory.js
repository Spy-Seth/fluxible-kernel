import Fluxible from 'fluxible';
import debugLib from 'debug';
import ApplicationStore from './Stores/ApplicationStore';
import {RouteStore} from 'fluxible-router';

const debug = debugLib('FluxibleApplicationFactory');

class FluxibleApplicationFactory {
    /**
     * @static
     * @param {React.Component} applicationComponent
     * @param {Array} plugins
     * @param {Array} stores
     * @param {Object} routes
     * @return {Fluxible}
     */
    static generate(applicationComponent, plugins = [], stores = [], routes = {}) {
        // create new fluxible instance
        const app = new Fluxible({
            component: applicationComponent,
        });

        // plug plugins
        if (plugins) {
            this._attachUserPlugins(app, plugins);
        }

        // register stores
        app.registerStore(ApplicationStore);
        app.registerStore(RouteStore.withStaticRoutes(routes));

        if (stores) {
            this._attachUserStores(app, stores);
        }

        return app;
    }

    static _attachUserPlugins(app, plugins) {
        plugins.forEach((plugin) => {
            debug(`Plug plugin ${plugin}`);
            app.plug(plugin);
        });
    }

    static _attachUserStores(app, stores) {
        stores.forEach((store) => {
            debug(`Registering store ${store}`);
            app.registerStore(store);
        });
    }
}

export default FluxibleApplicationFactory;
