/**
 * An automation default component
 * @module components/automation
 * @example import Automation from "./components/automation";
 */

/**
 * Create a Automation component.
 * @class Automation
 * @param {string} uid - A unique id to identify the components in the DB
 * @param {string} apiType - The component type use for the API url.
 * @example class myAutomationComponent extends Automation { [..] }
 */
export default class Automation {
	constructor ( dom, uid, apiType = "" ) {
		this.dom = dom;
		this.uid = uid;
		this.apiType = apiType;
	}

	/**
	 * Set and Get the status of the switch
	 * @param {string} [status] - Status code to set
	 * @returns {Promise.<*>} - The remote state of the switch
	 */
	do_status ( status ) {
		const URL = `/api/${ this.apiType }/${ this.uid }`,
			DOM = this.dom;

		/**
		 * The request executor
		 * @param  {function} resolve - fullfill promise
		 * @param  {function} reject - reject promise
		 * @return {void}
		 */
		function status_ex ( resolve, reject ) {
			var request = new XMLHttpRequest(),
				formData = new FormData();

			formData.append( "action", String( status ) );

			request.open( typeof status === "undefined" ? "GET" : "POST", URL );
			request.responseType = "json";
			request.addEventListener( "load", function () {
				if ( request.status === 200 ) {
					DOM.classList.add( "-connected" );
					resolve( request.response.status );
				}
				else {
					DOM.classList.remove( "-connected" );
					reject( Error( `There was an error ; error code: ${ request.statusText }` ) );
				}
			} );
			request.addEventListener( "error", function () {
				DOM.classList.remove( "-connected" );
				reject( Error( "There was a network error." ) );
			} );
			request.send( typeof status === "undefined" ? null : formData );
		}

		return new Promise( status_ex );
	}
}
