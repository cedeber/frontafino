/* eslint new-cap: ["error", {"capIsNewExceptions": ["Server"]}], no-console: "off" */

var express = require( "express" ),
	compression = require( "compression" ),
	formidable = require( "formidable" ),
	app = express(),
	http = require( "http" ).Server( app ),
	Loki = require( "lokijs" ),
	db = new Loki( "DB.json" ),
	automation;

// Set port - PORT is defined on package.json
app.set( "port", process.env.PORT || 3000 )
;

// Compress response
app.use( compression( {} ) );

// Cache Control
app.use( function ( req, res, next ) {
	res.setHeader( "Cache-Control", "max-age=0, no-cache, no-store" );
	next();
} );

// Content-Security-Policy
app.use( function ( req, res, next ) {
	res.setHeader(
		"Content-Security-Policy",
		"default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; connect-src 'self' ws:"
	);
	next();
} );


// Serve public static files
app.use( express.static( `${ __dirname }/` ) );


// Automation Application
db.loadDatabase( {}, function () {
	automation = db.getCollection( "automation" );

	// if DB.json doesn't exist, create it
	if ( !automation ) {
		automation = db.addCollection( "automation" );
		automation.insert( { uid: "light", type: "switch", status: false } );
		automation.insert( { uid: "curtains", type: "switch", status: true } );
		automation.insert( { uid: "temperature", type: "regulator", status: 19 } );
		db.saveDatabase(); // and save it locally
	}
} );

/**
 * Get automation component status from the DB
 * @param {string} type - type of component
 * @param {string} uid - component unique id
 * @returns {object} - first component matching the type + uid
 */
function get_status ( type, uid ) {
	return automation.findOne( { "$and": [{ type: type }, { uid: uid }] } );
}

// Routes - Switch
app.get( "/api/switch/:uid", function ( req, res ) {
	res.json( get_status( "switch", req.params.uid ) );
} );

app.post( "/api/switch/:uid", function ( req, res ) {
	var form = new formidable.IncomingForm(),
		component = get_status( "switch", req.params.uid );

	// Parse formData action
	form.parse( req, function ( err, fields ) {
		switch ( fields.action ) {
			case "activate":
				component.status = true;
				break;
			case "deactivate":
				component.status = false;
				break;
		}

		automation.update( component );
		db.saveDatabase();

		res.json( get_status( "switch", req.params.uid ) );
	} );
} );

// Routes - Controller
app.get( "/api/regulator/:uid", function ( req, res ) {
	res.json( get_status( "regulator", req.params.uid ) );
} );

app.post( "/api/regulator/:uid", function ( req, res ) {
	var form = new formidable.IncomingForm(),
		component = get_status( "regulator", req.params.uid );

	// Parse formData action
	form.parse( req, function ( err, fields ) {
		component.status = Number( fields.action );
		automation.update( component );
		db.saveDatabase();

		res.json( get_status( "regulator", req.params.uid ) );
	} );
} );


// Start server
http.listen(
	app.get( "port" ),
	() => console.log( `App listening on port ${ app.get( "port" ) }` )
);
