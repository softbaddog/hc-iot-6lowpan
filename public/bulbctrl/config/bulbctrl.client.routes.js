angular.module('bulbctrl').config(['$routeProvider', 
function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'bulbctrl/views/bulbctrl.client.view.html'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);