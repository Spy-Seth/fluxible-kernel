import express from 'express';
import debugLib from 'debug';
import { KernelExpressMiddleware as fluxibleKernelExpressMiddleware } from './../index';

import firewallsConfiguration from './config/firewalls';
import parametersConfiguration from './config/parameters';
import routesConfiguration from './config/routes';
import sevicesConfiguration from './config/services';
import rendererConfiguration from './config/renderer';

const debug = debugLib('fluxible-kernel-example');

const server = express();

server.use(fluxibleKernelExpressMiddleware(server, {
    services: sevicesConfiguration,
    parameters: parametersConfiguration,
    firewalls: firewallsConfiguration,
    routes: routesConfiguration,
    renderer: rendererConfiguration,
}));

const port = process.env.PORT || 3100;
server.listen(port);

debug('Application listening on port ' + port);

export default server;
