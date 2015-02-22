//Require mongoose
var mongoose = require('mongoose');

//Configure connection URL
mongoose.connect('mongodb://localhost/wineCellar');

//Create a database schema for our location oject
var locSchema = mongoose.Schema({
	siteName:String,
	siteAddress:String,
	sitePhone:String,
	managerName:String,
	managerContact:String,
	managerEmail:String
});

//Create a model object constructor that will have ODM functionality like .save()

var myLocation = mongoose.model('myLocation', locSchema);

//Expose out model as the module interface
module.exports = myLocation;