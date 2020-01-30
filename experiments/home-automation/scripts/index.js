/* global navigator */

/**
 * ======= HoW tO wrItE CoDE =======
 * | variable       : likeThis     |
 * | private var    : _likeThis    |
 * | constant       : LIKE_THIS    |
 * | class          : LikeThis     |
 * | method         : like_this    |
 * | private method : _like_this   |
 * | callback       : like_this_cb |
 * | event callback : like_this_ev |
 * =================================
 */

import render_template from "./helpers/embed.js";
import Switch from "./components/switch.js";
import Regulator from "./components/regulator.js";


/**
 * Configure lights switch
 * @returns {void}
 */
function check_lights () {
	const light = new Switch(
		document.getElementById( "Light" ),
		"light"
	);

	light.check();
}

/**
 * Configure curtains switch
 * @returns {void}
 */
function check_curtains () {
	const curtains = new Switch(
		document.getElementById( "Curtains" ),
		"curtains"
	);

	curtains.check();
}

/**
 * Configure tempearature regulator
 * @returns {void}
 */
function check_temperature () {
	const temperature = new Regulator(
		document.getElementById( "Temperature" ),
		"temperature"
	);

	temperature.check();
}

/**
 * Your application here
 * @returns {void}
 */
function main () {
	check_lights();
	check_curtains();
	check_temperature();
}

// Import asynchronously some DOM elements and once done, let's start.
render_template().then( main );
