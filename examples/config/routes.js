export default {
    homepage: {
        path: '/',
        method: 'get',
    },
    bar_post: {
        path: '/bar/:barId/baz/:bazId',
        method: 'post',
    },
    baz_transition_decision: {
        path: '/:lang/baz/:bazId',
        method: 'get',
        routeValidation: (context, route, transition) => {
            if (route.params.lang === 'it') {
                transition.redirect('/fr/toto');
            } else if (route.params.lang === 'uk') {
                transition.unauthorize();
            } else if (route.params.lang === 'usa') {
                transition.notFound();
            } else {
                transition.validate();
            }
        },
    },
    oups_validation_return_value: {
        path: '/oups',
        method: 'get',
        routeValidation: () => {
            return 'Samantha!';
        },
    },
};
