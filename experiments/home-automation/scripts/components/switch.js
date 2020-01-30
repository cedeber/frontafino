/**
 * An automation switch, on/off component
 * @module components/switch
 * @example import Switch from "./components/switch";
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
 * Create a Switch component.
 * @class Switch
 * @param {HTMLElement} dom - The DOM element
 * @param {string} uid - A unique id to identify the components in the DB
 * @description A Switch has to have a .text node and a .action node
 * ## CSS classes
 * - "-connected": synced with the server
 * - "-active": The switch is on, otherwise it's off.
 * @example var light = new Switch( <HTMLElement>, "light1" ); light.check();
 */
export default class Switch extends Automation {
	constructor ( dom, uid ) {
		super( dom, uid, "switch" );

		this.domText = dom.querySelector( ".text" );
		this.domAction = dom.querySelector( ".action" );
		this._status = false;
	}

	/**
	 * Render HTML depending on the switch's state
	 * @param {boolean} status - Actual state of the switch
	 * @returns {void}
	 * @private
	 */
	_render ( status ) {
		this._status = Boolean( status ); // Set _status here, _render is last action

		if ( this._status ) {
			this.dom.classList.add( "-active" );
			this.domText.innerHTML = messages[ this.uid ].switch.on;
		}
		else {
			this.dom.classList.remove( "-active" );
			this.domText.innerHTML = messages[ this.uid ].switch.off;
		}
	}

	/**
	 * Check the status and set the events if connected
	 * @returns {void}
	 */
	check () {
		super.do_status()
			.then( status => {
				this._render( status );
				this.domAction.addEventListener( "click", this.toggle.bind( this ) );
			} )
			.catch( res => console.warn( res ) );
	}

	/**
	 * Set the switch to on
	 * @returns {void}
	 */
	activate () {
		if ( !this._status ) {
			super.do_status( "activate" )
				.then( status => this._render( status ) )
				.catch( res => console.warn( res ) );
		}
	}

	/**
	 * Set the switch to off
	 * @returns {void}
	 */
	deactivate () {
		if ( this._status ) {
			super.do_status( "deactivate" )
				.then( status => this._render( status ) )
				.catch( res => console.warn( res ) );
		}
	}

	/**
	 * Toggle the switch's state - on/off
	 * @returns {void}
	 */
	toggle () {
		if ( this._status ) { this.deactivate(); }
		else { this.activate(); }
	}
}
