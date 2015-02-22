var myApp = angular.module('myApp', []);

myApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

myApp.controller('locationCtrl',
	function locationCtrl($scope,$http){
		$scope.locations = null;
		$http.get('http://localhost:3000/locations.json')
		.success(function(data) {
			$scope.locations = data.locations;
		})
		.error(function(data, status, headers, config) {
			$scope.errorMessage = "Couldn't load the list of customers, error # " + status;
		});
});
