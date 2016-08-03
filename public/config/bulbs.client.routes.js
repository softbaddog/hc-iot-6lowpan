angular.module('bulbs').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: '/views/bulbs.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);