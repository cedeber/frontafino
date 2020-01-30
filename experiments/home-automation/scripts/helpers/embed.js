/**
 * A client side include helper
 * @module helpers/embed
 * @example import render_template from "./helpers/embed";
 */

/**
 * Replace via AJAX every <embed> elements with a data attribute "include"
 * @param {HTMLElement} [container=document.body] - Search inside this container
 * @returns {Promise.<HTMLElement[]>} - Array of replaced elements
 * @example render_template( document.body ).then( ( e ) => console.log( e ) ); // [<div>Hello World!</div>]
 */
export default function ( container = document.body ) {
	var elements = [ ...container.querySelectorAll( "embed[data-include]" ) ],
		promises = [];

	elements.forEach( function ( element ) {
		promises.push(
			new Promise( function ( resolve, reject ) {

				/**
				 * Reject Promise and send error
				 * @param {*} error - Error object
				 * @returns {void}
				 */
				function error_handler ( error ) {
					reject( Error( `File didn't load successfully; error code: ${ error.code }` ) );
				}

				/**
				 * Append the HTML code by replacing the <embed> element
				 * @param {string} html - HTML code to insert
				 * @returns {void}
				 */
				function create_dom ( html ) {
					const x = document.createElement( "x" );
					var child;

					x.innerHTML = html;
					child = x.firstChild;

					// Setup ID
					if ( element.getAttribute( "id" ) && element.getAttribute( "id" ) !== "" ) {
						child.setAttribute( "id", element.getAttribute( "id" ) );
					}

					// Setup CSS classes
					if ( element.classList.toString().trim() !== "" ) {
						child.classList.add( ...element.classList.toString().trim().split( /\s+/ ) );
					}

					// replace <embed> by the source
					element.parentNode.replaceChild( child, element );

					// return Promise
					resolve( child );
				}

				/**
				 * Read file via AJAX request. For browsers.
				 * @returns {void}
				 */
				function read_web_file () {
					const request = new XMLHttpRequest(),
						url = element.dataset.include;

					request.open( "GET", url );
					request.responseType = "text";
					request.addEventListener( "load", function () {
						if ( request.status === 200 ) { create_dom( request.responseText ); }
						else { error_handler( request.statusText ); }
					} );
					request.addEventListener( "error", () => error_handler( request.statusText ) );
					request.send();
				}

				read_web_file();
			} )
		);
	} );

	// Once all elements have been included
	return Promise.all( promises );
}
