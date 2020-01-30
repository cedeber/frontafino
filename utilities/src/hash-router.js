/**
 * @typedef Route
 * @type {object}
 * @property {string} route
 * @property {Function} handler
 */

/**
 * @typedef MatchedRoute
 * @type {object}
 * @property {RegExpMatchArray|null} match
 * @property {Route} route
 * @property {Object|null} params
 */

export default class Router {

    constructor() {
        /** @type {Array<Route>} */
        this.__routes = [];

        this.PARAMETER_REGEXP = /([:*])(\w+)/g;
        this.WILDCARD_REGEXP = /\*/g;
        this.REPLACE_VARIABLE_REGEXP = '([^/]+)';
        this.REPLACE_WILDCARD = '(?:.*)';
        this.FOLLOWED_BY_SLASH_REGEXP = '(?:/$|$)';

        // window.addEventListener( "popstate", () => { this.resolve() } );
        window.addEventListener('hashchange', () => this.resolve());
    }

    /**
     * Clean path
     * @param {string} url Url path
     * @return {string} Cleaned path
     */
    clean(url) {
        return url.replace(/\/+$/, '').replace(/^\/+/, '/');
    }

    /**
     * List of parameters and values, as object
     * @param {RegExpMatchArray|null} match Matches
     * @param {string[]} names Parameters
     * @returns {Object|null} All parameters
     */
    regExpResultToParams(match, names) {
        if (names.length === 0) {
            return null;
        }

        if (!match) {
            return null;
        }

        /** {(params: string[] | null, value: string, index: number)} Reduce callback parameters */
        return match.slice(1, match.length).reduce((params, value, index) => {
            if (params === null) {
                params = [];
            }

            params[names[index]] = value;

            return params;
        }, null);
    }

    /**
     * Return hash regexp and all parameters
     * @param {string} route Hash
     * @returns {{ REGEXP: RegExp, PARAM_NAMES: string[] }} Hash regexp and parameters
     */
    replaceDynamicURLParts(route) {
        /** type {string[]} */
        const PARAM_NAMES = [];
        const REGEXP = new RegExp(
            this.clean(route)
                .replace(this.PARAMETER_REGEXP, (_full, _dots, name) => {
                    PARAM_NAMES.push(name);
                    return this.REPLACE_VARIABLE_REGEXP;
                })
                .replace(this.WILDCARD_REGEXP, this.REPLACE_WILDCARD) +
            this.FOLLOWED_BY_SLASH_REGEXP,
        );

        return { REGEXP, PARAM_NAMES };
    }

    /**
     * Find routes and return properties
     * @param {string} url Current hash
     * @param {Route[]} routes Registered routes
     * @returns {Array<MatchedRoute | boolean>} Routes properties
     */
    findMatchedRoutes(url, routes = []) {
        return routes
            .map(route => {
                const { REGEXP, PARAM_NAMES } = this.replaceDynamicURLParts(
                    route.route,
                );
                const match = url.match(REGEXP);
                const params = this.regExpResultToParams(match, PARAM_NAMES);

                return match ? { match, route, params } : false;
            })
            .filter(m => m);
    }

    /**
     * Search for a route that exists
     * @param {string} url Current hash
     * @param {Route[]} routes Registered routes
     * @returns {MatchedRoute|boolean} Matched route properties
     */
    match(url, routes) {
        return this.findMatchedRoutes(url, routes)[0] || false;
    }

    /**
     * Set a route
     * @param {string} route Url path without '#'. Parameters start with ':'
     * @param {Function} handler The callback.
     * @example router.on( "/user/:id/delete", function ( params ) { console.log( params.id ) } );
     */
    on(route, handler) {
        this.__routes.push({ route, handler });
        this.resolve();
    }

    /**
     * Go to a specific route
     * @param {string} route Url path without '#'
     * @param {string} title Title of the page
     * @example router.navigate( "/user/cedeber/delete" );
     */
    navigate(route, title = '') {
        history.pushState({}, title, `#${this.clean(route)}`);
        this.resolve();
    }

    /**
     * Resolve the current url
     */
    resolve() {
        const URL = window.location.hash.replace(/^#/, '');
        const M = this.match(URL, this.__routes);

        if (typeof M === 'object' && M.match) {
            M.route.handler(M.params);
        }
    }
}
