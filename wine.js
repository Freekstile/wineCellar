//Require mongoose
var mongoose =require('mongoose');

//Configure connection URL, only needed once per app see locations
//mongoose.connect('mongodb://locahlhost/wineCellar');

//Create a database schema for our wine object
var wineSchema = mongoose.Schema({
	wineName:String,
	wineProducer:String,
	wineColour:String,
	wineType:String,
	wineCountry:String
});

//Create a model object constructor

var myWine = mongoose.model('myWine', wineSchema);

//Expose out model as the module interface
module.exports = myWine;