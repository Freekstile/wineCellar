var express = require('express'),
	http = require('http'),
	path = require('path'),
	myLocation = require('./location'),
	mySupplier = require('./supplier'),
	myWine = require('./wine');

//service variables here

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

//render pages

//jSON for locations
app.get('/locations.json', function(request, response) {
	myLocation.find(function(err, locations) {
		if (err) {
			response.send(501, {
				success:false
			});
		}
		else {
			response.send({
				success:true,
				locations:locations
			});
		}
	});
});

//JSON for suppliers
app.get('/suppliers.json', function(request, response) {
	mySupplier.find(function(err, suppliers) {
		if (err) {
			response.send(502, {
				success:false
			});
		}
		else {
			response.send({
				success:true,
				suppliers:suppliers
			});
		}
	});
});

//Return's location, suppliers and wine info to /

app.get('/', function(request, response) {
	myLocation.find(function(err, locations) {
		if (err) {
			response.send(501, 'There was an error');
		}

		mySupplier.find(function(err, suppliers) {
			if (err) {
				response.send(502, 'There was an error');
			}

			myWine.find(function(err, wines) {
				if (err) {
					response.send(505, 'There was an error');
				}
				else {
					response.render('index', {
						suppliers:suppliers,
						locations:locations,
						wines:wines
					});
				}
			});
		});
	});
});

/*
app.get('/', function(request, response) {
	response.render('index',request);
});



app.get('/locations', function(request, response) {
	response.render('locations',request);
});

app.get('/suppliers', function(request, response) {
	response.render('suppliers',request);
});


app.get('/wines', function(request, response) {
	response.render('wines',request);
});
*/

//render a form to enter a new location
app.get('/locations', function(request, response) {
	response.render('locations', {});
})

//create a new location object

app.post('/createLocation', function(request, response) {
	//Create and save a location model
	var location = new myLocation({
		siteName: request.body.siteName,
		siteAddress: request.body.siteAddress,
		sitePhone: request.body.sitePhone,
		managerName: request.body.managerName,
		managerContact: request.body.managerContact,
		managerEmail: request.body.managerEmail
	});

	//save the model
	location.save(function(err, model) {
		if (err) {
			response.send(500, 'There was an error');
		}
		else {
			response.redirect('/');
		}
	});
});


//render a form to enter a new supplier
app.get('/suppliers', function(request, response) {
	response.render('suppliers', {});
})


//create a new supplier object
app.post('/createSupplier', function(request, response) {
	//Create and save a supplier model
	var supplier = new mySupplier({
		supName: request.body.supName,
		supAddress: request.body.supAddress,
		supPhone: request.body.supPhone,
		supAltPhone: request.body.supAltPhone,
		supEmail: request.body.supEmail,
		supContact: request.body.supContact
	});

	//save the model
	supplier.save(function(err, model) {
		if (err) {
			response.send(503, 'There was an error');
		}
		else {
			response.redirect('/');
		}
	});
});

//render a form to enter a new wine
app.get('/wines', function(request, response) {
	response.render('wines', {});
})

//create a new wine object
app.post('/createWine', function(request, response) {
	//create and save a wine model
	var wine = new myWine({
		wineName: request.body.wineName,
		wineProducer: request.body.wineProducer,
		wineColour: request.body.wineColour,
		wineType: request.body.wineType,
		wineCountry: request.body.wineCountry
	});

	//save to model
	wine.save(function(err, model) {
		if (err) {
			response.send(504, 'There was an error');
		}
		else {
			response.redirect('/');
		}
	});
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
