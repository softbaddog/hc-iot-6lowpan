angular.module('app').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: '/views/app.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);