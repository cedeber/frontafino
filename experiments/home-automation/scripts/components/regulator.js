/**
 * An automation switch, on/off component
 * @module components/regulator
 * @example import Regulator from "./components/regulator";
 */

import Automation from "./automation.js";

// Status dependant text
const messages = {
    "light": {
        "switch": {
            "off": "Lights off",
            "on": "Lights on"
        }
    },
    "curtains": {
        "switch": {
            "off": "Curtains closed",
            "on": "Curtains opened"
        }
    },
    "temperature": {
        "regulator": {
            "unit": "°"
        }
    }
};

/**
 * Create a Regulator component.
 * @class Regulator
 * @param {HTMLElement} dom - The DOM element
 * @param {string} uid - A unique id to identify the components in the DB
 * @description A Regulator has to have a .more and . less buttons + a .current text node
 * ## CSS classes
 * - "-connected": synced with the server
 * - "-up": You pressed up/more. Temporary.
 * - "-down": You pressed down/less. Temporary.
 * @example var temperature = new Regulator( <HTMLElement>, "temp1" ); temperature.check();
 */
export default class Regulator extends Automation {
	constructor ( dom, uid ) {
		super( dom, uid, "regulator" );

		this.domCurrent = dom.querySelector( ".current" );
		this.domMore = dom.querySelector( ".more" );
		this.domLess = dom.querySelector( ".less" );
		this._status = false;
		this.timeoutID = 0;
	}

	/**
	 * Render HTML depending on the switch's state
	 * @param {number} status - Actual state of the regulator
	 * @returns {void}
	 * @private
	 */
	_render ( status ) {
		this._status = parseInt( status, 10 ); // Set _status here, _render is last action
		
		this.domCurrent.innerHTML = `${ status }${ messages[ this.uid ].regulator.unit }`;

		// remove visual feedback
		this.timeoutID = setTimeout( () => {
			this.dom.classList.remove( "-up" );
			this.dom.classList.remove( "-down" );
		}, 350 );
	}

	/**
	 * Check the status and set the events if connected
	 * @returns {void}
	 */
	check () {
		super.do_status()
			.then( status => {
				this._render( status );
				this.domLess.addEventListener( "click", this.down.bind( this ) );
				this.domMore.addEventListener( "click", this.up.bind( this ) );
			} )
			.catch( res => console.warn( res ) );
	}

	/**
	 * Change the state of the regulator
	 * @param {string|number} change - the new value to apply
	 * @returns {void}
	 */
	change ( change ) {
		super.do_status( change )
			.then( status => this._render( status ) )
			.catch( res => console.warn( res ) );
	}

	/**
	 * Change and apply actual state + 1
	 * @returns {void}
	 */
	up () {
		clearTimeout( this.timeoutID );
		this.dom.classList.add( "-up" );
		this.change( this._status + 1 );
	}

	/**
	 * Change and apply actual state - 1
	 * @returns {void}
	 */
	down () {
		clearTimeout( this.timeoutID );
		this.dom.classList.add( "-down" );
		this.change( this._status - 1 );
	}
}
