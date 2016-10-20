import React from 'react';
import ReactDOMServer from 'react-dom/server';
import createElementWithContext from 'fluxible-addons-react/createElementWithContext';

// Warning: React.renderToStaticMarkup is deprecated. Please use ReactDOMServer.renderToStaticMarkup from require('react-dom/server') instead.
class ServerApplicationRenderer {
    constructor(app, context, container, config) {
        this.app = app;
        this.context = context;
        this.container = container;

        this.htmlLayoutComponent = config.htmlLayoutComponent;
    }

    renderToStaticMarkup() {
        const state = this.app.dehydrate(this.context);

        const markup = ReactDOMServer.renderToString(createElementWithContext(this.context, {
            container: this.container,
        }));

        const htmlElementFactory = React.createFactory(this.htmlLayoutComponent);
        const htmlElement = htmlElementFactory({
            title: 'coucou', // TODO: Define the default page title.
            state: JSON.stringify(state),
            markup: markup,
        });

        const html = ReactDOMServer.renderToStaticMarkup(htmlElement);

        return ('<!DOCTYPE html>' + '\n' + html);
    }
}

export default ServerApplicationRenderer;
