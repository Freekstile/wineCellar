//Require mongoose
var mongoose = require('mongoose');

//Configure connection URL - only needed once per app, see location.js
//mongoose.connect('mongodb://localhost/wineCellar');

//Create a database schema for our location oject
var supSchema = mongoose.Schema({
	supName:String,
	supAddress:String,
	supPhone:String,
	supAltPhone:String,
	supEmail:String,
	supContact:String
});

//Create a model object constructor that will have ODM functionality like .save()

var mySupplier = mongoose.model('mySupplier', supSchema);

//Expose out model as the module interface
module.exports = mySupplier;