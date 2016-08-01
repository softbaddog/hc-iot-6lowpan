angular.module('app').config(['$routeProvider', 
function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'app/views/app.client.view.html'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);